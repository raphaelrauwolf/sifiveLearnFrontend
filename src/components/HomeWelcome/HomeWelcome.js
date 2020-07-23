
import {
    html, customElement, eventOptions, property,
} from 'lit-element';

import Router from 'Utils/Router';

// Redux Actions
import LoginFormActions from 'Actions/LoginForm';

// Redux Selectors
import { getSavedInvite } from 'Selectors/Invite';

// Components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/LoginForm';

import { getStyles } from './Styles';

/**
 * HomeWelcome LitElement
 * template
 */
@customElement('home-welcome')
class HomeWelcome extends ConnectedComponent {

    @property({ type: Boolean })
    isDev = false;

    @property({ type: String })
    savedInvite = false;

    formID = 'HomeView.LoginForm';

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
                <hr>
                <div class="some-container">
                    <p>You can use your Faceook or Google account to Sign Up</p>
                    <div class="facebook-button" @click="${this.onFacebookLoginClick}">Continue with Facebook</div>
                    <div class="google-button" @click="${this.onGoogleLoginClick}">Sign in with Google</div>
                </div>`;

        }

        let inviteCTA;
        if (this.inviteID) {

            inviteCTA = html`
                <div class="invite-cta">
                    <h5>To accept the <u>invite</u>, either <u><a href="/signup">sign up</a></u> or <u>log in</u>, if you are already registered!</h5>
                </div>`;

        }

        return html`
            <!-- HomeWelcome -->
            <div class="wrapper">
                <div class="login-container">
                    <h1>Sign in</h1>
                    <login-form form-id="${this.formID}"></login-form>
                    ${someContainer}
                </div>
                <div class="signup-container">
                    <div class="text-container">
                        <div class="inner-container">
                            <h1>Sign in</h1>
                            <p>
                            Get access to top quality education content.<br>
                            Join teams or roam around as an individual learner across our courses.
                            </p>
                        </div>
                    </div>
                    <div class="cta" @click="${this.onSignupClick}">Create Free Account</div>
                    <div class="image-container">
                        <img src="assets/images/signup.png" />
                    </div>
                </div>
                ${inviteCTA}
            </div>
        `;

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        this.isDev = state.App.isDev;
        this.inviteID = getSavedInvite(state);

    }

    /**
     * Callback for Signup click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSignupClick(event) {

        Router.push('/signup');

    }

    /**
     * Start Google Login
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onGoogleLoginClick(event) {

        this.store.dispatch(
            LoginFormActions.loginGoogle(this.formID)
        );

    }

    /**
     * Start Facebook Login
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFacebookLoginClick() {

        this.store.dispatch(
            LoginFormActions.loginFacebook(this.formID)
        );

    }

}

export { HomeWelcome };
