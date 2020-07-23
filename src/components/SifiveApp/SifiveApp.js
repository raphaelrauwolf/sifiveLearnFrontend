
import {
    customElement, property,
} from 'lit-element';

import { default as Resize, Events as ResizeEvents } from 'Utils/Resize';
import { default as Router, Events as RouterEvents } from 'Utils/Router';
import { default as Network, Events as NetworkEvents } from 'Utils/Network';

// redux dependencies
import { store } from 'Root/store';

import { isLoggedIn } from 'Selectors/User';
import { getUIState } from 'Selectors/UI'

import AppActions from 'Actions/App';
import RouterActions from 'Actions/Router';
import CourseActions from 'Actions/Course';
import UserActions from 'Actions/User';

// component dependencies
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

// factories
import { loggedOutFactory } from './Factories/loggedOut';
import { loggedInFactory } from './Factories/loggedIn';

// styles
import { getStyles } from './Styles';

/**
 * SifiveApp LitElement
 * contains complete app and logic
 */
@customElement('sifive-app')
class SifiveApp extends ConnectedComponent {

    @property({ type: Boolean })
    loggedIn = false;

    @property({ type: Boolean, attribute: 'sidebar-expanded', reflect: true })
    sidebarExpanded = false;

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

        if (this.loggedIn) {

            return loggedInFactory();

        } else {

            return loggedOutFactory();

        }

    }

    /**
     * Callback for initial update
     */
    firstUpdated() {

        store.dispatch(UserActions.initAuth());

        Resize.addMediaQueryWatcher(
            `(min-width: 768px) and (max-width: 1279px)`,
            (isTablet) => {

                store.dispatch(
                    AppActions.updateTablet(isTablet)
                );

            }
        );

        Resize.addMediaQueryWatcher(`(max-width: 767px)`,
            (isMobile) => {

                store.dispatch(
                    AppActions.updateMobile(isMobile)
                );

            }
        );

        Resize.addEventListener(ResizeEvents.RESIZE,
            () => {

                store.dispatch(
                    AppActions.updateSize(
                        window.innerWidth,
                        window.innerHeight,
                        window.devicePixelRatio,
                    )
                );

            }
        );
        Resize.onResize();

        Network.addEventListener(NetworkEvents.UPDATE, ({ offline }) => {

            store.dispatch(
                AppActions.updateOffline(offline)
            );

        });

        Router.addEventListener(RouterEvents.UPDATE, ({ location }) => {

            store.dispatch(RouterActions.navigateTo(location));
            store.dispatch(
                AppActions.updateDevFlag(location.hash.indexOf('dev') >= 0)
            );

        });

        store.dispatch(RouterActions.navigateTo(location));
        store.dispatch(
            AppActions.updateDevFlag(location.hash.indexOf('dev') >= 0)
        );

    }

    /**
     * Callback for initial update
     * @param {Map} changedProps
     */
    updated(changedProps) {

        if (this.loggedIn && changedProps.has('loggedIn')) {

            store.dispatch(CourseActions.getCourseListIfNeeded());

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.loggedIn = isLoggedIn(state);
        this.sidebarExpanded = getUIState(state).sidebarExpanded;

    }

}

export { SifiveApp };
