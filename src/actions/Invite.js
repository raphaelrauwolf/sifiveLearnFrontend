
import InviteApi from 'Api/Invite';

import NotificationActions from 'Actions/Notification';

import {
    shouldFetchInvite,
} from 'Selectors/Invite';

export const START_GET = 'INVITE.START_GET';
export const GET_SUCCESS = 'INVITE.GET_SUCCESS';
export const GET_ERROR = 'INVITE.GET_ERROR';

export const START_GET_LIST = 'INVITE.START_GET_LIST';
export const GET_LIST_SUCCESS = 'INVITE.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'INVITE.GET_LIST_ERROR';

export const START_ACCEPT = 'INVITE.START_ACCEPT';
export const ACCEPT_SUCCESS = 'INVITE.ACCEPT_SUCCESS';
export const ACCEPT_ERROR = 'INVITE.ACCEPT_ERROR';

export const START_UPDATE = 'INVITE.START_UPDATE';
export const UPDATE_SUCCESS = 'INVITE.UPDATE_SUCCESS';
export const UPDATE_ERROR = 'INVITE.UPDATE_ERROR';

export const SAVE_INVITE_ID = 'INVITE.SAVE_INVITE_ID';
export const CLEAR_SAVED_INVITE_ID = 'INVITE.CLEAR_SAVED_INVITE_ID';

/**
 * Accept invite data
 * @param {String} inviteID
 * @return {Function}
 */
export const accept = (inviteID) => {

    const start = () => ({ type: START_ACCEPT });
    const success = response => ({ type: ACCEPT_SUCCESS, response });
    const failure = response => ({ type: ACCEPT_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return InviteApi.acceptInvite(inviteID, currentUserState.token)
            .then((response) => {

                dispatch(NotificationActions.showSuccess('Invite accepted!'));

                return dispatch(success(response));

            })
            .catch((error) => {

                dispatch(NotificationActions.showError(`Invite accept error: ${error.message}`));

                return Promise.reject(dispatch(failure(error)));

            });

    };

};

/**
 * Fetch invite data
 * @param {String} inviteID
 * @return {Function}
 */
export const getInvite = (inviteID) => {

    const start = () => ({ type: START_GET, inviteID });
    const success = response =>
        ({ type: GET_SUCCESS, inviteID, response });
    const failure = response =>
        ({ type: GET_ERROR, inviteID, response });

    return (dispatch, getState) => {

        dispatch(start());

        return InviteApi.getInvite(inviteID)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const getInviteIfNeeded = (inviteID) => {

    return (dispatch, getState) => {

        const needToFetchInvite = shouldFetchInvite(getState(), inviteID);

        if (needToFetchInvite) {

            return dispatch(getInvite(inviteID));

        }

    };

};

/**
 * Fetch invites
 * @return {Function}
 */
export const getInviteList = () => {

    const start = () => ({ type: START_GET_LIST });
    const success = response => ({ type: GET_LIST_SUCCESS, response });
    const failure = response => ({ type: GET_LIST_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return InviteApi.getInviteList(currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const updateInvite = (data, inviteID) => {

    const start = () => ({ type: START_UPDATE, inviteID, data });
    const success = response =>
        ({ type: UPDATE_SUCCESS, inviteID, data, response });
    const failure = response =>
        ({ type: UPDATE_ERROR, inviteID, data, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return InviteApi.updateInvite(data, inviteID, currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Archive an invite
 * @param  {String} inviteID
 * @return {Function}
 */
export const archiveInvite = (inviteID) => {

    return (dispatch, getState) => {

        return dispatch(updateInvite({ archive: true }, inviteID));

    };

};

/**
 * Restore an invite
 * @param  {String} inviteID
 * @return {Function}
 */
export const restoreInvite = (inviteID) => {

    return (dispatch, getState) => {

        return dispatch(updateInvite({ archive: false }, inviteID));

    };

};

/**
 * Save an invite id in store for registration
 * @param  {String} inviteID
 * @return {Object}
 */
export const saveInviteID = (inviteID) => {

    return {
        type: SAVE_INVITE_ID,
        inviteID,
    };

};

/**
 * Clear saved invite id
 * @param  {String} inviteID
 * @return {Object}
 */
export const clearSavedInviteID = () => {

    return {
        type: CLEAR_SAVED_INVITE_ID,
    };

};


export default {
    accept,
    getInvite,
    getInviteIfNeeded,
    getInviteList,
    updateInvite,
    archiveInvite,
    restoreInvite,
    saveInviteID,
    clearSavedInviteID,
};
