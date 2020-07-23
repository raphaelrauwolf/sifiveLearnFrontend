
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { SifiveDropzone } from 'Components/Global/SifiveDropzone';

import { getStyles } from './Styles';

/**
 * SifiveDraggable LitElement
 * template
 */
@customElement('sifive-draggable')
class SifiveDraggable extends LitElement {

    @property({ type: String })
    handleSelector = '';

    @property({ type: String })
    cloneSelector = '';

    // @property({ type: Boolean })
    dragging = false;

    // @property({ type: Boolean })
    dropped = false;

    clonePosition = { x: 0, y: 0 };

    /**
     * Bind the listeners and create the element
     */
    constructor() {

        super();

        this.onMouseDown = ::this.onMouseDown;
        this.onMouseUp = ::this.onMouseUp;
        this.onDragStart = ::this.onDragStart;
        this.onDragOver = ::this.onDragOver;
        this.onDragEnd = ::this.onDragEnd;
        this.onDrop = ::this.onDrop;

    }


    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- SifiveDraggable Component -->
            <slot @slotchange="${this.onSlotChange}"></slot>
        `;

    }

    /**
     * Select elements the slot and find the drag handle
     * @param {Object}changedProps
     */
    firstUpdated(changedProps) {

        this.$slot = DOMUtils.q('slot', this.shadowRoot);

        this.updateHandle();

    }

    /**
     * Find the drag handle in the current slot
     */
    updateHandle() {

        this.$node = this.$slot.assignedNodes().filter(node => node.tagName)[0];

        if (this.handleSelector !== '') {

            this.$handlers = DOMUtils.a(this.handleSelector, this.$node);

            DOMUtils.setAttrib(this.$node, 'draggable', 'true');
            DOMUtils.setAttrib(this.$handlers, 'draggable', 'true');

            DOMUtils.on(this.$handlers, 'mousedown', ::this.onMouseDown);

        }

    }

    /**
     * Reset all listeners
     */
    removeListeners() {

        DOMUtils.off(document, 'mouseup', this.onMouseUp);
        DOMUtils.off(document, 'dragstart', this.onDragStart);
        DOMUtils.off(document, 'dragover', this.onDragOver);
        DOMUtils.off(document, 'dragend', this.onDragEnd);
        DOMUtils.off(document, 'drop', this.onDrop);

    }

    /**
     * Add a clone of the dragged element
     */
    addClone() {

        this.$cloneContainer = document.createElement('div');

        if (this.cloneSelector === '' || !DOMUtils.q(this.cloneSelector, this.$node)) {

            this.$clone = this.$node.cloneNode(true);

        } else {

            this.$clone = DOMUtils.q(this.cloneSelector, this.$node)
                .cloneNode(true);

        }

        DOMUtils.addClass(this.$clone, 'dragging-clone');
        this.$cloneContainer.appendChild(this.$clone);

        this.insertBefore(this.$cloneContainer, this.$node);

        this.setCloneStyles();

    }

    /**
     * Remove the created clone
     */
    removeClone() {

        this.$cloneContainer.removeChild(this.$clone);
        this.removeChild(this.$cloneContainer);
        this.$cloneContainer = undefined;
        this.$clone = undefined;

    }

    /**
     * Preset clone styles
     */
    setCloneStyles() {

        Object.assign(this.$cloneContainer.style, {
            left: 0,
            position: 'fixed',
            pointerEvents: 'none',
            top: 0,
            zIndex: 9999,
        });

    }

    /**
     * Set clone offset
     * @param {Object} coordinatess
     */
    setCloneOffset({ x, y, $handler }) {

        const rect = this.$clone.getBoundingClientRect();

        Object.assign(this.$cloneContainer.style, {
            marginLeft: `${rect.width / -2}px`,
            marginTop: `${rect.height / -2}px`,
        });

    }

    /**
     * Move the clone to the cursor
     * @param {Object} coordinates
     */
    moveClone({ x, y }) {

        if (!this.$cloneContainer) {

            return;

        }

        if (
            !this.moveClone.lastPosition ||
            this.moveClone.lastPosition.x !== x ||
            this.moveClone.lastPosition.y !== y
        ) {

            this.$cloneContainer.style.transform = `translate3D(${x}px, ${y}px, 0)`;

        }

        this.moveClone.lastPosition = {
            x, y,
        };

    }

    /**
     * Apply user select style to element
     * @param  {Node} element
     * @param  {String} value
     */
    applyUserSelect(element, value) {

        element.style.webkitUserSelect = value;
        element.style.mozUserSelect = value;
        element.style.msUserSelect = value;
        element.style.oUserSelect = value;
        element.style.userSelect = value;

    }

    /**
     * Search for the nearest Dropzone in the event tree
     * @param {Event} event
     * @return {Boolean}
     */
    findClosestDropzone(event) {

        const path = event.composedPath();

        return path.find(($node) => {

            return $node instanceof SifiveDropzone;

        });

    }

    /**
     * Fires the event to notify about dropzone drop
     * @param {Node} dropzone
     */
    drop(dropzone) {

        const eventName = dropzone.dropEventName || 'dropzone-drop';

        this.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                dropzone,
                payload: dropzone.payload,
            },
            bubbles: false,
            composed: true,
        }));

    }

    /**
     * Update clone position on RAF
     */
    updatePosition() {

        if (this.dragging) {

            window.requestAnimationFrame(::this.updatePosition);
            this.moveClone(this.clonePosition);

        }

    }

    /**
     * Update the handles when slot changes
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSlotChange(event) {

        // this.updateHandle();

    }

    /**
     * MouseDown handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseDown(event) {

        DOMUtils.on(document, 'mouseup', this.onMouseUp);
        DOMUtils.on(document, 'dragstart', this.onDragStart);
        DOMUtils.on(document, 'dragover', this.onDragOver);
        DOMUtils.on(document, 'dragend', this.onDragEnd);
        DOMUtils.on(document, 'drop', this.onDrop);

        this.applyUserSelect(document.body, 'none');

        this.addClone(event);

        this.setCloneOffset({
            $handler: event.target,
            x: event.clientX,
            y: event.clientY,
        });

        this.clonePosition = {
            x: event.clientX,
            y: event.clientY,
        };

        DOMUtils.addClass(this, 'dragging');

        this.dragging = true;
        this.dropped = false;

        this.updatePosition();

    }

    /**
     * MouseUp handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseUp(event) {

        this.removeListeners();
        this.removeClone();

        DOMUtils.removeClass(this, 'dragging');

        this.dragging = false;

    }

    /**
     * DragStart handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragStart(event) {

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', '');

        // clear the drag image
        const dragImage = document.createElement('div');
        dragImage.style.display = 'none';
        event.dataTransfer.setDragImage(dragImage, 0, 0);

    }

    /**
     * DragOver handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragOver(event) {

        this.clonePosition = {
            x: event.clientX,
            y: event.clientY,
        };

        const dropzone = this.findClosestDropzone(event);

        if (dropzone && this.lastDropzone !== dropzone) {

            this.lastDropzone = dropzone;

            DOMUtils.addClass(this, 'droppable');
            DOMUtils.addClass(this, dropzone.droppableClass);
            DOMUtils.addClass(dropzone, 'drop-target');

            this.dispatchEvent(new CustomEvent('draggable-droppable', {
                detail: {
                    dropzone,
                },
                bubbles: false,
                composed: true,
            }));

        } else if (!dropzone && this.lastDropzone) {

            DOMUtils.removeClass(this, 'droppable');
            DOMUtils.removeClass(this, this.lastDropzone.droppableClass);
            DOMUtils.removeClass(this.lastDropzone, 'drop-target');
            this.lastDropzone = undefined;

        }

        if (!dropzone) {

            if (event.clientY <= 100) {

                window.scrollTo(
                    window.scrollX,
                    Math.max(0, window.scrollY - 5),
                );

            } else if (event.clientY >= window.innerHeight - 100) {

                window.scrollTo(
                    window.scrollX,
                    window.scrollY + 5,
                );

            }

        }

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragEnd(event) {

        this.removeListeners();
        this.removeClone();

        DOMUtils.removeClass(this, 'dragging');
        DOMUtils.removeClass(this, 'droppable');

        this.applyUserSelect(document.body, '');

        this.dragging = false;

        if (this.lastDropzone) {

            this.dropped = true;
            this.drop(this.lastDropzone);
            DOMUtils.removeClass(this.lastDropzone, 'drop-target');

        }

    }

    /**
     * Drop handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDrop(event) {}

}

export { SifiveDraggable };
