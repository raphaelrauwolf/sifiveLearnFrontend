
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import Router from 'Utils/Router';

// redux dependencies
import {
    isLoggedIn,
    isVerified,
} from 'Selectors/User';

// component dependencies
import { BaseViewComponent } from 'Components/Global/BaseViewComponent';
import 'Components/Signup/SignupMain';
import 'Components/Signup/SignupVerify';

import { getStyles } from './Styles';

/**
 * SignupView LitElement
 * template for /signup
 */
@customElement('signup-view')
class SignupView extends BaseViewComponent {

    @property({ type: Boolean })
    needsSignup = false;

    @property({ type: Boolean })
    needsVerify = false;

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
            <!-- SignupView Component -->
            <div class="wrapper">
            ${
                this.needsSignup ?
                html`<signup-main></signup-main>` :
                this.needsVerify ?
                html`<signup-verify></signup-verify>` :
                ''}
            </div>

        `;

    }

    /**
     * Get current User if not in state
     * @param {Object} changedProps
     */
    updated(changedProps) {

        // if logged in
        if (!this.needsSignup && !this.needsVerify) {

            Router.replace('/');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.needsSignup = !isLoggedIn(state) && !isVerified(state);
        this.needsVerify = isLoggedIn(state) && !isVerified(state);

    }

    /**
     * IResend the veri
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onResendClick(event) {}

}

export { SignupView };
