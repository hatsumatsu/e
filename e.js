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
    if (typeof target === "string") {
      if (
        target.charAt(0) === "<" &&
        target.charAt(target.length - 1) === ">"
      ) {
        this._nodes = [document.createElement(target.replace(/[<>]/gi, ""))];
      } else {
        this._nodes = document.querySelectorAll(target);
      }
    }

    /**
     * new E( {Element|NodeList} )
     * creates a collection containing the passed nodes
     */
    if (typeof target === "object") {
      if ( target.length === undefined ) {
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

    if (typeof selector === "string") {
      return new E(
        Array.from(this._nodes).filter((node) => {
          return node.matches(selector);
        })
      );
    }

    if (typeof selector === "number") {
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

    this._nodes.forEach((node) => {
      children.nodes().forEach((child) => {
        node.append(child);
      });
    });

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

    this._nodes.forEach((node) => {
      parents.nodes().forEach((parent) => {
        parent.append(node);
      });
    });

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

    this._nodes.forEach((node) => {
      children.nodes().forEach((child) => {
        node.prepend(child);
      });
    });

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

    this._nodes.forEach((node) => {
      parents.nodes().forEach((parent) => {
        parent.prepend(node);
      });
    });

    return this;
  }

  clone() {
    if (!this._nodes.length) {
      return this;
    }

    let clones = [];

    this._nodes.forEach((node) => {
      clones.push(node.cloneNode(true));
    });

    return new E(clones);
  }

  remove() {
    if (!this._nodes.length) {
      return this;
    }

    this._nodes.forEach((node) => {
      node.parentNode.removeChild(node);
    });
  }

  /**
   * Classes
   */
  addClass(className) {
    if (!this._nodes.length) {
      return this;
    }

    this._nodes.forEach((node) => {
      node.classList.add(className);
    });

    return this;
  }

  removeClass(className) {
    if (!this._nodes.length) {
      return this;
    }

    this._nodes.forEach((node) => {
      node.classList.remove(className);
    });

    return this;
  }

  /**
   * Attributes
   */
  setAttr(key, value, namespace) {
    if (!this._nodes.length) {
      return this;
    }

    if (namespace) {
      key = "data-" + namespace + "-" + key;
    }

    this._nodes.forEach((node) => {
      node.setAttribute(key, value);
    });

    return this;
  }

  getAttr(key, namespace) {
    if (!this._nodes.length) {
      return this;
    }

    if (namespace) {
      key = "data-" + namespace + "-" + key;
    }

    return this._nodes[0].getAttribute(key);
  }

  /**
   * Text
   */
  setText(text) {
    if (!this._nodes.length) {
      return this;
    }

    this._nodes.forEach((node) => {
      node.textContent = text;
    });

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

    this._nodes.forEach((node) => {
      node.innerHTML = html;
    });

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

    if (!styles || typeof styles !== "object") {
      return this;
    }

    this._nodes.forEach((node) => {
      for (const property in styles) {
        node.style[property] = styles[property];
      }
    });

    return this;
  }

  /**
   * Helper
   */
  repaint() {
    if (!this._nodes.length) {
      return this;
    }

    this._nodes.forEach((node) => {
      node.offsetHeight;
    });

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
}
