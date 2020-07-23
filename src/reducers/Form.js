
import {
    RESET_FORM,
    INITIALIZE_FIELD,
    FOCUS_FIELD,
    BLUR_FIELD,
    CHANGE_FIELD,
    VALIDATION_ERROR,
    VALIDATION_SUCCESS,
} from 'Actions/Form';

const INITIAL_STATE = {};

const addFormStateToID = (state, formID) => {

    if (!state[formID]) {

        state[formID] = {};

    }

};

const addFieldStateToID = (state, formID, fieldID) => {

    if (!state[formID][fieldID]) {

        state[formID][fieldID] = {};

    }

};

const Form = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RESET_FORM:

            addFormStateToID(state, action.formID);

            return {
                ...state,
                [action.formID]: {},
            };

        case INITIALIZE_FIELD:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    [action.fieldID]: {
                        ...state[action.formID][action.fieldID],
                        Required: action.required,
                    },
                },
            };

        case FOCUS_FIELD:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    [action.fieldID]: {
                        ...state[action.formID][action.fieldID],
                        Focused: true,
                    },
                },
            };

        case BLUR_FIELD:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            delete state[action.formID][action.fieldID].Focused;

            return state;

        case CHANGE_FIELD:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    [action.fieldID]: {
                        ...state[action.formID][action.fieldID],
                        Value: action.value,
                    },
                },
            };

        case VALIDATION_ERROR:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    [action.fieldID]: {
                        ...state[action.formID][action.fieldID],
                        Valid: false,
                        Errors: action.errors,
                    },
                },
            };

        case VALIDATION_SUCCESS:

            addFormStateToID(state, action.formID);
            addFieldStateToID(state, action.formID, action.fieldID);

            delete state[action.formID][action.fieldID].Errors;

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    [action.fieldID]: {
                        ...state[action.formID][action.fieldID],
                        Valid: true,
                    },
                },
            };

        default:
            return state;

    }

};

export { Form };
