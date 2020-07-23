
import {
    START_SUBMIT,
    SUBMIT_SUCCESS,
    SUBMIT_ERROR,
    START_SUBMIT_BLOCK,
    STOP_SUBMIT_BLOCK,
} from 'Actions/SignupForm';

const INITIAL_STATE = {};

const addFormStateToID = (state, formID) => {

    if (!state[formID]) {

        state[formID] = {};

    }

};

const SignupForm = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case START_SUBMIT:

            addFormStateToID(state, action.formID);
            delete state[action.formID].SignedUp;
            delete state[action.formID].Error;

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    Submitting: true,
                },
            };

        case SUBMIT_SUCCESS:

            addFormStateToID(state, action.formID);
            delete state[action.formID].Submitting;

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    SignedUp: true,
                },
            };

        case SUBMIT_ERROR:

            addFormStateToID(state, action.formID);
            delete state[action.formID].Submitting;

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    Error: action.response,
                    SignedUp: false,
                },
            };

        case START_SUBMIT_BLOCK:

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    SubmitBlocked: true,
                },
            };

        case STOP_SUBMIT_BLOCK:

            return {
                ...state,
                [action.formID]: {
                    ...state[action.formID],
                    SubmitBlocked: false,
                },
            };

        default:
            return state;

    }

};

export { SignupForm };
