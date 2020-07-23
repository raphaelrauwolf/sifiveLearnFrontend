
import {
    LitElement, html, customElement, eventOptions,
} from 'lit-element';

import Router from 'Utils/Router';

// load required components
import 'Components/Forgot/ForgotForm';
import 'Components/Global/SVGIcon';
import 'Components/Global/TopBar';

import { getStyles } from './Styles';

/**
 * HomeWelcome LitElement
 * template
 */
@customElement('forgot-main')
class ForgotMain extends LitElement {

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
            <!-- ForgotMain -->
            <top-bar visible>
                <div slot="content" class="top-bar-content grid-container">
                    <div class="back-link" @click="${this.onBackClick}">
                        <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                    </div>
                </div>
            </top-bar>
            <div class="grid-container">
                <div class="form-container">
                    <h3>In trouble? Don't worry.</h3>
                    <p>Type your E-mail in the form to send recovery instructions to the account you used signing up with SiFive Learn.</p>
                    <forgot-form form-id="ForgotView.ForgotForm"></forgot-form>
                </div>
            </div>
        `;

    }

    /**
     * On back click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBackClick(event) {

        Router.back();

    }

}

export { ForgotMain };
