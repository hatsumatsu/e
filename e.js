/**
 * 
_____________________________
___________/\/\/\/\/\/\______
__________/\_________________
_________/\/\/\/\/\__________
________/\/\_________________
_______/\/\/\/\/\/\__________
_____________________________

E

Tiny DOM manipulation helper
with a familiar fluent API
 * 
 */

export default class E {
    constructor(target) {
        /**
         * new E()
         * creates an empty collection
         */
        if (!target) {
            this._nodes = [];
        }

        /**
         * new E( '<div>' )
         * creates a collection with one <div> Element
         *
         * new E( '{selector}' )
         * creates a collection containing the result of querySelectorAll( '{selector}' )
         */
        if (typeof target === 'string') {
            if (target.charAt(0) === '<' && target.charAt(target.length - 1) === '>') {
                this._nodes = [document.createElement(target.replace(/[<>]/gi, ''))];
            } else {
                this._nodes = document.querySelectorAll(target);
            }
        }

        /**
         * new E( {Element|NodeList} )
         * creates a collection containing the passed nodes
         */
        if (typeof target === 'object') {
            if (target.length === undefined) {
                this._nodes = [target];
            } else {
                this._nodes = target;
            }
        }

        return this;
    }

    /**
     * Traversing
     */
    filter(selector) {
        if (!this._nodes.length) {
            return this;
        }

        if (selector === undefined) {
            return this;
        }

        if (typeof selector === 'string') {
            return new E(
                Array.from(this._nodes).filter((node) => {
                    return node.matches(selector);
                })
            );
        }

        if (typeof selector === 'number') {
            if (!this._nodes[selector]) {
                return new E();
            }

            return new E(this._nodes[selector]);
        }

        return this;
    }

    find(selector) {
        if (!this._nodes.length) {
            return this;
        }

        if (!selector) {
            return this;
        }

        return new E(this._nodes[0].querySelectorAll(selector));
    }

    closest(selector) {
        if (!this._nodes.length) {
            return this;
        }

        if (!selector) {
            return this;
        }

        return new E(this._nodes[0].closest(selector));
    }

    /**
     * Manipulating
     */
    append(children) {
        if (!this._nodes.length) {
            return this;
        }

        if (!children) {
            return this;
        }

        children = new E(children);

        if (!children) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            for (let j = 0; j < children.nodes().length; j++) {
                this._nodes[i].append(children.nodes(j));
            }
        }

        return this;
    }

    appendTo(parents) {
        if (!this._nodes.length) {
            return this;
        }

        if (!parents) {
            return this;
        }

        parents = new E(parents);

        if (!parents) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            for (let j = 0; j < parents.nodes().length; j++) {
                parents.nodes(j).append(this._nodes[i]);
            }
        }

        return this;
    }

    prepend(children) {
        if (!this._nodes.length) {
            return this;
        }

        if (!children) {
            return this;
        }

        children = new E(children);

        if (!children) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            for (let j = 0; j < children.nodes().length; j++) {
                this._nodes[i].prepend(children.nodes(j));
            }
        }

        return this;
    }

    prependTo(parents) {
        if (!this._nodes.length) {
            return this;
        }

        if (!parents) {
            return this;
        }

        parents = new E(parents);

        if (!parents) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            for (let j = 0; j < parents.nodes().length; j++) {
                parents.nodes(j).prepend(this._nodes[i]);
            }
        }

        return this;
    }

    clone() {
        if (!this._nodes.length) {
            return this;
        }

        let clones = [];

        for (let i = 0; i < this._nodes.length; i++) {
            clones.push(this._nodes[i].cloneNode(true));
        }

        return new E(clones);
    }

    remove() {
        if (!this._nodes.length) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].parentNode.removeChild(this._nodes[i]);
        }
    }

    /**
     * Classes
     */
    addClass(className) {
        if (!this._nodes.length) {
            return this;
        }

        if (!className) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].classList.add(className);
        }

        return this;
    }

    removeClass(className) {
        if (!this._nodes.length) {
            return this;
        }

        if (!className) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].classList.remove(className);
        }

        return this;
    }

    toggleClass(className) {
        if (!this._nodes.length) {
            return this;
        }

        if (!className) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            if (this._nodes[i].classList.contains(className)) {
                this._nodes[i].classList.remove(className);
            } else {
                this._nodes[i].classList.add(className);
            }
        }

        return this;
    }

    /**
     * Attributes
     */
    setAttr(key, value, namespace) {
        if (!this._nodes.length) {
            return this;
        }

        if (!key || !value) {
            return this;
        }

        if (namespace) {
            key = 'data-' + namespace + '-' + key;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].setAttribute(key, value);
        }

        return this;
    }

    getAttr(key, namespace) {
        if (!this._nodes.length) {
            return this;
        }

        if (!key) {
            return null;
        }

        if (namespace) {
            key = 'data-' + namespace + '-' + key;
        }

        return this._nodes[0].getAttribute(key);
    }

    toggleAttr(key, values = [], namespace) {
        if (!this._nodes.length) {
            return this;
        }

        if (!values || !values.length || values.length !== 2) {
            return this;
        }

        if (namespace) {
            key = 'data-' + namespace + '-' + key;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            if (this._nodes[i].getAttribute(key) === values[1]) {
                this._nodes[i].setAttribute(key, values[0]);
            } else {
                this._nodes[i].setAttribute(key, values[1]);
            }
        }

        return this;
    }

    /**
     * Text
     */
    setText(text) {
        if (!this._nodes.length) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].textContent = text;
        }

        return this;
    }

    getText() {
        if (!this._nodes.length) {
            return this;
        }

        return this._nodes[0].textContent;
    }

    /**
     * HTML
     */
    setHTML(html) {
        if (!this._nodes.length) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].innerHTML = html;
        }

        return this;
    }

    getHTML() {
        if (!this._nodes.length) {
            return this;
        }

        return this._nodes[0].innerHTML;
    }

    /**
     * CSS
     */
    css(styles) {
        if (!this._nodes.length) {
            return this;
        }

        if (!styles || typeof styles !== 'object') {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            for (const property in styles) {
                this._nodes[i].style[property] = styles[property];
            }
        }

        return this;
    }

    /**
     * Helper
     */
    repaint() {
        if (!this._nodes.length) {
            return this;
        }

        for (let i = 0; i < this._nodes.length; i++) {
            this._nodes[i].offsetHeight;
        }

        return this;
    }

    isEmpty() {
        if (!this._nodes.length) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get nodes
     */
    nodes(index) {
        if (!this._nodes.length) {
            return [];
        }

        if (index !== undefined) {
            return this._nodes[index];
        } else {
            return this._nodes;
        }
    }

    n(index) {
        return this.nodes(index);
    }

    get(index) {
        return this.nodes(index);
    }
}
