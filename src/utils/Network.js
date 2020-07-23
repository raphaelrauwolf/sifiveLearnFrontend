
import { EventDispatcher } from 'Utils/EventDispatcher';
import DOMUtils from 'Utils/DOMUtils';

const Events = {
    UPDATE: 'Network.Events.UPDATE',
};

/**
 * Network class dispatching on on/offline events
 */
class Network extends EventDispatcher {

    /**
     * Class constructor setting up listeners
     */
    constructor() {

        super();

        DOMUtils.on(window, 'online', ::this.onOnline);
        DOMUtils.on(window, 'offline', ::this.onOffline);

    }

    /**
     * online event callback
     */
    onOnline() {

        this.dispatchEvent(Events.UPDATE, { offline: false });

    }

    /**
     * offline event callback
     */
    onOffline() {

        this.dispatchEvent(Events.UPDATE, { offline: true });

    }

}

export default new Network();
export { Events };
