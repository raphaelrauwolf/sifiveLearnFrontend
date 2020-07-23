
import AssessmentApi from 'Api/Assessment';
import TeamApi from 'Api/Team';

import MediaSelectors from 'Selectors/Media';

import NotificationActions from 'Actions/Notification';

export const START_ADD = 'ASSESSMENT.START_ADD';
export const ADD_ASSESSMENT_PROGRESS = 'ASSESSMENT.ADD_ASSESSMENT_PROGRESS';
export const ADD_ASSESSMENT_SUCCESS = 'ASSESSMENT.ADD_ASSESSMENT_SUCCESS';
export const ADD_ASSESSMENT_ERROR = 'ASSESSMENT.ADD_ASSESSMENT_ERROR';

export const START_UPLOAD_LINK_CREATE = 'ASSESSMENT.START_UPLOAD_LINK_CREATE';
export const UPLOAD_LINK_CREATE_SUCCESS = 'ASSESSMENT.UPLOAD_LINK_CREATE_SUCCESS';
export const UPLOAD_LINK_CREATE_ERROR = 'ASSESSMENT.UPLOAD_LINK_CREATE_ERROR';

export const START_GET = 'ASSESSMENT.START_GET';
export const GET_SUCCESS = 'ASSESSMENT.GET_SUCCESS';
export const GET_ERROR = 'ASSESSMENT.GET_ERROR';

export const START_GET_LIST = 'ASSESSMENT.START_GET_LIST';
export const GET_LIST_SUCCESS = 'ASSESSMENT.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'ASSESSMENT.GET_LIST_ERROR';

export const CREATE_ASSESSMENT_EVALUATION_PENDING = 'ASSESSMENT.CREATE_ASSESSMENT_EVALUATION_PENDING'
export const CREATE_ASSESSMENT_EVALUATION_SUCCESS = 'ASSESSMENT.CREATE_ASSESSMENT_EVALUATION_SUCCESS'
export const CREATE_ASSESSMENT_EVALUATION_ERROR = 'ASSESSMENT.CREATE_ASSESSMENT_EVALUATION_ERROR'

export const FETCH_ASSESSMENT_STATS_START = 'ASSESSMENT.FETCH_ASSESSMENT_STATS_START'
export const FETCH_ASSESSMENT_STATS_SUCCESS = 'ASSESSMENT.FETCH_ASSESSMENT_STATS_SUCCESS'
export const FETCH_ASSESSMENT_STATS_ERROR = 'ASSESSMENT.FETCH_ASSESSMENT_STATS_ERROR'

export const GET_PENDING_ASSESSMENTS_PENDING = 'TEAM.GET_PENDING_ASSESSMENTS_PENDING';
export const GET_PENDING_ASSESSMENTS_SUCCESS = 'TEAM.GET_PENDING_ASSESSMENTS_SUCCESS';
export const GET_PENDING_ASSESSMENTS_ERROR = 'TEAM.GET_PENDING_ASSESSMENTS_ERROR';

/**
 * Create upload link to add media
 * @param  {[type]} fileData [description]
 * @param {Object} params { lesson, course }
 * @return {[type]} [description]
 */
export const createUploadLink = (fileData, params) => {

    const start = () => ({ type: START_UPLOAD_LINK_CREATE, fileData });

    const success = response =>
        ({ type: UPLOAD_LINK_CREATE_SUCCESS, fileData, response });

    const failure = response =>
        ({ type: UPLOAD_LINK_CREATE_ERROR, fileData, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return AssessmentApi.createUploadLink(fileData, params, currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Called when learner submits uploaded assessment
 * @param {Object} file
 * @param {Object} params { lesson, course }
 * @return {Function}
 */
export const addAssessment = (file, params) => {

    const start = (mediaID) => ({ type: START_ADD, file, mediaID });

    const progress = (progress, mediaID) =>
        ({ type: ADD_ASSESSMENT_PROGRESS, file, progress, mediaID });

    const success = (response, assessmentId) =>
        ({ type: ADD_ASSESSMENT_SUCCESS, file, response, assessmentId });

    const failure = (response, mediaID) =>
        ({ type: ADD_ASSESSMENT_ERROR, file, response, mediaID });

    return (dispatch, getState) => {

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        const fileData = {
            contentType: file.type,
            filename: file.name,
            extension: file.name.match(/\.[0-9a-z]+$/g)[0].substr(1),
        };

        let assessmentID;

        return dispatch(createUploadLink(fileData, params)).then((response) => {

            const media = response.response;
            assessmentID = media.id;

            dispatch(start(assessmentID));

            return AssessmentApi.addAssessment(file, media.uploadPath, (event) => {

                if (event.lengthComputable) {

                    dispatch(progress(event.loaded / event.total, assessmentID));

                }

            });

        }).then((response) => {
            // TODO: this get call is prob unnecessary
            const lessonId = params.lesson.id
            const moduleId = params.lesson.moduleId
            const courseId = params.course.id
            return AssessmentApi.getAssessment(assessmentID, { lessonId, moduleId, courseId }, currentUserState.token);

        }).then((response) => {

            dispatch(NotificationActions.showSuccess('Assessment added!'));
            return dispatch(success(response, assessmentID));

        }).catch(error => Promise.reject(dispatch(failure(error, assessmentID))));

    };

};

/**
 * Get media list
 * @param {String} assessmentID
 * @param {Object} params { lessonId, courseId, moduleId }
 * @return {Function}
 */
export const getAssessment = (assessmentID, params) => {

    const start = () => ({ type: START_GET,
        assessmentID });

    const success = response => ({ type: GET_SUCCESS,
        assessmentID, response });

    const failure = response => ({ type: GET_ERROR,
        assessmentID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return AssessmentApi.getAssessment(
            assessmentID,
            params,
            currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * GetAssessment if its not in the store yet
 * @param  {String} mediaID
 * @return {Function}
 */
export const getAssessmentIfNeeded = (mediaID) => {

    return (dispatch, getState) => {

        const state = getState();

        if (MediaSelectors.shouldGetMedia(state, mediaID)) {

            return dispatch(getAssessment(mediaID));

        }

    };

};

/**
 * Get media list
 * @return {Function}
 */
export const getAssessmentList = () => {

    const start = () => ({ type: START_GET_LIST });

    const success = response => ({ type: GET_LIST_SUCCESS, response });

    const failure = response => ({ type: GET_LIST_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return AssessmentApi.getAssessmentList(currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export const getAssessmentListIfNeeded = () => {

    return (dispatch, getState) => {

        const state = getState();

        if (MediaSelectors.shouldFetchMediaList(state)) {

            return dispatch(getAssessmentList());

        }

    };

};


/**
 * Get Assessment stats for dashboard
 * @param {String} teamId
 * @return {Promise}
 */
export const getAssessmentStats = (teamId) => {

    const start = response => ({ type: FETCH_ASSESSMENT_STATS_START })
    const success = response => ({ type: FETCH_ASSESSMENT_STATS_SUCCESS, response });
    const failure = response => ({ type: FETCH_ASSESSMENT_STATS_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start())

        return AssessmentApi.getAssessmentStats(teamId)
            .then((response) => {
                dispatch(success(response, response))
            })
            .catch((error) => {
                Promise.reject(dispatch(failure(error)))
            })
    }
}


/**
 * Create Assessment Evaluation
 * @param {Object} arg1 { content, grade }
 * @param {Object} params { courseId, moduleId, lessonId }
 * @return {Promise}
 */
export const createAssessmentEvaluation = ({ content = '', grade }, params) => {

    const start = response => ({ type: CREATE_ASSESSMENT_EVALUATION_PENDING })
    const success = response => ({ type: CREATE_ASSESSMENT_EVALUATION_SUCCESS, response });
    const failure = response => ({ type: CREATE_ASSESSMENT_EVALUATION_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return AssessmentApi.createAssessmentEvaluation({
            content,
            grade,
            minGrade: '0',
            maxGrade: '100',
        }, params, currentUserState.token)
            .then((response) => {
                dispatch(NotificationActions.showSuccess('Assessment Evaluation submitted!'))
                return dispatch(success(response))
            })
            .catch((error) => {
                dispatch(NotificationActions.showError(`Failed to submit assessment: [${error.code}] ${error.message}`))
                return Promise.reject(dispatch(failure(error)))
            });

    };

};

export const getPendingAssessments = (teamID) => {

    const start = () => ({ type: GET_PENDING_ASSESSMENTS_PENDING });
    const failure = response =>
        ({ type: GET_PENDING_ASSESSMENTS_ERROR });

    return (dispatch, getState) => {

        dispatch(start());
        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return TeamApi.getPendingAssessments(teamID, currentUserState.token)
            .then((response) => {
                dispatch({
                    type: GET_PENDING_ASSESSMENTS_SUCCESS,
                    pendingAssessments: response,

                })
            })
            .catch(error => Promise.reject(dispatch(failure(error))));
    }
}

export default {
    addAssessment,
    getAssessment,
    getAssessmentIfNeeded,
    getAssessmentList,
    getAssessmentListIfNeeded,
    createAssessmentEvaluation,
};
