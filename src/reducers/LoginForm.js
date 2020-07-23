
import {
    START_SUBMIT,
    SUBMIT_SUCCESS,
    SUBMIT_ERROR,
} from 'Actions/LoginForm';

const INITIAL_STATE = {};

const addFormStateToID = (state, formID) => {

    if (!state[formID]) {

        state[formID] = {};

    }

};

const LoginForm = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case START_SUBMIT:

            addFormStateToID(state, action.formID);
            delete state[action.formID].LoggedIn;
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
                    LoggedIn: true,
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
                    LoggedIn: false,
                },
            };

        default:
            return state;

    }

};

export { LoginForm };
