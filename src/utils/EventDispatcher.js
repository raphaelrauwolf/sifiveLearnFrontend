
/**
 * EventDispatcher class lets you add/dispatch/remove events
 */
class EventDispatcher {

    listeners = {};

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * Adds event listener
     * @param {String} event event name
     * @param {Function} callback function fired when event is dispatched
     */
    addEventListener(event, callback) {

        if (typeof this.listeners[event] === 'undefined') {

            this.listeners[event] = [];

        }

        if (this.listeners[event].indexOf(callback) === -1) {

            this.listeners[event].push(callback);

        }

    }

    /**
     * Removes event listener
     * @param {String} event event name
     * @param {Function} callback function to remove from list
     */
    removeEventListener(event, callback) {

        if (typeof this.listeners[event] !== 'undefined') {

            const index = this.listeners[event].indexOf(callback);

            if (index !== -1) {

                this.listeners[event].splice(index, 1);

            }

        }

    }

    /**
     * Dispatches an event
     * @param {String} event event name
     * @param {Object} data additional information
     */
    dispatchEvent(event, data) {

        if (typeof this.listeners[event] !== 'undefined') {

            const callbacks = this.listeners[event].slice(0);

            for (let i = 0; i < callbacks.length; i++) {

                if (typeof callbacks[i] === 'function') {

                    callbacks[i](data);

                }

            }

        }

    }

    /**
     * Adds an event listener for only one dispatch
     * @param {String} event event name
     * @param {Function} callback function fired when event is dispatched
     */
    one(event, callback) {

        if (typeof this.listeners[event] === 'undefined') {

            this.listeners[event] = [];

        }


        const fullCallback = () => {

            callback();
            this.removeEventListener(event, fullCallback);

        };

        if (this.listeners[event].indexOf(fullCallback) === -1) {

            this.listeners[event].push(fullCallback);

        }

    }

}

export { EventDispatcher };
