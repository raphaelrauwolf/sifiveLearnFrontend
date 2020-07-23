
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// load required components
import 'Components/SifiveField';

// redux dependencies
import { store } from 'Root/store';
import {
    isFormInitialized,
    isFormValid,
    isFormSubmitting,
    isFieldValid,
    isFieldInitialized,
    getFieldErrors,
} from 'Selectors/Form';
import ForgotFormActions from 'Actions/ForgotForm';

import { getStyles } from './Styles';

/**
 * ForgotForm LitElement
 */
@customElement('forgot-form')
class ForgotForm extends connect(store)(LitElement) {

    @property({ type: String, attribute: 'form-id', reflect: true })
    formID = '';

    @property({ type: Boolean })
    submitDisabled = true;

    @property({ type: String })
    emailErrorMessage = '';

    @property({ type: String })
    formErrorMessage = '';

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

        let emailError;
        let formError;

        if (this.emailErrorMessage) {

            emailError = html`<div class="error-message">${this.emailErrorMessage}</div>`;

        }

        if (this.formErrorMessage) {

            formError = html`<div class="form-error error-message">${this.formErrorMessage}</div>`;

        }

        return html`
            <!-- ForgotForm Component -->
            <div class="wrapper">
                <div class="info-container">
                    <div class="field-row">
                        <div class="field-container">
                            <label>Your E-mail Address</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Email"
                                type="email" required placeholder="name@domain.com"
                                validation="email"
                            ></sifive-field>
                            ${emailError}
                        </div>
                    </div>
                </div>
                <div class="button ${this.submitDisabled ? 'disabled' : ''}" @click="${this.onSubmitClick}">Submit</div>
                ${formError}
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        const forgotFormState = state.ForgotForm[this.formID];

        if (isFormInitialized(state, this.formID)) {

            // Validation & Errors
            this.updateFieldError(state, 'Email', 'emailErrorMessage');

            // Check if Submit is available
            this.submitDisabled = !this.canSubmit(forgotFormState, state);

        }

        if (forgotFormState) {

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

        const forgotFormState = state.ForgotForm[this.formID];

        if (
            isFormInitialized(state, this.formID) &&
            !isFormSubmitting(state, this.formID) &&
            forgotFormState.Error
        ) {

            this.formErrorMessage = forgotFormState.Error.message;

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

        const state = store.getState();
        const forgotFormState = state.ForgotForm[this.formID];

        if (this.canSubmit(forgotFormState, state)) {

            store.dispatch(
                ForgotFormActions.submit(this.formID)
            );

        }

    }

}

export { ForgotForm };
