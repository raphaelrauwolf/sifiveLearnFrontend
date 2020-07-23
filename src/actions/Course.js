
import NotificationActions from 'Actions/Notification';

import CourseSelectors from 'Selectors/Course';

import CourseApi from 'Api/Course';

export const START_CREATE = 'COURSE.START_CREATE';
export const CREATE_SUCCESS = 'COURSE.CREATE_SUCCESS';
export const CREATE_ERROR = 'COURSE.CREATE_ERROR';

export const START_GET = 'COURSE.START_GET';
export const GET_SUCCESS = 'COURSE.GET_SUCCESS';
export const GET_ERROR = 'COURSE.GET_ERROR';

export const START_GET_LIST = 'COURSE.START_GET_LIST';
export const GET_LIST_SUCCESS = 'COURSE.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'COURSE.GET_LIST_ERROR';

export const START_UPDATE = 'COURSE.START_UPDATE';
export const UPDATE_SUCCESS = 'COURSE.UPDATE_SUCCESS';
export const UPDATE_ERROR = 'COURSE.UPDATE_ERROR';

export const ADD_MODULE = 'COURSE.ADD_MODULE';
export const REMOVE_MODULE = 'COURSE.REMOVE_MODULE';
export const ADD_UNSORTED_LESSON = 'COURSE.ADD_UNSORTED_LESSON';

/**
 * Create a new course
 * @param {Object} data { name, description }
 * @return {Function}
 */
export const createCourse = (data) => {

    const start = () => ({ type: START_CREATE });
    const success = response => ({ type: CREATE_SUCCESS, response });
    const failure = response => ({ type: CREATE_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return CourseApi.createCourse(data, currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Get course data
 * @param {String} courseID
 * @return {Function}
 */
export const getCourse = (courseID) => {

    const start = () => ({ type: START_GET, courseID });
    const success = response => ({ type: GET_SUCCESS, courseID, response });
    const failure = response => ({ type: GET_ERROR, courseID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return CourseApi.getCourse(
            courseID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Check if getCourse is needed
 * @param  {String} courseID
 * @return {Function}
 */
export const getCourseIfNeeded = (courseID) => {

    return (dispatch, getState) => {

        const state = getState();

        if (CourseSelectors.shouldGetCourse(state, courseID)) {

            return dispatch(getCourse(courseID));

        }

    };

};

/**
 * Get course list for the current user
 * @return {Function}
 */
export const getCourseList = () => {

    const start = () => ({ type: START_GET_LIST });
    const success = response => ({ type: GET_LIST_SUCCESS, response });
    const failure = response => ({ type: GET_LIST_ERROR, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return CourseApi.getCourseList(currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Check if getCourseList is needed
 * @param  {String} courseID
 * @return {Function}
 */
export const getCourseListIfNeeded = () => {

    return (dispatch, getState) => {

        const state = getState();

        if (CourseSelectors.shouldGetCourseList(state)) {

            return dispatch(getCourseList());

        }

    };

};

/**
 * Update a course
 * @param {Object} data { name, description }
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const updateCourse = (data, courseID) => {

    const start = () => ({ type: START_UPDATE, courseID });
    const success = response => ({ type: UPDATE_SUCCESS, courseID, response });
    const failure = response => ({ type: UPDATE_ERROR, courseID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        return CourseApi.updateCourse(
            data, courseID,
            currentUserState.token)
            .then((response) => {

                dispatch(NotificationActions.showSuccess('Course updated!'));
                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Add a module to the created course
 * @param {String} moduleID
 * @return {Function}
 */
export const addModule = (moduleID) => {

    return (dispatch, getState) => {

        const state = getState();
        const courseID = CourseSelectors.getCourseID(state);

        return dispatch({
            type: ADD_MODULE,
            courseID, moduleID,
        });

    };

};

/**
 * Remove a module from course
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const removeModule = (courseID, moduleID) => {

    return (dispatch, getState) => {

        // TODO: implement API remove

        return dispatch({
            type: REMOVE_MODULE,
            courseID, moduleID,
        });

    };

};

/**
 * Add a lesson to the created course
 * @param {String} lessonID
 * @return {Function}
 */
export const addUnsortedLesson = (lessonID) => {

    return {
        type: ADD_UNSORTED_LESSON,
        lessonID,
    };

};

export default {
    addModule,
    removeModule,
    createCourse,
    getCourse,
    getCourseIfNeeded,
    getCourseList,
    getCourseListIfNeeded,
    updateCourse,
    addUnsortedLesson,
};
