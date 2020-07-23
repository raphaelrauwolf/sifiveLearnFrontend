
import {
    html, customElement, eventOptions, property,
} from 'lit-element';

import Router from 'Utils/Router';

import {
    isCheckingResetCode,
    getCheckResetCodeError,
} from 'Selectors/User';
import { getPathPart } from 'Selectors/Router';
import UserActions from 'Actions/User';

// load required components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Reset/ResetForm';
import 'Components/Global/SVGIcon';
import 'Components/Global/TopBar';
import 'Components/Global/SifiveLoader';

import { getStyles } from './Styles';

/**
 * ResetMain LitElement
 * template
 */
@customElement('reset-main')
class ResetMain extends ConnectedComponent {

    @property({ type: Boolean })
    isCheckingResetCode = false;

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

        if (this.isCheckingResetCode) {

            return html`<sifive-loader></sifive-loader>`;

        }

        if (this.checkResetCodeError) {

            console.log(this.checkResetCodeError);

            return html`
                <!-- ResetMain Error -->
                <top-bar visible>
                    <div slot="content" class="top-bar-content grid-container">
                        <div class="back-link" @click="${this.onBackClick}">
                            <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                        </div>
                    </div>
                </top-bar>

                <div class="grid-container">
                    <div class="form-container">
                        <h3>Something went wrong with your code :/</h3>
                    </div>
                </div>`;

        }

        return html`
            <!-- ResetMain -->
            <top-bar visible>
                <div slot="content" class="top-bar-content grid-container">
                    <div class="back-link" @click="${this.onBackClick}">
                        <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                    </div>
                </div>
            </top-bar>

            <div class="grid-container">
                <div class="form-container">
                    <h3>Create new password</h3>
                    <p>Please type a new password in the input field below.</p>
                    <reset-form form-id="ResetView.ResetForm"></reset-form>
                </div>
            </div>`;

    }

    /**
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        this.store.dispatch(
            UserActions.checkResetCodeIfNeeded(this.resetCode));

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        this.resetCode = getPathPart(state, 1);
        this.isCheckingResetCode = isCheckingResetCode(state);
        this.checkResetCodeError = getCheckResetCodeError(state);

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

export { ResetMain };
