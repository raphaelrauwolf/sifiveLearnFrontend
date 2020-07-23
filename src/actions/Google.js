
import GoogleApi from 'Api/Google';

export const START_SIGNIN = 'GOOGLE.START_SIGNIN';
export const SIGNIN_SUCCESS = 'GOOGLE.SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'GOOGLE.SIGNIN_ERROR';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const SIGNOUT = 'GOOGLE.SIGNOUT';

/**
 * Trigger Google signin
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

        return GoogleApi.signin()
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

        return GoogleApi.getCurrentUser()
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

        return GoogleApi.signout()
            .then(response => dispatch(signout(response)));

    };

};

export default {
    signin,
    signout,
    getCurrentUser,
};
