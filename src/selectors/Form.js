
/**
 * Selector that returns a fields error messages
 * @param {Object} state
 * @param {String} formID
 * @param {String} fieldID
 * @return {Array}
 */
export const getFieldErrors = (state, formID, fieldID) => {

    return state.Form[formID][fieldID].Errors;

};

/**
 * Selector that returns if form fields are valid
 * @param {Object} state
 * @param {String} formID
 * @return {Function}
 */
export const isFormValid = (state, formID) => {

    let isValid = true;
    const formState = state.Form[formID];

    Object.keys(formState).forEach((key) => {

        if (formState[key].Required && !formState[key].Valid) {

            isValid = false;

        }

    });

    return isValid;

};

/**
 * Selector that returns if form is initialized in state
 * @param {Object} state
 * @param {String} formID
 * @return {Array}
 */
export const isFormInitialized = (state, formID) => {

    return !!state.Form[formID];

};

/**
 * Selector that returns if form is submitting
 * @param {Object} state
 * @param {String} formID
 * @return {Array}
 */
export const isFormSubmitting = (state, formID) => {

    return state.Form[formID].Submitting;

};

/**
 * Selector that returns if form field is valid
 * @param {Object} state
 * @param {String} formID
 * @param {String} fieldID
 * @return {Function}
 */
export const isFieldValid = (state, formID, fieldID) => {

    return state.Form[formID][fieldID].Valid;

};

/**
 * Selector that returns if form field is valid
 * @param {Object} state
 * @param {String} formID
 * @param {String} fieldID
 * @return {Function}
 */
export const isFieldInitialized = (state, formID, fieldID) => {

    return !!state.Form[formID][fieldID];

};

/**
 * Selector that returns form field valude
 * @param {Object} state
 * @param {String} formID
 * @param {String} fieldID
 * @return {Function}
 */
export const getFieldValue = (state, formID, fieldID) => {

    return state.Form[formID][fieldID].Value;

};

/**
 * Selector that returns if form field is empty
 * @param {Object} state
 * @param {String} formID
 * @param {String} fieldID
 * @return {Function}
 */
export const isFieldValueEmpty = (state, formID, fieldID) => {

    const fieldValue = getFieldValue(state, formID, fieldID);

    const isValueUndefined = typeof fieldValue === 'undefined';
    const isValueBoolean = typeof fieldValue === 'boolean';
    const hasValueLength = !isValueUndefined && !isValueBoolean &&
        fieldValue.length > 0;

    return isValueUndefined || (!isValueBoolean && !hasValueLength);

};

export default {
    isFormInitialized,
    isFormValid,
    isFormSubmitting,
    isFieldValid,
    isFieldInitialized,
    isFieldValueEmpty,
    getFieldErrors,
    getFieldValue,
};
