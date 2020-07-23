
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
    isFieldValueEmpty,
    getFieldErrors,
} from 'Selectors/Form';
import LoginFormActions from 'Actions/LoginForm';

import { getStyles } from './Styles';

/**
 * LoginForm LitElement
 */
@customElement('login-form')
class LoginForm extends connect(store)(LitElement) {

    @property({ type: String, attribute: 'form-id' })
    formID = '';

    @property({ type: Boolean })
    submitDisabled = true;

    @property({ type: String })
    emailErrorMessage = '';

    @property({ type: String })
    passwordErrorMessage = '';

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
        let passwordError;
        let formError;

        if (this.emailErrorMessage) {

            emailError = html`<div class="error-message">${this.emailErrorMessage}</div>`;

        }

        if (this.passwordErrorMessage) {

            passwordError = html`<div class="error-message">${this.passwordErrorMessage}</div>`;

        }

        if (this.formErrorMessage) {

            formError = html`<div class="form-error error-message">${this.formErrorMessage}</div>`;

        }

        return html`
            <!-- LoginForm Component -->
            <div class="wrapper">
                <div class="info-container">
                    <div class="field-row">
                        <div class="field-container">
                            <label>Your E-Mail Address</label><br>
                            <sifive-field
                                name="email"
                                form-id="${this.formID}" field-id="Email"
                                type="email" required placeholder="name@domain.com"
                                @keydown="${this.onKeyDown}"
                                validation="email"
                            ></sifive-field>
                            ${emailError}
                        </div>
                        <div class="field-container">
                            <label>Password</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Password"
                                type="password" required placeholder="******"
                                @keydown="${this.onKeyDown}"
                                validation="password"
                            ></sifive-field>
                            ${passwordError}
                        </div>
                    </div>
                </div>
                <div class="forgot-password-container">
                    <a href="/forgot">Forgot your password?</a>
                </div>
                <div class="submit-container">
                    <div class="button ${this.submitDisabled ? 'disabled' : ''}" @click="${this.onSubmitClick}">Sign in</div>
                    <div class="remember">
                        <sifive-field
                            form-id="${this.formID}" field-id="RememberMe"
                            type="checkbox" label="Remember me"
                        ></sifive-field>
                    </div>
                </div>
                ${formError}
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        const loginFormState = state.LoginForm[this.formID];

        if (isFormInitialized(state, this.formID)) {

            // Validation & Errors
            this.updateFieldError(state, 'Email', 'emailErrorMessage');
            this.updateFieldError(state, 'Password', 'passwordErrorMessage');

            // Check if Submit is available
            this.submitDisabled = !this.canSubmit(loginFormState, state);

        }

        if (loginFormState) {

            // response handling
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
            getFieldErrors(state, this.formID, fieldID) &&
            isFieldValueEmpty(state, this.formID, fieldID)) {

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

        const loginFormState = state.LoginForm[this.formID];

        if (
            isFormInitialized(state, this.formID) &&
            !isFormSubmitting(state, this.formID) &&
            loginFormState.Error
        ) {

            this.formErrorMessage = loginFormState.Error.message;

        } else if (
            isFormInitialized(state, this.formID) &&
            isFormSubmitting(state, this.formID)
        ) {

            this.formErrorMessage = '';

        }

    }

    /**
     * Check if can submit
     * @param {Object} loginFormState current form state
     * @param {Object} state current field state
     * @return {Boolean}
     */
    canSubmit(loginFormState, state) {

        const hasValidLoginState = (
            !loginFormState || // has not been submitted
            (!loginFormState.Submitting && !loginFormState.SubmitBlocked)
        );

        return (
            isFormValid(state, this.formID) &&
            hasValidLoginState
        );

    }

    /**
     * Click Callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSubmitClick(event) {

        const state = store.getState();
        const loginFormState = state.LoginForm[this.formID];

        if (this.canSubmit(loginFormState, state)) {

            store.dispatch(
                LoginFormActions.loginForm(this.formID)
            );

        }

    }

    /**
     * Key down callback
     * TODO: Find nicer and reusable solution
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onKeyDown(event) {

        if (event.key === 'Enter') {

            const state = store.getState();
            const loginFormState = state.LoginForm[this.formID];

            if (this.canSubmit(loginFormState, state)) {

                store.dispatch(
                    LoginFormActions.loginForm(this.formID)
                );

            }

        }

    }

}

export { LoginForm };
