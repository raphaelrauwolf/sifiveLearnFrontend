import { createBrowserHistory } from 'history';
import pathRegexp from 'path-to-regexp';

import { EventDispatcher } from 'Utils/EventDispatcher';
import DOMUtils from 'Utils/DOMUtils';

const Events = {
    UPDATE: 'Router.Events.UPDATE',
};

/**
 * Router class helps keeping track of browser history
 */
class Router extends EventDispatcher {

    history;
    currentLocation;
    routes = [];

    /**
     * Class constructor
     */
    constructor() {

        super();

        this.init();

    }

    /**
     * Intializes history and listeners
     */
    init() {

        this.setupListeners();
        this.setupHistory();

    }

    /**
     * Setup listeners that check every link click
     */
    setupListeners() {

        DOMUtils.on(document.body, 'click', ::this.onClick);

    }

    /**
     * Setup history and listeners
     */
    setupHistory() {

        this.history = createBrowserHistory({});

        this.history.listen((location) => {

            if (this.currentLocation.pathname !== location.pathname) {

                const previousLocation = this.currentLocation;

                this.currentLocation = location;

                this.dispatchEvent(Events.UPDATE, {
                    location,
                    previousLocation,
                });

            } else if (this.currentLocation.hash !== location.hash) {

                const previousLocation = this.currentLocation;

                this.currentLocation = location;

                this.dispatchEvent(Events.UPDATE, {
                    location,
                    previousLocation,
                    isHash: true,
                });

            }

        });

        this.currentLocation = this.history.location;

        this.dispatchEvent(Events.UPDATE, {
            location: this.currentLocation,
            isFirst: true,
        });

    }

    /**
     * Push path into history
     * @param {String} path
     */
    push(path) {

        this.history.push(path);

    }

    /**
     * Replace current path into history
     * @param {String} path
     */
    replace(path) {

        this.history.replace(path);

    }

    /**
     * Go back in history
     */
    back() {

        this.history.goBack();

    }

    /**
     * Go forward in history
     */
    forward() {

        this.history.goForward();

    }

    /**
     * Checks if given link is an external link
     * @param {String} $link
     * @return {Boolean}
     */
    isExternal($link) {

        return !(
            location.hostname === $link.hostname ||
            !$link.hostname.length
        );

    }

    /**
     * Checks if given link is an utility link like mailto etc.
     * @param {String} $link
     * @return {Boolean}
     */
    isUtility($link) {

        const utilityList = [
            'mailto:',
            'tel:',
            'skype:',
        ];

        const isUtility = utilityList.find((str) => {

            return $link.href.indexOf(str) >= 0;

        });

        return !!isUtility;

    }

    /**
     * Checks if given link should be ignored
     * @param {String} $link
     * @return {Boolean}
     */
    isIgnored($link) {

        const ignore = DOMUtils.hasClass($link, 'router-ignore');

        return !!ignore;

    }

    /**
     * Checks if the current location and the given route match
     * @param {String} route
     * @return {Boolean}
     */
    match(route) {

        return pathRegexp(route).test(this.currentLocation.pathname);

    }

    /**
     * Callback when a link on the site is clicked
     * @param {Event} event
     * @return {Boolean}
     */
    onClick(event) {

        const $target = event.composedPath().filter(
            n => n.tagName === 'A'
        )[0];

        if (!$target || $target.target ||
            $target.hasAttribute('download') ||
            $target.getAttribute('rel') === 'external'
        ) {

            return true;

        }

        const isExternal = this.isExternal($target);
        const isUtility = this.isUtility($target);
        const isIgnored = this.isIgnored($target);
        const isNewTab = event.ctrlKey || event.metaKey;
        const isBlank = $target.target === '_blank';

        if (!isIgnored && !isExternal && !isUtility && !isNewTab && !isBlank) {

            event.preventDefault();
            event.stopImmediatePropagation();

            const href = $target.href;
            const hostname = $target.hostname;
            let path = href.substr(href.indexOf(hostname) + hostname.length);

            if (path[0] !== '/') {

                path = path.substr(path.indexOf('/'));

            }

            this.history.push(path);

            return false;

        }

        return true;

    }

}

export default new Router();
export { Events };
