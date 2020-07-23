
/**
 * Selector that checks if the media needs to be fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchMedia = (state) => {

    return !state.Media.FetchedList && !isFetchingMediaList(state);

};

/**
 * Selector that checks if the media needs to be fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchMediaList = (state) => {

    return !state.Media.FetchedList &&
        !isFetchingMediaList(state) &&
        !state.Media.FetchListError;

};

/**
 * Selector that checks if courses are being fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingMediaList = (state) => {

    return !!state.Media.FetchingList;

};

/**
 * Selector that checks if courses are being fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingMedia = (state) => {

    return !!state.Media.Fetching;

};

/**
 * Selector that returns a specific media file
 * @param {Object} state
 * @param {String} mediaID
 * @return {Function}
 */
export const getMedia = (state, mediaID) => {

    return state.Media.List[mediaID];

};

/**
 * Selector that returns if a specific media file needs to be fetched
 * @param  {Object} state
 * @param  {String} mediaID
 * @return {Boolean}
 */
export const shouldGetMedia = (state, mediaID) => {

    return !shouldFetchMediaList(state) && !isFetchingMediaList(state) &&
        !getMedia(state, mediaID) && !isFetchingMedia(state);

};

/**
 * Selector that returns a specific media file
 * @param {Object} state
 * @param {String} mediaUUID
 * @return {Function}
 */
export const getMediaByUUID = (state, mediaUUID) => {

    return Object.values(state.Media.List)
        .find(media => media.uuid === mediaUUID);

};

/**
 * Selector that returns an array with all media
 * @param {Object} state
 * @param {String} courseID
 * @return {Function}
 */
export const getMediaList = (state) => {

    return state.Media.List;

};

export default {
    shouldFetchMedia,
    shouldFetchMediaList,
    isFetchingMediaList,
    isFetchingMedia,
    getMedia,
    shouldGetMedia,
    getMediaList,
};
