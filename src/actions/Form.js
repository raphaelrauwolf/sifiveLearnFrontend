
export const RESET_FORM = 'FORM.RESET_FORM';
export const INITIALIZE_FIELD = 'FORM.INITIALIZE_FIELD';
export const FOCUS_FIELD = 'FORM.FOCUS_FIELD';
export const BLUR_FIELD = 'FORM.BLUR_FIELD';
export const CHANGE_FIELD = 'FORM.CHANGE_FIELD';
export const VALIDATION_ERROR = 'FORM.VALIDATION_ERROR';
export const VALIDATION_SUCCESS = 'FORM.VALIDATION_SUCCESS';

/**
 * Form actions called by all forms
 */
class FormActions {

    /**
     * Reset form
     * @param {String} formID unique form id
     * @return {Object}
     */
    resetForm(formID) {

        return {

            type: RESET_FORM,
            formID,

        };

    }

    /**
     * Form field initialize
     * @param {String} formID unique form id
     * @param {String} fieldID field id
     * @param {Boolean} required
     * @return {Object}
     */
    initializeField(formID, fieldID, required) {

        return {

            type: INITIALIZE_FIELD,
            formID, fieldID, required,

        };

    }

    /**
     * Form field focus
     * @param {String} formID unique form id
     * @param {String} fieldID field id
     * @return {Object}
     */
    focusField(formID, fieldID) {

        return {

            type: FOCUS_FIELD,
            formID, fieldID,

        };

    }

    /**
     * Form field blur
     * @param {String} formID unique form id
     * @param {String} fieldID field id
     * @return {Object}
     */
    blurField(formID, fieldID) {

        return {

            type: BLUR_FIELD,
            formID, fieldID,

        };

    }

    /**
     * Form field change
     * @param {String} formID unique form id
     * @param {String} fieldID field id
     * @param {String} validationType
     * @param {*} value field id
     * @param {String} repeatID field id to be repeated
     * @return {Object}
     */
    changeField(formID, fieldID, validationType, value, repeatID) {

        const change = () => ({ type: CHANGE_FIELD, formID, fieldID, value });

        return (dispatch, getState) => {

            dispatch(change());

            return dispatch(
                this.validateField(
                    formID, fieldID, validationType, value, repeatID
                )
            );

        };

    }

    /**
     * Form field validation
     * @param {String} formID unique form id
     * @param {String} fieldID field key
     * @param {String} validationType field type
     * @param {*} value field value
     * @param {String} repeatID field id to be repeated
     * @return {Object}
     */
    validateField(formID, fieldID, validationType, value, repeatID) {

        const result = fieldValid =>
            ({ formID, fieldID, ...fieldValid });

        return (dispatch, getState) => {

            const formState = getState().Form[formID];

            switch (validationType) {
                case 'firstname':
                    return dispatch(result(this.validateFirstName(value)));
                case 'lastname':
                    return dispatch(result(this.validateLastName(value)));
                case 'email':
                    return dispatch(result(this.validateEmail(value)));
                case 'password':
                    return dispatch(result(this.validatePassword(value)));
                case 'password-repeat':
                    return dispatch(result(
                        this.validatePasswordRepeat(value, formState[repeatID])
                    ));
                case 'invite-code':
                    return dispatch(result(
                        this.validateInviteCode(value)
                    ));
                case 'checked':
                    return dispatch(result(
                        this.validateChecked(value)
                    ));
                default:
                    break;
            }

        };

    }

    /**
     * Form field first name validation
     * @param {String} value field value
     * @return {Object}
     */
    validateFirstName(value) {

        const errors = [];

        if (value.length <= 0) {

            errors.push('The first name is mandatory');

        }

        if (value.length <= 3) {

            errors.push('The first name is to short.');

        }

        if (value.indexOf(' ') >= 0) {

            errors.push('No space allowed in the first name');

        }

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field first name validation
     * @param {String} value field value
     * @return {Object} update for store
     *
     * @todo server validate last name
     */
    validateLastName(value) {

        const errors = [];

        if (value.length <= 0) {

            errors.push('The last name is mandatory');

        }

        if (value.length <= 3) {

            errors.push('The last name is to short.');

        }

        if (value.indexOf(' ') >= 0) {

            errors.push('No space allowed in the last name');

        }

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field email validation
     * @param {String} value field value
     * @return {Object} update for store
     *
     * @todo server validate email
     */
    validateEmail(value) {

        const errors = [];

        if (value === '') {

            errors.push('The email is mandatory');

        }

        if (value.length < 3) {

            errors.push('The email is to short.');

        }

        if (value.indexOf(' ') >= 0) {

            errors.push('No space allowed in the email');

        }

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(value)) {

            errors.push('Please use a valid email address');

        }

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field password validation
     * @param {String} value field value
     * @return {Object} update for store
     *
     * @todo server validate password
     */
    validatePassword(value) {

        const errors = [];

        if (value.length < 6) {

            errors.push('The password is to short.');

        }

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field password repeat validation
     * @param {String} value field value
     * @param {String} repeatState field to be repeated state
     * @return {Object} update for store
     *
     * @todo server validate password
     */
    validatePasswordRepeat(value, repeatState = { Value: '' }) {

        const repeatValue = repeatState.Value;

        const errors = [];

        if (value !== repeatValue) {

            errors.push('The password values are not identical!');

        }

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field password repeat validation
     * @param {String} value field value
     * @param {String} repeatState field to be repeated state
     * @return {Object} update for store
     *
     * @todo server validate password
     */
    validateInviteCode(value) {

        const errors = [];

        return {
            type: errors.length > 0 ? VALIDATION_ERROR : VALIDATION_SUCCESS,
            hasErrors: errors.length > 0,
            errors,
        };

    }

    /**
     * Form field check validation
     * @param  {String} value field value
     * @return {Object} update for store
     */
    validateChecked(value) {

        const errors = [];

        if (!value) {

            errors.push('The field needs to be checked');

        }

        return {
            type: value ? VALIDATION_SUCCESS : VALIDATION_ERROR,
            hasErrors: errors.length > 0,
            errors,
        };

    }

}

export default new FormActions();
