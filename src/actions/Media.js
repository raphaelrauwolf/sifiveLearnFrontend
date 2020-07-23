
import MediaApi from 'Api/Media';

import MediaSelectors from 'Selectors/Media';

import NotificationActions from 'Actions/Notification';

export const START_ADD = 'MEDIA.START_ADD';
export const ADD_PROGRESS = 'MEDIA.ADD_PROGRESS';
export const ADD_SUCCESS = 'MEDIA.ADD_SUCCESS';
export const ADD_ERROR = 'MEDIA.ADD_ERROR';

export const START_UPLOAD_LINK_CREATE = 'MEDIA.START_UPLOAD_LINK_CREATE';
export const UPLOAD_LINK_CREATE_SUCCESS = 'MEDIA.UPLOAD_LINK_CREATE_SUCCESS';
export const UPLOAD_LINK_CREATE_ERROR = 'MEDIA.UPLOAD_LINK_CREATE_ERROR';

export const START_GET = 'MEDIA.START_GET';
export const GET_SUCCESS = 'MEDIA.GET_SUCCESS';
export const GET_ERROR = 'MEDIA.GET_ERROR';

export const START_GET_LIST = 'MEDIA.START_GET_LIST';
export const GET_LIST_SUCCESS = 'MEDIA.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'MEDIA.GET_LIST_ERROR';

/**
 * Create upload link to add media
 * @param  {[type]} fileData [description]
 * @return {[type]} [description]
 */
export const createUploadLink = (fileData) => {

    const start = () => ({ type: START_UPLOAD_LINK_CREATE, fileData });

    const success = response =>
        ({ type: UPLOAD_LINK_CREATE_SUCCESS, fileData, response });

    const failure = response =>
        ({ type: UPLOAD_LINK_CREATE_ERROR, fileData, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return MediaApi.createUploadLink(fileData, currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Add media
 * @param {Object} file
 * @return {Function}
 */
export const addMedia = (file) => {

    const start = mediaID => ({ type: START_ADD, file, mediaID });

    const progress = (progress, mediaID) =>
        ({ type: ADD_PROGRESS, file, progress, mediaID });

    const success = (response, mediaID) =>
        ({ type: ADD_SUCCESS, file, response, mediaID });

    const failure = (response, mediaID) =>
        ({ type: ADD_ERROR, file, response, mediaID });

    return (dispatch, getState) => {

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        const fileData = {
            contentType: file.type,
            filename: file.name,
            extension: file.name.match(/\.[0-9a-z]+$/g)[0].substr(1),
        };

        let mediaID;

        return dispatch(createUploadLink(fileData)).then((response) => {

            const media = response.response;
            mediaID = media.id;

            dispatch(start(mediaID));

            return MediaApi.addMedia(file, media.uploadPath, (event) => {

                if (event.lengthComputable) {

                    dispatch(progress(event.loaded / event.total, mediaID));

                }

            });

        }).then((response) => {

            return MediaApi.getMedia(mediaID, currentUserState.token);

        }).then((response) => {

            dispatch(NotificationActions.showSuccess('Media added!'));
            return dispatch(success(response, mediaID));

        }).catch(error => Promise.reject(dispatch(failure(error, mediaID))));

    };

};

/**
 * Get media list
 * @param {String} mediaID
 * @return {Function}
 */
export const getMedia = (mediaID) => {

    const start = () => ({ type: START_GET,
        mediaID });

    const success = response => ({ type: GET_SUCCESS,
        mediaID, response });

    const failure = response => ({ type: GET_ERROR,
        mediaID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return MediaApi.getMedia(
            mediaID,
            currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * GetMedia if its not in the store yet
 * @param  {String} mediaID
 * @return {Function}
 */
export const getMediaIfNeeded = (mediaID) => {

    return (dispatch, getState) => {

        const state = getState();

        if (MediaSelectors.shouldGetMedia(state, mediaID)) {

            return dispatch(getMedia(mediaID));

        }

    };

};

/**
 * Get media list
 * @return {Function}
 */
export const getMediaList = () => {

    const start = () => ({ type: START_GET_LIST });

    const success = response => ({ type: GET_LIST_SUCCESS, response });

    const failure = response => ({ type: GET_LIST_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return MediaApi.getMediaList(currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const getMediaListIfNeeded = () => {

    return (dispatch, getState) => {

        const state = getState();

        if (MediaSelectors.shouldFetchMediaList(state)) {

            return dispatch(getMediaList());

        }

    };

};

export default {
    addMedia,
    getMedia,
    getMediaIfNeeded,
    getMediaList,
    getMediaListIfNeeded,
};
