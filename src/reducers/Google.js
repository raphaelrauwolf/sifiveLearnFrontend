
import {
    START_SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    GET_CURRENT_USER,
    SIGNOUT,
} from 'Actions/Google';

const INITIAL_STATE = {
    SignedIn: false,
    User: {},
};

const Google = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  Signin Actions
         */
        case START_SIGNIN:
            delete state.SignedIn;
            delete state.SigninError;
            return {
                ...state,
                SigningIn: true,
            };
        case SIGNIN_SUCCESS:
            delete state.SigningIn;
            return {
                ...state,
                SignedIn: true,
                User: {
                    ...state.User,
                    ...action.response,
                },
            };
        case SIGNIN_ERROR:
            delete state.SigningIn;
            return {
                ...state,
                SignedIn: false,
                SigninError: action.response,
            };

        /**
         *  getCurrentUser Actions
         */
        case GET_CURRENT_USER:
            return {
                ...state,
                User: {
                    ...state.User,
                    ...action.response,
                },
            };

        /**
         *  Signout Actions
         */
        case SIGNOUT:
            return INITIAL_STATE;

        default:
            return state;

    }

};

export { Google };
