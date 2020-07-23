
/**
 * Selector that checks if the media needs to be fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchAssessment = (state) => {

    return !state.Assessment.FetchedList && !isFetchingAssessmentList(state);

};

/**
 * Selector that checks if the media needs to be fetched
 * @param {Object} state
 * @return {Function}
 */
export const shouldFetchAssessmentList = (state) => {

    return !state.Assessment.FetchedList &&
        !isFetchingAssessmentList(state) &&
        !state.Assessment.FetchListError;

};

/**
 * Selector that checks if courses are being fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingAssessmentList = (state) => {

    return !!state.Assessment.FetchingList;

};

/**
 * Selector that checks if courses are being fetched
 * @param {Object} state
 * @return {Function}
 */
export const isFetchingAssessment = (state) => {

    return !!state.Assessment.Fetching;

};

/**
 * Selector that returns a specific media file
 * @param {Object} state
 * @param {String} mediaID
 * @return {Function}
 */
export const getAssessment = (state, mediaID) => {

    return state.Assessment.List[mediaID];

};

/**
 * Selector that returns if a specific media file needs to be fetched
 * @param  {Object} state
 * @param  {String} mediaID
 * @return {Boolean}
 */
export const shouldGetAssessment = (state, mediaID) => {

    return !shouldFetchAssessmentList(state) && !isFetchingAssessmentList(state) &&
        !getAssessment(state, mediaID) && !isFetchingAssessment(state);

};

/**
 * Selector that returns a specific media file
 * @param {Object} state
 * @param {String} mediaUUID
 * @return {Function}
 */
export const getAssessmentByUUID = (state, mediaUUID) => {

    return Object.values(state.Assessment.List)
        .find(media => media.uuid === mediaUUID);

};

/**
 * Selector that returns an array with all media
 * @param {Object} state
 * @param {String} courseID
 * @return {Function}
 */
export const getAssessmentList = (state) => {

    return state.Assessment.List;

};

export const shouldFetchPendingAssessments = (state) => {
    return state.Assessment.pendingAssessmentsStatus !== 'PENDING'
}

export const getPendingAssessments = (state) => {
    return state.Assessment.pendingAssessments
}

export const getPendingAssessmentsStatus = (state) => {
    return state.Assessment.pendingAssessmentsStatus
}

export default {
    shouldFetchAssessment,
    shouldFetchAssessmentList,
    isFetchingAssessmentList,
    isFetchingAssessment,
    getAssessment,
    shouldGetAssessment,
    getAssessmentList,
};
