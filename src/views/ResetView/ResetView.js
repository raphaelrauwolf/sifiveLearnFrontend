
import {
    html, customElement, property,
} from 'lit-element';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

// load required components
import 'Components/Reset/ResetMain';

import { getStyles } from './Styles';

/**
 * ResetView LitElement
 * template for /reset
 */
@customElement('reset-view')
class ResetView extends BaseViewComponent {

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
            <!-- ResetView Component -->
            <div class="wrapper">
                ${this.sentMail ?
                html`<div>Email sent</div>`:
                html`<reset-main></reset-main>`}
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

        if (state.ForgotForm['ResetView.ForgotForm']) {

            this.sentMail = state.ForgotForm['ResetView.ForgotForm'].SentMail;

        }

    }

}

export { ResetView };
