
import {
    html, customElement, property,
} from 'lit-element';

import Router from 'Utils/Router';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

// load required components
import 'Components/LoginForm';

import { getStyles } from './Styles';

/**
 * LoginView LitElement
 * template for /login
 */
@customElement('login-view')
class LoginView extends BaseViewComponent {

    @property({ type: Boolean })
    loggedIn = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- LoginView Component -->
            <div class="grid-container padding-top-xl">
                <h1 class="small margin-bottom-xl">Sign in</h1>
                <login-form form-id="LoginView.LoginForm"></login-form>
            </div>
        `;

    }

    /**
     * Get current User if not in state
     * @param {Object} changedProps
     */
    updated(changedProps) {

        if (this.loggedIn) {

            Router.push('/main');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        const userState = state.User;

        this.loggedIn = !!userState.LoggedIn;

    }

}

export { LoginView };
