
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
import { getSavedInvite } from 'Selectors/Invite';
import SignupFormActions from 'Actions/SignupForm';
import FormActions from 'Actions/Form';

import { getStyles } from './Styles';

/**
 * SignupView LitElement
 * template for /signup
 */
@customElement('signup-form')
class SignupForm extends connect(store)(LitElement) {

    @property({ type: String, attribute: 'form-id' })
    formID = '';

    @property({ type: Boolean })
    submitDisabled = true;

    @property({ type: String })
    firstNameErrorMessage = '';

    @property({ type: String })
    lastNameErrorMessage = '';

    @property({ type: String })
    emailErrorMessage = '';

    @property({ type: String })
    passwordErrorMessage = '';

    @property({ type: String })
    passwordRepeatErrorMessage= '';

    @property({ type: String })
    formErrorMessage = '';

    @property({ type: String })
    inviteCodeErrorMessage = '';

    @property({ type: String })
    termsErrorMessage = '';

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

        const firstNameError = this.getErrorHTML(this.firstNameErrorMessage);
        const lastNameError = this.getErrorHTML(this.lastNameErrorMessage);
        const emailError = this.getErrorHTML(this.emailErrorMessage);
        const passwordError = this.getErrorHTML(this.passwordErrorMessage);
        const passwordRepeatError =
            this.getErrorHTML(this.passwordRepeatErrorMessage);
        const inviteCodeError = this.getErrorHTML(this.inviteCodeErrorMessage);
        const termsError = this.getErrorHTML(this.termsErrorMessage);

        return html`
            <!-- SignupView Component -->
            <div class="wrapper">
                <div class="info-container">
                    <div class="field-row">
                        <div class="field-container">
                            <label>First Name*</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Firstname"
                                type="text" required placeholder="Joe"
                                validation="lastname"
                            ></sifive-field>
                            ${firstNameError}
                        </div>
                        <div class="field-container">
                            <label>Last Name*</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Lastname"
                                type="text" required placeholder="Doe"
                                validation="lastname"
                            ></sifive-field>
                            ${lastNameError}
                        </div>
                        <div class="field-container">
                            <label>E-Mail*</label><br>
                            <sifive-field
                                form-id="${this.formID}" field-id="Email"
                                type="email" required placeholder="name@domain.com"
                                validation="email"
                            ></sifive-field>
                            ${emailError}
                        </div>
                    </div>
                    <div class="field-row">
                        <div class="field-container">
                            <label>Password*</label><br>
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
                <div class="invite-container">
                    <div class="text-container">
                        <h5>Join Team</h5>
                        <label>Invitation Code</label><br>
                        <sifive-field
                        form-id="${this.formID}" field-id="InviteCode"
                        type="text" placeholder="xxxxxx"
                        validation="invite-code"
                        ></sifive-field>
                        ${inviteCodeError}
                    </div>
                    <div class="text-container">
                        <h5>Got an invitation code?</h5>
                        <p>Do you have an invitation code from an existing team? Fill it into the form on the left side to validate your invitation. Leave blank if you don’t have an invitation code.</p>
                    </div>
                </div>
                <div class="terms-container">
                    ${termsError}
                    <sifive-field
                        form-id="${this.formID}" field-id="Terms"
                        type="checkbox" required
                        validation="checked"
                    ></sifive-field>I accept the <a target="_blank" href="/terms-and-conditions">terms</a> and <a target="_blank" href="/privacy-policy">privacy policy</a>
                </div>
                <div class="submit-container">
                    <div class="button ${this.submitDisabled ? 'disabled' : ''}"  @click="${this.onSubmitClick}">Submit</div>
                    <div class="error-message">${this.formErrorMessage}</div>
                </div>

            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        const formState = state.Form[this.formID];
        const signupFormState = state.SignupForm[this.formID];

        const inviteCode = getSavedInvite(state);

        if (inviteCode &&
            (
                !state.Form[this.formID] ||
                !state.Form[this.formID]['InviteCode'] ||
                state.Form[this.formID]['InviteCode'].Value !== inviteCode
            )
        ) {

            store.dispatch(
                FormActions.changeField(
                    this.formID, 'InviteCode',
                    'invite-code', inviteCode,
                    '',
                )
            );

        }

        if (formState) {

            // Validation & Errors
            this.updateFieldError(state, 'Firstname', 'firstNameErrorMessage');
            this.updateFieldError(state, 'Lastname', 'lastNameErrorMessage');
            this.updateFieldError(state, 'Email', 'emailErrorMessage');
            this.updateFieldError(state, 'Password', 'passwordErrorMessage');
            this.updateFieldError(state, 'PasswordRepeat', 'passwordRepeatErrorMessage');
            this.updateFieldError(state, 'InviteCode', 'inviteCodeErrorMessage');
            this.updateFieldError(state, 'Terms', 'termsErrorMessage');

            // Check if Submit is available
            this.submitDisabled = !this.canSubmit(signupFormState, state);

        }

        if (signupFormState) {

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

        const signupFormState = state.SignupForm[this.formID];

        if (
            isFormInitialized(state, this.formID) &&
            !isFormSubmitting(state, this.formID) &&
            signupFormState.Error
        ) {

            this.formErrorMessage = signupFormState.Error.message;

        } else if (
            isFormInitialized(state, this.formID) &&
            isFormSubmitting(state, this.formID)
        ) {

            this.formErrorMessage = '';

        }

    }

    /**
     * Check if can submit
     * @param {Object} signupFormState current form state
     * @param {Object} state current field state
     * @return {Boolean}
     */
    canSubmit(signupFormState, state) {

        const hasValidSignupState = (
            !signupFormState || // has not been submitted
            (!signupFormState.Submitting && !signupFormState.SubmitBlocked)
        );

        return (
            isFormValid(state, this.formID) &&
            hasValidSignupState
        );

    }

    /**
     * Click Callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSubmitClick(event) {

        const state = store.getState();
        const signupFormState = state.SignupForm[this.formID];

        if (this.canSubmit(signupFormState, state)) {

            store.dispatch(
                SignupFormActions.signupForm(this.formID)
            );

        }

    }

}

export { SignupForm };
