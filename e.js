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
     * creates an empty NodeList
     */
    if (!target) {
      this.elements = [];
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
        this.elements = [document.createElement(target.replace(/[<>]/gi, ""))];
      } else {
        this.elements = document.querySelectorAll(target);
      }
    }

    /**
     * new E( {Element|NodeList} )
     * creates a collection containing the passed elements
     */
    if (typeof target === "object") {
      if (!target.length) {
        this.elements = [target];
      } else {
        this.elements = target;
      }
    }

    return this;
  }

  /**
   * Traversing
   */
  filter(selector) {
    if (!this.elements.length) {
      return this;
    }

    if (selector === undefined) {
      return this;
    }

    if (typeof selector === "string") {
      return new E(
        Array.from(this.elements).filter((element) => {
          return element.matches(selector);
        })
      );
    }

    if (typeof selector === "number") {
      if (!this.elements[selector]) {
        return new E();
      }

      return new E(this.elements[selector]);
    }

    return this;
  }

  find(selector) {
    if (!this.elements.length) {
      return this;
    }

    if (!selector) {
      return this;
    }

    return new E(this.elements[0].querySelectorAll(selector));
  }

  closest(selector) {
    if (!this.elements.length) {
      return this;
    }

    if (!selector) {
      return this;
    }

    return new E(this.elements[0].closest(selector));
  }

  /**
   * Manipulating
   */
  append(children) {
    if (!this.elements.length) {
      return this;
    }

    if (!children) {
      return this;
    }

    children = new E(children);

    if (!children) {
      return this;
    }

    this.elements.forEach((element) => {
      children.get().forEach((child) => {
        element.append(child);
      });
    });

    return this;
  }

  appendTo(parents) {
    if (!this.elements.length) {
      return this;
    }

    if (!parents) {
      return this;
    }

    parents = new E(parents);

    if (!parents) {
      return this;
    }

    this.elements.forEach((element) => {
      parents.get().forEach((parent) => {
        parent.append(element);
      });
    });

    return this;
  }

  /**
   * Manipulating
   */
  prepend(children) {
    if (!this.elements.length) {
      return this;
    }

    if (!children) {
      return this;
    }

    children = new E(children);

    if (!children) {
      return this;
    }

    this.elements.forEach((element) => {
      children.get().forEach((child) => {
        element.prepend(child);
      });
    });

    return this;
  }

  prependTo(parents) {
    if (!this.elements.length) {
      return this;
    }

    if (!parents) {
      return this;
    }

    parents = new E(parents);

    if (!parents) {
      return this;
    }

    this.elements.forEach((element) => {
      parents.get().forEach((parent) => {
        parent.prepend(element);
      });
    });

    return this;
  }

  clone() {
    if (!this.elements.length) {
      return this;
    }

    let clones = [];

    this.elements.forEach((element) => {
      clones.push(element.cloneNode(true));
    });

    return new E(clones);
  }

  remove() {
    if (!this.elements.length) {
      return this;
    }

    this.elements.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  /**
   * Classes
   */
  addClass(className) {
    if (!this.elements.length) {
      return this;
    }

    this.elements.forEach((element) => {
      element.classList.add(className);
    });

    return this;
  }

  removeClass(className) {
    if (!this.elements.length) {
      return this;
    }

    this.elements.forEach((element) => {
      element.classList.remove(className);
    });

    return this;
  }

  /**
   * Attributes
   */
  setAttr(key, value, namespace) {
    if (!this.elements.length) {
      return this;
    }

    if (namespace) {
      key = "data-" + namespace + "-" + key;
    }

    this.elements.forEach((element) => {
      element.setAttribute(key, value);
    });

    return this;
  }

  getAttr(key, namespace) {
    if (!this.elements.length) {
      return this;
    }

    if (namespace) {
      key = "data-" + namespace + "-" + key;
    }

    return this.elements[0].getAttribute(key);
  }

  /**
   * Text
   */
  setText(text) {
    if (!this.elements.length) {
      return this;
    }

    this.elements.forEach((element) => {
      element.textContent = text;
    });

    return this;
  }

  getText() {
    if (!this.elements.length) {
      return this;
    }

    return this.elements[0].textContent;
  }

  /**
   * HTML
   */
  setHTML(html) {
    if (!this.elements.length) {
      return this;
    }

    this.elements.forEach((element) => {
      element.innerHTML = html;
    });

    return this;
  }

  getHTML() {
    if (!this.elements.length) {
      return this;
    }

    return this.elements[0].innerHTML;
  }

  /**
   * CSS
   */
  css(styles) {
    console.log("css()", this.elements);
    if (!this.elements.length) {
      return this;
    }

    if (!styles || typeof styles !== "object") {
      return this;
    }

    this.elements.forEach((element) => {
      for (const property in styles) {
        element.style[property] = styles[property];
      }
    });

    return this;
  }

  /**
   * CSS
   */
  get(index) {
    if (!this.elements.length) {
      return this;
    }

    if (index !== undefined) {
      return this.elements[index];
    } else {
      return this.elements;
    }
  }
}
