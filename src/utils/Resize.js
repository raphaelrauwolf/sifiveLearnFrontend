
import { EventDispatcher } from 'Utils/EventDispatcher';
import DOMUtils from 'Utils/DOMUtils';

import _debounce from 'lodash.debounce';

export const Events = {
    RESIZE: 'Resize.Events.RESIZE',
};

/**
 * Resizer class dispatching on resize and offering media query match callbacks
 */
class Resize extends EventDispatcher {

    watchedMQs = {};

    /**
     * Class constructor adds resize event listener
     */
    constructor() {

        super();

        DOMUtils.on(window, 'resize', _debounce(this.onResize, 200));

    }

    /**
     * Adds a media query listener callback
     * @param {String} mediaQuery - the depending media query
     * @param {Function} callback - callback returning if media query matches
     */
    addMediaQueryWatcher(mediaQuery, callback) {

        if (typeof this.watchedMQs[mediaQuery] === 'undefined') {

            this.watchedMQs[mediaQuery] = {
                callbacks: [],
                list: window.matchMedia(mediaQuery),
            };

            this.watchedMQs[mediaQuery].list.addListener((e) => {

                this.watchedMQs[mediaQuery].callbacks.forEach((cb) => {

                    cb(e.matches);

                });

            });

        }

        this.watchedMQs[mediaQuery].callbacks.push(callback);

        callback(this.watchedMQs[mediaQuery].list.matches);

    }

    /**
     * Callback for resize event listener
     */
    onResize = () => {

        this.dispatchEvent(Events.RESIZE);

    }

}

export default new Resize();
