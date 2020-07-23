
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import Router from 'Utils/Router';


// load required components
import 'Components/SifiveField';

// redux dependencies
import {
    isFormInitialized,
    isFormValid,
    isFormSubmitting,
    isFieldValid,
    isFieldInitialized,
    getFieldErrors,
} from 'Selectors/Form';
import { getPathPart } from 'Selectors/Router';
import {
    didUpdatePassword,
    getUpdatePasswordError,
} from 'Selectors/User';
import ResetFormActions from 'Actions/ResetForm';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { getStyles } from './Styles';

/**
 * ResetForm LitElement
 */
@customElement('reset-form')
class ResetForm extends ConnectedComponent {

    @property({ type: String, attribute: 'form-id', reflect: true })
    formID = '';

    @property({ type: Boolean })
    submitDisabled = true;

    @property({ type: String })
    passwordErrorMessage = '';

    @property({ type: String })
    passwordRepeatErrorMessage = '';

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Create error message html
     * @param {String} message
     * @return {Object}
     */
    getErrorHTML(message) {

        if (message.length > 0) {

            return html`<div class="error-message">${message}</div>`;

        }

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        const passwordError = this.getErrorHTML(this.passwordErrorMessage);
        const passwordRepeatError =
            this.getErrorHTML(this.passwordRepeatErrorMessage);

        return html`
            <!-- ResetForm Component -->
            <div class="wrapper">
                <div class="info-container">
                    <div class="field-row">
                        <div class="field-container">
                            <label>New Password*</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Password"
                                type="password" required placeholder="******"
                                validation="password"
                            ></sifive-field>
                            ${passwordError}
                        </div>
                        <div class="field-container">
                            <label>Repeat Password</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="PasswordRepeat"
                                type="password" required placeholder="******"
                                validation="password-repeat" repeat-id="Password"
                            ></sifive-field>
                            ${passwordRepeatError}
                        </div>
                    </div>
                </div>
                <div class="button ${this.submitDisabled ? 'disabled' : ''}" @click="${this.onSubmitClick}">Submit</div>
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.resetCode = getPathPart(state, 1);
        const resetFormState = state.ResetForm[this.formID];

        this._didUpdatePassword = didUpdatePassword(state);
        this._updatePasswordError = getUpdatePasswordError(state);

        if (this._didUpdatePassword && !this._updatePasswordError) {

            Router.push('/');

        }

        if (isFormInitialized(state, this.formID)) {

            // Validation & Errors
            this.updateFieldError(state, 'Password', 'passwordErrorMessage');
            this.updateFieldError(state, 'PasswordRepeat', 'passwordRepeatErrorMessage');

            // Check if Submit is available
            this.submitDisabled = !this.canSubmit(resetFormState, state);

        }

        if (resetFormState) {

            this.updateFormError(state);

        }

    }

    /**
     * Check for field errors
     * @param {Object} state
     * @param {String} fieldID
     * @param {String} messageKey
     */
    updateFieldError(state, fieldID, messageKey) {

        if (
            isFieldInitialized(state, this.formID, fieldID) &&
            !isFieldValid(state, this.formID, fieldID) &&
            getFieldErrors(state, this.formID, fieldID)) {

            this[messageKey] = getFieldErrors(state, this.formID, fieldID)[0];


        } else {

            this[messageKey] = '';

        }

    }

    /**
     * check for form errors
     * @param {Object} state current field state
     */
    updateFormError(state) {

        const resetFormState = state.ResetForm[this.formID];

        if (
            isFormInitialized(state, this.formID) &&
            !isFormSubmitting(state, this.formID) &&
            resetFormState.Error
        ) {

            this.formErrorMessage = resetFormState.Error.message;

        } else if (
            isFormInitialized(state, this.formID) &&
            isFormSubmitting(state, this.formID)
        ) {

            this.formErrorMessage = '';

        }

    }

    /**
     * Check if can submit
     * @param {Object} forgotFormState current form state
     * @param {Object} state current state
     * @return {Boolean}
     */
    canSubmit(forgotFormState, state) {

        const hasValidForgotState = (
            !forgotFormState || // has not been submitted
            (!forgotFormState.Submitting && !forgotFormState.SubmitBlocked)
        );

        return (
            isFormValid(state, this.formID) &&
            hasValidForgotState
        );

    }

    /**
     * Click Callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSubmitClick(event) {

        const state = this.store.getState();
        const resetFormState = state.ResetForm[this.formID];

        if (this.canSubmit(resetFormState, state)) {

            this.store.dispatch(
                ResetFormActions.submit(this.formID, this.resetCode)
            );

        }

    }

}

export { ResetForm };
