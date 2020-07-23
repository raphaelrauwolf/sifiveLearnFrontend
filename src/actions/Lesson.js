
import LessonApi from 'Api/Lesson';

import LessonSelectors from 'Selectors/Lesson';

import {
    getModuleLessons,
} from 'Selectors/Module';

export const START_CREATE = 'LESSON.START_CREATE';
export const CREATE_SUCCESS = 'LESSON.CREATE_SUCCESS';
export const CREATE_ERROR = 'LESSON.CREATE_ERROR';

export const START_GET = 'LESSON.START_GET';
export const GET_SUCCESS = 'LESSON.GET_SUCCESS';
export const GET_ERROR = 'LESSON.GET_ERROR';

export const START_GET_LIST = 'LESSON.START_GET_LIST';
export const GET_LIST_SUCCESS = 'LESSON.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'LESSON.GET_LIST_ERROR';

export const START_UPDATE = 'LESSON.START_UPDATE';
export const UPDATE_SUCCESS = 'LESSON.UPDATE_SUCCESS';
export const UPDATE_ERROR = 'LESSON.UPDATE_ERROR';

export const START_UPDATE_PROGRESS = 'LESSON.START_UPDATE_PROGRESS';
export const UPDATE_PROGRESS_SUCCESS = 'LESSON.UPDATE_PROGRESS_SUCCESS';
export const UPDATE_PROGRESS_ERROR = 'LESSON.UPDATE_PROGRESS_ERROR';

export const START_ARCHIVE = 'LESSON.START_ARCHIVE';
export const ARCHIVE_SUCCESS = 'LESSON.ARCHIVE_SUCCESS';
export const ARCHIVE_ERROR = 'LESSON.ARCHIVE_ERROR';

export const MOVE = 'LESSON.MOVE';

/**
 * Create a new lesson
 * @param {Object} data { name, description, content, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const createLesson = (data, courseID, moduleID) => {

    const start = () => ({ type: START_CREATE,
        data, courseID, moduleID });
    const success = response => ({ type: CREATE_SUCCESS,
        data, courseID, moduleID, response });
    const failure = response => ({ type: CREATE_ERROR,
        courseID, moduleID, response });

    return (dispatch, getState) => {

        const state = getState();
        data.order = data.order || getModuleLessons(state, moduleID).length;
        data.content = data.content || '';

        const currentUserState = state.User.CurrentUser;

        dispatch(start());

        return LessonApi.createLesson(
            data, courseID, moduleID, currentUserState.token
        ).then((response) => {

            return dispatch(success(response));

        }).catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Get lesson data
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const getLesson = (courseID, moduleID, lessonID) => {

    const start = () => ({ type: START_GET,
        courseID, moduleID, lessonID });

    const success = response => ({ type: GET_SUCCESS,
        courseID, moduleID, lessonID, response });

    const failure = response => ({ type: GET_ERROR,
        courseID, moduleID, lessonID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return LessonApi.getLesson(
            courseID, moduleID, lessonID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Check if getLesson is needed
 * @param {String} courseID
 * @param {String} moduleID
 * @param  {String} lessonID
 * @return {Function}
 */
export const getLessonIfNeeded = (courseID, moduleID, lessonID) => {

    return (dispatch, getState) => {

        const state = getState();

        if (LessonSelectors.shouldGetLesson(
            state, lessonID)
        ) {

            return dispatch(getLesson(courseID, moduleID, lessonID));

        }

    };

};

/**
 * Get lesson list for a module
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const getLessonList = (courseID, moduleID) => {

    const start = () => ({ type: START_GET_LIST });
    const success = response => ({ type: GET_LIST_SUCCESS, response });
    const failure = response => ({ type: GET_LIST_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return LessonApi.getLessonList(courseID, moduleID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Update a lesson
 * @param {Object} data { name, description, content, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const updateLesson = (data, courseID, moduleID, lessonID) => {

    const start = () =>
        ({ type: START_UPDATE,
            data, courseID, moduleID, lessonID });
    const success = response =>
        ({ type: UPDATE_SUCCESS,
            data, courseID, moduleID, lessonID, response });
    const failure = response =>
        ({ type: UPDATE_ERROR,
            courseID, moduleID, lessonID, response });

    return (dispatch, getState) => {

        const state = getState();
        data.order = data.order || getModuleLessons(state, moduleID).length;
        data.content = data.content || '';

        const currentUserState = state.User.CurrentUser;

        dispatch(start());

        return LessonApi.updateLesson(
            data, courseID, moduleID, lessonID,
            currentUserState.token,
        ).then((response) => {

            return dispatch(success(response));

        }).catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Update a lesson
 * @param {Object} data { progress }
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const updateLessonProgress = (data, courseID, moduleID, lessonID) => {

    const start = () => ({ type: START_UPDATE_PROGRESS,
        courseID, moduleID, lessonID });

    const success = response => ({ type: UPDATE_PROGRESS_SUCCESS,
        courseID, moduleID, lessonID, response });

    const failure = response => ({ type: UPDATE_PROGRESS_ERROR,
        courseID, moduleID, lessonID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return LessonApi.updateLessonProgress(
            data, courseID, moduleID, lessonID,
            currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Move a lesson
 * @param {String} newModuleID
 * @param {Number} newOrder
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const moveLesson = (
        newModuleID, newOrder, courseID, moduleID, lessonID) => {

    return (dispatch, getState) => {

        /*
        dispatch({
            type: MOVE,
            newModuleID, newOrder, courseID, moduleID, lessonID,
        });
        */
        const state = getState();

        const lesson = LessonSelectors.getLesson(state, lessonID);

        return dispatch(updateLesson(
            {
                name: lesson.name,
                description: lesson.description,
                order: newOrder,
                moduleId: newModuleID,
            },
            courseID, moduleID, lessonID
        ));

    };

};

/**
 * Remove a lesson
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const removeLesson = (courseID, moduleID, lessonID) => {

    const start = () =>
        ({ type: START_ARCHIVE, courseID, moduleID, lessonID });
    const success = response =>
        ({ type: ARCHIVE_SUCCESS, courseID, moduleID, lessonID, response });
    const failure = response =>
        ({ type: ARCHIVE_ERROR, courseID, moduleID, lessonID, response });

    return (dispatch, getState) => {

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        dispatch(start());

        return LessonApi.archiveLesson(
            courseID, moduleID, lessonID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

export default {
    createLesson,
    getLesson,
    getLessonIfNeeded,
    getLessonList,
    updateLesson,
    updateLessonProgress,
    moveLesson,
    removeLesson,
};
