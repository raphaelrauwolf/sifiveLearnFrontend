
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
@customElement('forgot-mail-sent')
class ForgotMailSent extends LitElement {

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
            <!-- ForgotMailSent -->
            <top-bar visible>
                <div slot="content" class="top-bar-content grid-container">
                    <div class="back-link" @click="${this.onBackClick}">
                        <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                    </div>
                </div>
            </top-bar>
            <div class="grid-container">
                <div class="message-container">
                    <h3>You have mail!</h3>
                    <p>Check your inbox for the email with the link to reset your super secret password!</p>
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

        Router.push('/');

    }

}

export { ForgotMailSent };
