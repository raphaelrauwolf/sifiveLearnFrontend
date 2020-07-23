
import {
    html, customElement, eventOptions, property
} from 'lit-element';

import Router from 'Utils/Router';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Signup/SignupForm';
import 'Components/Global/SVGIcon';
import 'Components/Global/TopBar';

// redux dependencies
import SignupFormActions from 'Actions/SignupForm';

import { getStyles } from './Styles';

/**
 * SignupMain LitElement
 * template
 */
@customElement('signup-main')
class SignupMain extends ConnectedComponent {

    @property({ type: Boolean })
    isDev = false;

    formID = 'SignupView.SignupForm';

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

        let someContainer;
        if (this.isDev) {

            someContainer = html`
                <div class="some-container">
                    <p>You can use your Faceook or Google account to Sign Up</p>
                    <div class="facebook-button" @click="${this.onFacebookLoginClick}">Continue with Facebook</div>
                    <div class="google-button" @click="${this.onGoogleLoginClick}">Sign in with Google</div>
                </div>`;

        }

        return html`
            <!-- SignupMain -->
            <top-bar visible>
                <div slot="content" class="top-bar-content grid-container">
                    <div class="back-link" @click="${this.onBackClick}">
                        <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                    </div>
                </div>
            </top-bar>
            <div class="grid-container">
                <div class="top-container">
                    <div class="text-container">
                        <h1>Sign Up</h1>
                        <p>
                        Use the form bellow to sign up by using your E-Mail. * Required Information.<br>
                        You can also use Facebook Connect or Google Plus to safely create an account.
                        </p>
                    </div>
                    ${someContainer}
                </div>
                <hr>
                <div class="form-container">
                    <signup-form form-id="${this.formID}"></signup-form>
                </div>
            </div>
        `;

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        this.isDev = state.App.isDev;

    }

    /**
     * On back click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBackClick(event) {

        Router.back();

    }

    /**
     * Start Google Login
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onGoogleLoginClick(event) {

        this.store.dispatch(
            SignupFormActions.signinGoogle(this.formID)
        );

    }

    /**
     * Start Facebook Login
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFacebookLoginClick() {

        this.store.dispatch(
            SignupFormActions.signinFacebook(this.formID)
        );

    }

}

export { SignupMain };
