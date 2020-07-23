
import {
    html, customElement, property,
} from 'lit-element';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

// load required components
import 'Components/Forgot/ForgotMain';
import 'Components/Forgot/ForgotMailSent';

import { getStyles } from './Styles';

/**
 * ForgotView LitElement
 * template for /forgot
 */
@customElement('forgot-view')
class ForgotView extends BaseViewComponent {

    @property({ type: Boolean })
    sentMail = false;

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
            <!-- ForgotView Component -->
            <div class="wrapper">
                ${this.sentMail ?
                html`<forgot-mail-sent></forgot-mail-sent>`:
                html`<forgot-main></forgot-main>`}
            </div>
        `;

    }

    /**
     * Get current User if not in state
     * @param {Object} changedProps
     */
    updated(changedProps) {}

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        if (state.ForgotForm['ForgotView.ForgotForm']) {

            this.sentMail = state.ForgotForm['ForgotView.ForgotForm'].SentMail;

        }

    }

}

export { ForgotView };
