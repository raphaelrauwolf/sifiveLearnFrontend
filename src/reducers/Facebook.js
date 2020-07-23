
import {
    START_SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    GET_CURRENT_USER,
    SIGNOUT,
} from 'Actions/Facebook';

const INITIAL_STATE = {
    SignedIn: false,
    User: {},
};

const Facebook = (state = INITIAL_STATE, action) => {

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
                token: action.response.authResponse.accessToken,
                SignedIn: true,
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
         *  getCurrentUser Actions
         */
        case SIGNOUT:
            return INITIAL_STATE;

        default:
            return state;

    }

};

export { Facebook };
