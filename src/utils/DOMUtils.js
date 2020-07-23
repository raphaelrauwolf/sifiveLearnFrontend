
/**
 * DOMUtils class that makes native dom functions beautiful
 */
class DOMUtils {

    eventListenerCounter = 0;
    eventListenerTargets = [];

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Pretty querySelector function
     * @param {String} query string to select
     * @param {Element} $node base node
     * @param {Boolean} shady if should check shadow dom
     * @return {Array} list of found elements
     */
    q(query, $node = document, shady = false) {

        if ($node.length <= 0) {

            $node = document;

        }

        const list = $node.querySelector(query);

        return list;

    }

    /**
     * Pretty querySelectorAll function
     * @param {String} query string to select
     * @param {Element} $node base node
     * @param {Boolean} shady if should check shadow dom
     * @return {Array} list of found elements
     */
    a(query, $node = document, shady = false) {

        let list;

        if (!$node) {

            return [];

        }

        if ($node.length <= 0) {

            list = document.querySelectorAll(query);

        } else if ($node.length > 1) {

            list = $node.map(($subNode) => {

                return this.a(query, $subNode);

            });

        } else if ($node.length === 1) {

            list = $node[0].querySelectorAll(query);

        } else {

            list = $node.querySelectorAll(query);

        }

        return [...list];

    }

    /**
     * Find parent of a node
     * @param {Element} $node base node
     * @param {String} query selector query
     * @return {Element} found element
     */
    parent($node, query = '') {

        let $el = $node.parentElement;

        while ($el !== null && !$el.matches(query)) {

            $el = $el.parentElement;

        }

        return this.isNode($el) ? $el : false;

    }

    /**
     * Is a node a node
     * @param {Element} $node node in question
     * @return {Boolean} if node  is node
     */
    isNode($node) {

        return $node instanceof Node;

    }

    /**
     * Finds a node or children matching selector
     * @param {Element} $node base node
     * @param {String} query selector
     * @return {Element} found element
     */
    getNodeOrChild($node, query) {

        if ($node.matches(query)) {

            return $node;

        }

        let $el = $node.parentElement;

        while ($el !== null && !$el.matches(query)) {

            $el = $el.parentElement;

        }

        return $el;

    }

    /**
     * Sets or returns text of node
     * @param {Element} $node base node
     * @param {String} text new text for node
     * @return {String} text of node
     */
    text($node, text) {

        if (typeof text !== 'undefined') {

            if (typeof $node.textContent === 'string') {

                $node.textContent = text;

            } else {

                $node.innerText = text;

            }

        } else {

            if (typeof $node.textContent === 'string') {

                return $node.textContent;

            } else {

                return $node.innerText;

            }

        }

    }

    /**
     * Sets or returns html of node
     * @param {Element} $node base node
     * @param {String} html new text for node
     * @return {String} html of node
     */
    html($node, html) {

        if (typeof html !== 'undefined') {

            $node.innerHTML = html;

        } else {

            return $node.innerHTML;

        }

    }

    /**
     * Creates a new element
     * @param {String} tag for new element
     * @param {Object} attributes attributes that need to be set
     * @return {String} html of node
     */
    create(tag, attributes = {}) {

        const $node = document.createElement(tag);
        Object.keys(attributes).forEach((key) => {

            $node.setAttribute(key, attributes[key]);

        });

        return $node;

    }

    /**
     * Gets the node from a string by setting innerHTML to div
     * @param {String} html text for new node
     * @return {Element} newly created element
     */
    getNodeFromText(html) {

        const $container = document.createElement('div');
        $container.innerHTML = html;

        const $node = $container.children[0];

        $container.innerHTML = '';

        return $node;

    }

    /**
     * Wraps element with new element
     * @param {Element} $node base node to be wrapped
     * @param {String} tag for element wrapped around node
     * @param {Object} attributes for element wrapped around node
     */
    wrap($node, tag, attributes = {}) {

        const innerHTML = $node.parentElement.innerHTML;
        const attribs = Object.keys(attributes).map((key) => {

            return `${key}="${attributes[key]}"`;

        });

        const nodeHTMLString = `<${tag} ${attribs.join(' ')}>
            ${innerHTML}
        </${tag}>`;

        $node.parentElement.innerHTML = nodeHTMLString;

    }

    /**
     * Inserts node before  reference node
     * @param {Element} $newNode inserted before reference
     * @param {Element} $refNode reference
     */
    insertBefore($newNode, $refNode) {

        if (typeof $refNode.parentElement !== 'undefined') {

            $refNode.parentElement.insertBefore($newNode, $refNode);

        }

    }

    /**
     * Adds class to node
     * @param {Element} $node for the class
     * @param {String} className that gets added to node
     */
    addClass($node, className = '') {

        if (className === '') {

            return;

        }

        if ($node instanceof NodeList || $node instanceof Array) {

            [...$node].forEach($node => this.addClass($node, className));

        } else if ($node.classList) {

            $node.classList.add(className);

        } else {

            $node.className += ' ' + className;

        }

    }

    /**
     * Removes class from node
     * @param {Element} $node for the class
     * @param {String} className that gets removed from node
     */
    removeClass($node, className = '') {

        if (className === '') {

            return;

        }

        if ($node instanceof NodeList || $node instanceof Array) {

            [...$node].forEach($node => this.removeClass($node, className));

        } else if ($node.classList) {

            $node.classList.remove(className);

        } else if ($node.className) {

            $node.className = $node.className.replace(
                new RegExp('(^|\\b)' + className + '(\\b|$)', 'gi'), ' ');

        }

    }

    /**
     * Adds/removes class from node if already existing
     * @param {Element} $node for the class
     * @param {String} className that gets toggled from node
     */
    toggleClass($node, className) {

        if (this.hasClass($node, className)) {

            this.removeClass($node, className);

        } else {

            this.addClass($node, className);

        }

    }

    /**
     * Checks if node has class
     * @param {Element} $node gets cehcked
     * @param {String} className in question
     * @return {Boolean}
     */
    hasClass($node, className) {

        if ($node.classList) {

            return $node.classList.contains(className);

        } else {

            return $node.className.indexOf(className) >= 0;

        }

    }

    /**
     * Sets attribute for node
     * @param {Element} $node for the attribute
     * @param {String} attrib attribute key
     * @param {String} value attribute value
     * @return {Element} base node
     */
    setAttrib($node, attrib, value) {

        if ($node instanceof NodeList || $node instanceof Array) {

            [...$node].forEach($node => $node.setAttribute(attrib, value));

        } else {

            $node.setAttribute(attrib, value);

        }

        return $node;

    }

    /**
     * Removes attribute from node
     * @param {Element} $node for the attribute
     * @param {String} attrib attribute key
     * @param {String} value attribute value
     * @return {Element} base node
     */
    removeAttrib($node, attrib) {

        if ($node instanceof NodeList || $node instanceof Array) {

            [...$node].forEach($node => $node.removeAttribute(attrib));

        } else {

            $node.removeAttribute(attrib);

        }

        return $node;

    }

    /**
     * Index of node  depending on siblings
     * @param {Element} $node
     * @return {Number} index
     */
    index($node) {

        if (typeof $node.parentNode.children === 'undefined') {

            return Array.prototype.filter.call(
                $node.parentNode.childNodes,
                ($node) => {

                    return $node.nodeType === Node.ELEMENT_NODE;

                }).indexOf($node);

        } else {

            return Array.prototype.indexOf.call(
                $node.parentNode.children, $node);

        }

    }

    /**
     * Adds dom event listener
     * @param {Element} $node for the listener
     * @param {String} event name/key to listen to
     * @param {Function} callback function when event dispatched
     */
    on($node, event, callback) {

        if ($node instanceof NodeList || $node instanceof Array) {

            this.eventListenerCounter += $node.length;
            this.eventListenerTargets.push({ $node, event });
            [...$node].forEach(($node) => {

                $node.addEventListener(event, callback, false);

            });

        } else {

            this.eventListenerTargets.push({ $node, event });
            this.eventListenerCounter ++;
            $node.addEventListener(event, callback, false);

        }

    }

    /**
     * Delegates all events to children of node matching selector
     * @param {Element} $node for the listener
     * @param {String} query children selector
     * @param {String} event name/key to listen to
     * @param {Function} callback function when event dispatched
     */
    onDelegate($node, query, event, callback) {

        const cb = (event) => {

            const $node = this.getNodeOrChild(event.target, query);

            if ($node) {

                event.delegationTarget = $node;
                callback(event);

            }

        };

        // all standard events
        if (event !== 'mouseenter' && event !== 'mouseleave') {

            this.on($node, event, cb);

        } else if (event === 'mouseenter') { // mouseenter

            this.on($node, 'mouseover', cb);

        } else if (event === 'mouseleave') { // mouseleave

            this.on($node, 'mouseout', cb);

        }

        $node._delegateCallback = cb;

    }

    /**
     * Removes dom event listener
     * @param {Element} $node for the listener
     * @param {String} event name/key to listen to
     * @param {Function} callback function removed for event
     */
    off($node, event, callback) {

        if ($node instanceof NodeList || $node instanceof Array) {

            this.eventListenerCounter -= $node.length;

            [...$node].forEach(($node) => {

                $node.removeEventListener(event, callback);

            });

        } else {

            this.eventListenerCounter --;
            $node.removeEventListener(event, callback);

        }

    }

    /**
     * Removes dom event delegation
     * @param {Element} $node for the listener
     * @param {String} event name/key to remove
     */
    offDelegate($node, event) {

        this.eventListenerCounter --;

        if (typeof $node._delegateCallback !== 'undefined') {

            this.off($node, event, $node._delegateCallback);

        }

    }

    /**
     * Adds dom event listener for single event
     * @param {Element} $node for the listener
     * @param {String} event name/key to remove
     * @param {Function} callback function removed for event
     */
    one($node, event, callback) {

        const callbackWrapper = (e) => {

            callback(e);
            this.off($node, event, callbackWrapper);

        };

        this.on($node, event, callbackWrapper);

    }

    /**
     * Transforms NodeList to array
     * @param {NodeList} $nodeList for transform
     * @return {Array} of dom nodes
     */
    toArray($nodeList) {

        if ($nodeList instanceof NodeList) {

            return Array.prototype.slice.call($nodeList);

        } else {

            return [$nodeList];

        }

    }

}

export default new DOMUtils();
