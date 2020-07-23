
import {
    html, customElement, property,
} from 'lit-element';


import Router from 'Utils/Router';

// redux dependencies
import {
    isVerified,
    isVerifing,
    getVerifyError,
} from 'Selectors/User';
import { getPathPart } from 'Selectors/Router';
import UserActions from 'Actions/User';

// component dependencies
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Global/SifiveLoader';

import { getStyles } from './Styles';

/**
 * VerifyView LitElement
 * template for /signup
 */
@customElement('verify-view')
class VerifyView extends PrivateViewComponent {

    @property({ type: Boolean })
    isVerified = false;

    @property({ type: Boolean })
    isVerifing = false;

    @property({ type: String })
    verifyError = '';

    @property({ type: String })
    verificationCode = '';

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
            <!-- VerifyView Component -->
            <div class="grid-container">
                ${this.isVerifing ?
                html`<sifive-loader></sifive-loader>`:
                html`
                <h1>Error</h1>
                <div>${this.verifyError}</div>
                `}
            </div>
        `;

    }


    /**
     * Verify mail if not verified
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        if (!this.isVerified && !this.isVerifing &&
            this.verificationCode && !this.verifyError) {

            this.store.dispatch(
                UserActions.verifyEmail(this.verificationCode)
            );

        } else if (this.isVerified || !this.verificationCode) {

            Router.replace('/');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.verificationCode = getPathPart(state, 1);
        this.isVerified = isVerified(state);
        this.isVerifing = isVerifing(state);
        this.verifyError = getVerifyError(state);

    }

}

export { VerifyView };
