
import pathRegexp from 'path-to-regexp';

import { USER_PATH } from 'Constants/Paths';

import { getTeamCourses } from 'Selectors/Team';

/**
 * Selector that returns if the current user is logged in
 * @param {Object} state
 * @return {Function}
 */
export const isLoggedIn = (state) => {

    return state.User.LoggedIn;

};

/**
 * Selector that returns if the current user is verified
 * @param {Object} state
 * @return {Function}
 */
export const isVerified = (state) => {

    return isLoggedIn(state) && state.User.CurrentUser.isEmailVerified;

};

/**
 * Selector that returns if the current user is verifying
 * @param {Object} state
 * @return {Function}
 */
export const isVerifing = (state) => {

    return isLoggedIn(state) && state.User.VerifyingEmail;

};

/**
 * Selector that returns last verify error
 * @param {Object} state
 * @return {Function}
 */
export const getVerifyError = (state) => {

    return state.User.VerifyEmailError && state.User.VerifyEmailError.message;

};

/**
 * Selector that returns a user
 * @param {Object} state
 * @param {String} userID
 * @return {Function}
 */
export const getUser = (state, userID) => {

    return state.User.List[userID];

};

/**
 * Selector that returns the user id found in the current route
 * @param {Object} state
 * @return {Function}
 */
export const getUserID = (state) => {

    const pathCheck = pathRegexp(USER_PATH)
        .exec(state.Router.Route.path);

    return pathCheck !== null ? pathCheck[1] : undefined;

};

/**
 * Selector that checks if the user needs to be fetched
 * @param {Object} state
 * @param {String} userID
 * @return {Function}
 */
export const shouldFetchUser = (state, userID) => {

    return !(userID in state.User.List) && !isFetchingUser(state, userID);

};

/**
 * Selector that checks if course is being fetched
 * @param {Object} state
 * @param {String} userID
 * @return {Function}
 */
export const isFetchingUser = (state, userID) => {

    const user = getUser(state, userID);
    return user && user.Fetching;

};

/**
 * Selector that returns current user
 * @param {Object} state
 * @return {Function}
 */
export const getCurrentUser = (state) => {

    return state.User.CurrentUser;

};

/**
 * Selector that returns current role
 * @param {Object} state
 * @return {Function}
 */
export const getRole = (state) => {

    return isLoggedIn(state) && state.User.CurrentUser.role;

};

/**
 * Selector that returns teams
 * @param {Object} state
 * @return {Function}
 */
export const getTeams = (state) => {

    return isLoggedIn(state) &&
        state.User.CurrentUser.teams &&
        state.User.CurrentUser.teams.map((team) => {

            return {
                ...team,
                courses: getTeamCourses(state, team.id),
            };

        });

};

/**
 * Selector that returns available roles
 * @param {Object} state
 * @return {Function}
 */
export const getAvailableRoles = (state) => {

    return isLoggedIn(state) && state.User.CurrentUser.teams.map((team) => {

        return team.permissions.role;

    });

};

/**
 * Find the highest role of user
 * @param  {Object} state current store state
 * @return {String} role
 */
export const getHighestAvailableRole = (state) => {

    if (isLoggedIn(state)) {

        const availableRoles = getAvailableRoles(state);

        return availableRoles.sort((a, b) => {

            const aWeight = getRoleWeight(a);
            const bWeight = getRoleWeight(b);

            return bWeight - aWeight;

        })[0];

    } else {

        return [];

    }

};

/**
 * Check if the progress of a user was already fetched
 * @param  {Object} state
 * @param  {Object} userID
 * @return {Boolean}
 */
export const shouldFetchProgress = (state, userID) => {

    const {
        FetchingProgress,
        FetchedProgress,
        FetchProgressError,
    } = getUser(state, userID);

    return !FetchingProgress && !FetchedProgress && !FetchProgressError;

};

/**
 * Check if reset code is being checked
 * @param {Object} state
 * @return {*}
 */
export const isCheckingResetCode = (state) => {

    return state.User.CheckingResetCode;

};

/**
 * Check if reset code was checked already
 * @param {Object} state
 * @return {*}
 */
export const didCheckResetCode = (state) => {

    return state.User.CheckedResetCode || !!state.User.CheckResetCodeError;

};

/**
 * Get the error from ResetCode checking
 * @param {Object} state
 * @return {*}
 */
export const getCheckResetCodeError = (state) => {

    return state.User.CheckResetCodeError;

};

/**
 * Check if reset code needs to be checked
 * @param {Object} state
 * @return {*}
 */
export const shouldCheckResetCode = (state) => {

    return !isCheckingResetCode(state) && !didCheckResetCode(state);

};

/**
 * Check if password is being updated
 * @param {Object} state
 * @return {*}
 */
export const isUpdatingPassword = (state) => {

    return state.User.UpdatingPassword;

};

/**
 * Check if was updated already
 * @param {Object} state
 * @return {*}
 */
export const didUpdatePassword = (state) => {

    return state.User.UpdatedPassword;

};

/**
 * Get the error from password updating
 * @param {Object} state
 * @return {*}
 */
export const getUpdatePasswordError = (state) => {

    return state.User.UpdatePasswordError;

};


export default {
    isLoggedIn,
    isVerified,
    isVerifing,
    getUserID,
    getUser,
    getCurrentUser,
    getVerifyError,
    getAvailableRoles,
    shouldFetchUser,
    isFetchingUser,
    shouldFetchProgress,

    isCheckingResetCode,
    didCheckResetCode,
    getCheckResetCodeError,
    shouldCheckResetCode,

    isUpdatingPassword,
    didUpdatePassword,
    getUpdatePasswordError,
};

/**
 * Get the role weight
 * @param  {String} role team role of user
 * @return {Number} weight of role
 */
function getRoleWeight(role) {

    if (role === 'manager') {

        return 100;

    } else if (role === 'accessor') {

        return 50;

    } else if (role === 'learner') {

        return 10;

    }

    return 0;

}
