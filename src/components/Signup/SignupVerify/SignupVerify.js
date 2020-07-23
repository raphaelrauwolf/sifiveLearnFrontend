
import {
    LitElement, html, customElement, eventOptions,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SignupVerify LitElement
 * template
 */
@customElement('signup-verify')
class SignupVerify extends LitElement {

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

        return html`
            <!-- SignupVerify -->
            <div class="grid-container">
                <div class="content-container">
                    <div class="text-container">
                        <h1>Verify your E-mail and start learning!</h1>
                        <p>Thanks for signing up with SiFive Learn. We’re excited to have you onboard. Please make sure to verify your E-mail address clicking on the link in the E-mail we just sent you (give it a few minutes).</p>
                    </div>
                    <hr>
                    <div class="resend-container">
                        <h5>Did not receive a verification E-mail from us?</h5>
                        <div>
                            <div class="button" @click="${this.onResendClick}">Resend E-Mail</div> Or contact our <a href="#" class="support-link">Support</a> for more help.
                        </div>
                    </div>
                </div>
            </div>`;

    }

    /**
     * Resend the verification mail
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onResendClick(event) {}

}

export { SignupVerify };
