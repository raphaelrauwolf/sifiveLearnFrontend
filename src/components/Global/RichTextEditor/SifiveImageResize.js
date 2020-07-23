
import Quill from 'quill';

const DefaultOptions = {

    updateCallback: () => {},

    targetFilter: target => target.tagName && target.tagName.toUpperCase() === 'SIFIVE-RESOURCE',

    uiStyles: {
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid var(--app-color-blue)',
    },
    displaySizeStyles: {
        position: 'absolute',
        fontSize: '11px',
        fontFamily: 'var(--app-font-body)',
        lineHeight: '11px',
        padding: '8px 8px',
        textAlign: 'center',
        backgroundColor: 'var(--app-color-blue-accent)',
        color: 'var(--app-color-black)',
        boxSizing: 'border-box',
        opacity: '.8',
        cursor: 'default',
    },
    resizeHandleStyles: {
        position: 'absolute',
        height: '12px',
        width: '12px',
        backgroundColor: 'var(--app-color-blue-accent)',
        border: '1px solid var(--app-color-blue)',
        boxSizing: 'border-box',
        opacity: '.8',
        transform: 'translate(-50%, -50%)',
    },

};

/**
 * [SifiveImageResize description]
 */
class SifiveImageResize {

    /**
     * Constructor
     * @param  {Object} quill
     * @param  {Object} options
     */
    constructor(quill, options = {}) {

        this.quill = quill;
        this.options = {
            ...DefaultOptions,
            ...options,
        };

        // attach listener to editor
        this.quill.root.addEventListener('click', this.handleClick, false);

        // set position to relative for positioning
        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';

    }

    /**
     * Click handler
     * @param  {Object} event
     * @return {Boolean}
     */
    handleClick = (event) => {

        if (event.target && this.options.targetFilter(event.target)) {

            if (this.element === event.target) {

                return;

            }

            if (this.element) {

                this.hide();

            }

            this.show(event.target);

        } else if (this.element) {

            this.hide();

        }

        return false;

    };

    /**
     * Show ui
     * @param {Element} element
     */
    show(element) {

        this.element = element;
        this.showUi();
        this.initModules();

    }

    /**
     * Hide ui
     */
    hide() {

        this.hideUi();
        this.element = undefined;

    }

    /**
     * Show ui
     */
    showUi() {

        if (this.ui) {

            this.hideUi();

        }

        this.quill.setSelection(null);

        this.setUserSelect('none');

        // listen for the image being deleted or moved
        document.addEventListener('keyup', this.checkImage, true);
        this.quill.root.addEventListener('input', this.checkImage, true);

        // Create and add the ui
        this.ui = document.createElement('div');
        this.ui.setAttribute('draggable', false);
        Object.assign(this.ui.style, this.options.uiStyles);

        this.quill.root.parentNode.appendChild(this.ui);

        this.repositionElements();

    }

    /**
     * Hide ui
     */
    hideUi() {

        if (!this.ui) {

            return;

        }

        // Remove the ui
        this.quill.root.parentNode.removeChild(this.ui);
        this.ui = undefined;

        // stop listening for image deletion or movement
        document.removeEventListener('keyup', this.checkImage);
        this.quill.root.removeEventListener('input', this.checkImage);

        this.setUserSelect('');

    }

    /**
     * Initialize modules
     */
    initModules() {

        this.removeModules();

        this.modules = [
            DisplaySizeModule,
            ResizeModule,
        ].map((Module) => {

            const instance = new Module(this);
            instance.onCreate();

            return instance;

        });

        this.onUpdate();

    }

    /**
     * Remove modules
     */
    removeModules() {

    }

    /**
     * Set ui position
     */
    repositionElements() {

        if (!this.ui || !this.element) {

            return;

        }

        // position the ui over the image
        const parent = this.quill.root.parentNode;
        const imgRect = this.element.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();

        Object.assign(this.ui.style, {
            left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
            top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
        });

    }

    /**
     * Image check and delete if neccessary
     * @param  {Object} event
     */
    checkImage(event) {

        if (this.element) {

            if (event.keyCode == 46 || event.keyCode == 8) {

                Quill.find(this.element).deleteAt(0);

            }

            this.hide();

        }

    }

    /**
     * Setting user select to stop selecting
     * @param {String} value
     */
    setUserSelect = (value) => {

        [
            'userSelect',
            'mozUserSelect',
            'webkitUserSelect',
            'msUserSelect',
        ].forEach((prop) => {

            this.quill.root.style[prop] = value;
            document.documentElement.style[prop] = value;

        });

    };

    /**
     * Update callback
     */
    onUpdate = () => {

        this.repositionElements();

        this.modules.forEach(module => module.onUpdate());

        this.options.updateCallback();

    }

}

export { SifiveImageResize };

/**
 * BaseModule class for parts of the resize module
 */
class BaseModule {

    /**
     * Base class for resize modules
     * @param {[type]} resizer [description]
     */
    constructor(resizer) {

        this.baseUi = resizer.ui;
        this.element = resizer.element;
        this.options = resizer.options;
        this.requestUpdate = resizer.onUpdate;

    }

    onCreate = () => {};
    onDestroy = () => {};
    onUpdate = () => {};

}

/**
 * DisplaySizeModule for showing current size of image
 * @extends BaseModule
 */
class DisplaySizeModule extends BaseModule {

    /**
     * onCreate callback
     */
    onCreate = () => {

        this.ui = document.createElement('div');
        Object.assign(this.ui.style, this.options.displaySizeStyles);
        this.baseUi.appendChild(this.ui);

    }

    /**
     * onUpdate callback
     */
    onUpdate = () => {

        if (!this.ui || !this.element) {

            return;

        }

        const size = this.getCurrentSize();
        this.ui.innerHTML = size.join(' &times; ');

        if (size[0] > 120 && size[1] > 30) {

            Object.assign(this.ui.style, {
                right: '4px',
                bottom: '4px',
                left: 'auto',
            });

        } else {

            const dispRect = this.ui.getBoundingClientRect();
            Object.assign(this.ui.style, {
                right: `-${dispRect.width + 4}px`,
                bottom: `-${dispRect.height + 4}px`,
                left: 'auto',
            });

        }

    }

    /**
     * Get the size of the current element
     * @return {Array} [width, height]
     */
    getCurrentSize() {

        const { width, height } = this.element.getBoundingClientRect();

        return [Math.round(width), Math.round(height)];

    }

}

/**
 * Resize for resizing the element
 * @extends BaseModule
 */
class ResizeModule extends BaseModule {

    /**
     * onCreate callback
     */
    onCreate = () => {

        this.boxes = [];

        this.addBox('nwse-resize');
        this.addBox('nesw-resize');
        this.addBox('nwse-resize');
        this.addBox('nesw-resize');

        this.positionBoxes();

    }

    /**
     * box onMouseDown callback
     * @param  {Object} event
     * @return {Boolean}
     */
    onMouseDown = (event) => {

        event.stopPropagation();
        event.preventDefault();

        const { width } = this.element.getBoundingClientRect();

        this.dragBox = event.target;
        this.dragStartX = event.clientX;
        this.preDragWidth = width;
        this.setCursor(this.dragBox.style.cursor);

        document.addEventListener('mousemove', this.onMouseMove, false);
        document.addEventListener('mouseup', this.onMouseUp, false);

        return false;

    }

    /**
     * box onMouseMove callback
     * @param  {Object} event
     */
    onMouseMove = (event) => {

        if (!this.element) {

            return;

        }

        event.stopPropagation();

        const deltaX = event.clientX - this.dragStartX;


        if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {

            this.element.style.width = Math.round(this.preDragWidth - deltaX) + 'px';

        } else {

            this.element.style.width = Math.round(this.preDragWidth + deltaX) + 'px';

        }

        this.requestUpdate();

    }

    /**
     * box onMouseUp callback
     * @param  {Object} event
     */
    onMouseUp = (event) => {

        event.stopPropagation();

        this.setCursor('');
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

    }

    /**
     * Create a box
     * @param {String} cursor
     */
    addBox(cursor) {

        const box = document.createElement('div');

        Object.assign(box.style, this.options.resizeHandleStyles);
        box.style.cursor = cursor;

        // listen for mousedown on each box
        box.addEventListener('mousedown', this.onMouseDown, false);
        this.baseUi.appendChild(box);
        this.boxes.push(box);

    }

    /**
     * Position all boxes
     */
    positionBoxes() {

        [
            { left: 0, top: 0 },
            { left: '100%', top: 0 },
            { left: '100%', top: '100%' },
            { left: 0, top: '100%' },
        ].forEach((pos, index) => {

            Object.assign(this.boxes[index].style, pos);

        });

    }

    /**
     * Set cursor
     * @param {String} cursor
     */
    setCursor(cursor) {

        [
            document.body,
            this.element,
        ].forEach(element => element.style.cursor = cursor);

    }

}
