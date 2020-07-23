
import UserApi from 'Api/User';

import NotificationActions from 'Actions/Notification';
import InviteActions from 'Actions/Invite';
import Router from 'Utils/Router';

import { getSavedInvite } from 'Selectors/Invite';

import {
    getHighestAvailableRole,
    shouldFetchProgress,
    shouldCheckResetCode,
    getRole,
} from 'Selectors/User';

export const START_INIT_AUTH = 'USER.START_INIT_AUTH';
export const INIT_AUTH_SUCCESS = 'USER.INIT_AUTH_SUCCESS';
export const INIT_AUTH_ERROR = 'USER.INIT_AUTH_ERROR';
export const INIT_AUTH_NO_USER = 'USER.INIT_AUTH_NO_USER';

export const START_GET_CURRENT = 'USER.START_GET_CURRENT';
export const GET_CURRENT_SUCCESS = 'USER.GET_CURRENT_SUCCESS';
export const GET_CURRENT_ERROR = 'USER.GET_CURRENT_ERROR';

export const START_GET = 'USER.START_GET';
export const GET_SUCCESS = 'USER.GET_SUCCESS';
export const GET_ERROR = 'USER.GET_ERROR';

export const START_LOGIN = 'USER.START_LOGIN';
export const LOGIN_SUCCESS = 'USER.LOGIN_SUCCESS';
export const LOGIN_ERROR = 'USER.LOGIN_ERROR';

export const LOGOUT = 'USER.LOGOUT';

export const START_SIGNUP = 'USER.START_SIGNUP';
export const SIGNUP_SUCCESS = 'USER.SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'USER.SIGNUP_ERROR';

export const START_RESET_PASSWORD = 'USER.START_RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'USER.RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'USER.RESET_PASSWORD_ERROR';

export const START_CHECK_RESET_CODE = 'USER.START_CHECK_RESET_CODE';
export const CHECK_RESET_CODE_SUCCESS = 'USER.CHECK_RESET_CODE_SUCCESS';
export const CHECK_RESET_CODE_ERROR = 'USER.CHECK_RESET_CODE_ERROR';

export const START_UPDATE_PASSWORD = 'USER.START_UPDATE_PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = 'USER.UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_ERROR = 'USER.UPDATE_PASSWORD_ERROR';

export const START_VERIFY_EMAIL = 'USER.START_VERIFY_EMAIL';
export const VERIFY_EMAIL_SUCCESS = 'USER.VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_ERROR = 'USER.VERIFY_EMAIL_ERROR';

export const START_GET_PROGRESS = 'USER.START_GET_PROGRESS';
export const GET_PROGRESS_SUCCESS = 'USER.GET_PROGRESS_SUCCESS';
export const GET_PROGRESS_ERROR = 'USER.GET_PROGRESS_ERROR';

export const SET_ROLE = 'USER.SET_ROLE';

/**
 * Check initial authentification
 * @return {Function}
 */
export const initAuth = () => {

    const start = () => ({ type: START_INIT_AUTH });
    const success = response =>
        ({ type: INIT_AUTH_SUCCESS, response });
    const failure = response =>
        ({ type: INIT_AUTH_ERROR, response });
    const nouser = response =>
        ({ type: INIT_AUTH_NO_USER, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        if (currentUserState) {

            dispatch(getCurrentUser()).then(() => {

                dispatch(success());

            }).catch(() => {

                dispatch(failure());
                dispatch(logout());

            });

        } else {

            dispatch(nouser());
            // dispatch(logout());

        }

    };

};

/**
 * Load information about current signin user
 * @return {Function}
 */
export const getCurrentUser = () => {

    const start = () => ({ type: START_GET_CURRENT });
    const success = response =>
        ({ type: GET_CURRENT_SUCCESS, response });
    const failure = response =>
        ({ type: GET_CURRENT_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return UserApi.getCurrentUser(currentUserState.token)
            .then(
                (response) => {

                    const state = getState();
                    const role = getRole(state);

                    if (!role) {

                        dispatch(setRole(getHighestAvailableRole(getState())));

                    }

                    return dispatch(success(response));

                },
                (error) => {

                    return Promise.reject(dispatch(failure(error)));

                });

    };

};

/**
 * Fetches user information
 * @param {String} userID unique user ID
 * @return {Function}
 */
export const getUser = (userID) => {

    const start = () => ({ type: START_GET, userID });
    const success = response =>
        ({ type: GET_SUCCESS, userID, response });
    const failure = response =>
        ({ type: GET_ERROR, userID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return UserApi.getUser(userID, currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Login user
 * @param {Object} auth authentification data
 * @return {Function}
 */
export const login = (auth) => {

    const start = () => ({ type: START_LOGIN });
    const success = response => ({ type: LOGIN_SUCCESS, response });
    const failure = response => ({ type: LOGIN_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const inviteCode = getSavedInvite(state);

        if (inviteCode) {

            auth.inviteCode = inviteCode;

        }

        return UserApi.login(auth)
            .then(
                (response) => {

                    dispatch(success(response));

                    dispatch(InviteActions.clearSavedInviteID());

                    // set initial role
                    dispatch(setRole(getHighestAvailableRole(getState())));

                    dispatch(NotificationActions.showSuccess('Login success!'));

                    return Promise.resolve(response);

                },
                (error) => {

                    dispatch(failure(error));

                    dispatch(NotificationActions.showError(`Login error: ${error.message}`));

                    return Promise.reject(error);

                });

    };

};

/**
 * Logout user
 * @return {Function}
 */
export const logout = () => {

    return (dispatch, getState) => {

        dispatch({ type: LOGOUT });

        Router.push('/');

        return dispatch(NotificationActions.show(`You are logged out! See you soon!`));

    };

};

/**
 * Signup user
 * @param {Object} data
 * @return {Function}
 */
export const signup = (data) => {

    const start = () => ({ type: START_SIGNUP });
    const success = response => ({ type: SIGNUP_SUCCESS, response });
    const failure = response => ({ type: SIGNUP_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        return UserApi.signup(data)
            .then((response) => {

                dispatch(InviteActions.clearSavedInviteID());

                dispatch(NotificationActions.showSuccess('Signup success!'));

                return dispatch(success(response));

            })
            .catch((error) => {

                dispatch(NotificationActions.showError(`Signup error: ${error.message}`));

                return Promise.reject(dispatch(failure(error)));

            });

    };

};

/**
 * Reset password
 * @param {Object} data
 * @return {Function}
 */
export const resetPassword = (data) => {

    const start = () => ({ type: START_RESET_PASSWORD });
    const success = response => ({ type: RESET_PASSWORD_SUCCESS, response });
    const failure = response => ({ type: RESET_PASSWORD_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        return UserApi.resetPassword(data)
            .then((response) => {

                dispatch(NotificationActions.showSuccess(`Email sent!`));

                return dispatch(success(response));

            })
            .catch((error) => {

                dispatch(NotificationActions.showError(`Something went wrong :/`));
                dispatch(failure(error));
                return Promise.reject(error);

            });

    };

};

/**
 * Check reset code
 * @param {String} code
 * @return {Function}
 */
export const checkResetCode = (code) => {

    const start = () => ({ type: START_CHECK_RESET_CODE });
    const success = response => ({ type: CHECK_RESET_CODE_SUCCESS, response });
    const failure = response => ({ type: CHECK_RESET_CODE_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        return UserApi.checkPasswordResetCode(code)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch((error) => {

                return Promise.reject(dispatch(failure(error)));

            });

    };

};

/**
 * Check reset code if needed
 * @param {String} code
 * @return {Function}
 */
export const checkResetCodeIfNeeded = (code) => {

    return (dispatch, getState) => {

        const state = getState();

        if (shouldCheckResetCode(state)) {

            return dispatch(checkResetCode(code));

        }

    };

};

/**
 * Update password
 * @param {Object} data {code, password}
 * @return {Function}
 */
export const updatePassword = (data) => {

    const start = () => ({ type: START_UPDATE_PASSWORD });
    const success = response => ({ type: UPDATE_PASSWORD_SUCCESS, response });
    const failure = response => ({ type: UPDATE_PASSWORD_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        return UserApi.updatePassword(data)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch((error) => {

                return Promise.reject(dispatch(failure(error)));

            });

    };

};

/**
 * Fetches user progress
 * @param {String} userID unique user ID
 * @return {Function}
 */
export const getUserProgress = (userID) => {

    const start = () => ({ type: START_GET_PROGRESS, userID });
    const success = response =>
        ({ type: GET_PROGRESS_SUCCESS, userID, response });
    const failure = response =>
        ({ type: GET_PROGRESS_ERROR, userID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return UserApi.getUserProgress(userID, currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Fetches user progress if needed
 * @param  {String} userID
 * @return {Function}
 */
export const getUserProgressIfNeeded = (userID) => {

    return (dispatch, getState) => {

        const state = getState();

        if (shouldFetchProgress(state, userID)) {

            dispatch(getUserProgress(userID));

        }

    };

};


/**
 * Verify email
 * @param {String} verificationCode
 * @return {Function}
 */
export const verifyEmail = (verificationCode) => {

    const start = () => ({ type: START_VERIFY_EMAIL });
    const success = response => ({ type: VERIFY_EMAIL_SUCCESS, response });
    const failure = response => ({ type: VERIFY_EMAIL_ERROR, response });

    return (dispatch, getState) => {

        const currentUserState = getState().User.CurrentUser;

        dispatch(start());

        return UserApi.verifyEmail(verificationCode, currentUserState.token)
            .then((response) => {

                dispatch(NotificationActions.showSuccess(`Thank you for verifying your email '${currentUserState.email}'`));

                return dispatch(success(response));

            })
            .catch((error) => {

                dispatch(NotificationActions.showError(`Verification did not work! Try again later!`));

                return Promise.reject(dispatch(failure(error)));

            });

    };

};


export const setRole = (role) => {

    return {
        type: SET_ROLE,
        role,
    };

};

export default {
    initAuth,
    getCurrentUser,
    getUser,
    login,
    logout,
    signup,
    resetPassword,
    checkResetCode,
    checkResetCodeIfNeeded,
    updatePassword,
    getUserProgress,
    getUserProgressIfNeeded,
    verifyEmail,
    setRole,
};
