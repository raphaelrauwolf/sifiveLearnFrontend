import {
    customElement, property,
} from 'lit-element';

import Router from 'Utils/Router';

import { isLoggedIn } from 'Selectors/User';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

/**
 * PrivateViewComponent LitElement
 * template for Views that require logged in user
 */
@customElement('private-view-component')
class PrivateViewComponent extends BaseViewComponent {

    @property({ type: Boolean })
    loggedIn = false;

    /**
     * Check if View is active and if user is logged in
     * @param {Object} changedProps
     */
    updated(changedProps) {

        if (this.active && !this.loggedIn) {

            Router.replace('/login');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.loggedIn = isLoggedIn(state);

    }

}

export { PrivateViewComponent };
