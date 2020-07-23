
import FacebookApi from 'Api/Facebook';

export const START_SIGNIN = 'FACEBOOK.START_SIGNIN';
export const SIGNIN_SUCCESS = 'FACEBOOK.SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'FACEBOOK.SIGNIN_ERROR';
export const GET_CURRENT_USER = 'FACEBOOK.GET_CURRENT_USER';
export const SIGNOUT = 'FACEBOOK.SIGNOUT';

/**
 * Trigger Facebook signin
 * @return {Promise}
 */
export const signin = () => {

    const start = () => ({ type: START_SIGNIN });
    const success = response =>
        ({ type: SIGNIN_SUCCESS, response });
    const failure = response =>
        ({ type: SIGNIN_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        return FacebookApi.signin()
            .then(response => dispatch(success(response)))
            .catch(error => dispatch(failure(error)));

    };

};

/**
 * Get current user data
 * @return {Object}
 */
export const getCurrentUser = () => {

    const get = response => ({ type: GET_CURRENT_USER, response });

    return (dispatch, getState) => {

        return FacebookApi.getCurrentUser()
            .then(response => dispatch(get(response)));

    };

};

/**
 * Trigger Google signout
 * @return {Promise}
 */
export const signout = () => {

    const signout = () => ({ type: SIGNOUT });

    return (dispatch, getState) => {

        return FacebookApi.signout()
            .then(response => dispatch(signout()));

    };

};

export default {
    signin,
    signout,
    getCurrentUser,
};
