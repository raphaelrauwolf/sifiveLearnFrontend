
import ModuleApi from 'Api/Module';
import CourseSelectors from 'Selectors/Course';
import ModuleSelectors from 'Selectors/Module';
import LearnMaterialSelectors from 'Selectors/LearnMaterial';

export const START_CREATE = 'MODULE.START_CREATE';
export const CREATE_SUCCESS = 'MODULE.CREATE_SUCCESS';
export const CREATE_ERROR = 'MODULE.CREATE_ERROR';

export const START_GET = 'MODULE.START_GET';
export const GET_SUCCESS = 'MODULE.GET_SUCCESS';
export const GET_ERROR = 'MODULE.GET_ERROR';

export const START_GET_LIST = 'MODULE.START_GET_LIST';
export const GET_LIST_SUCCESS = 'MODULE.GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'MODULE.GET_LIST_ERROR';

export const START_UPDATE = 'MODULE.START_UPDATE';
export const UPDATE_SUCCESS = 'MODULE.UPDATE_SUCCESS';
export const UPDATE_ERROR = 'MODULE.UPDATE_ERROR';

export const START_ARCHIVE = 'MODULE.START_ARCHIVE';
export const ARCHIVE_SUCCESS = 'MODULE.ARCHIVE_SUCCESS';
export const ARCHIVE_ERROR = 'MODULE.ARCHIVE_ERROR';

export const MOVE = 'MODULE.MOVE';

export const ADD_LESSON = 'MODULE.ADD_LESSON';
export const REMOVE_LESSON = 'MODULE.REMOVE_LESSON';

/**
 * Create a new module
 * @param {Object} data { name, description, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const createModule = (data, courseID) => {

    const start = () => ({ type: START_CREATE, courseID });
    const success = response => ({ type: CREATE_SUCCESS, courseID, response });
    const failure = response => ({ type: CREATE_ERROR, courseID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        // add default order value
        let order = 0;
        const courseModules = CourseSelectors.getCourseModules(state, courseID);

        if (courseModules.length > 0) {

            order = Math
                .max(...courseModules.map(module => module.order));

            order += 1000;

        }

        data['order'] = data['order'] || order;

        return ModuleApi.createModule(
            data, courseID, currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Get module data
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} lessonID
 * @return {Function}
 */
export const getModule = (courseID, moduleID) => {

    const start = () => ({ type: START_GET, courseID, moduleID });

    const success = response => ({ type: GET_SUCCESS,
        courseID, moduleID, response });

    const failure = response => ({ type: GET_ERROR,
        courseID, moduleID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return ModuleApi.getModule(
            courseID, moduleID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Get module list for a course
 * @param {String} courseID
 * @return {Function}
 */
export const getModuleList = (courseID) => {

    const start = () => ({ type: START_GET_LIST, courseID });
    const success = response =>
        ({ type: GET_LIST_SUCCESS, courseID, response });
    const failure = response => ({ type: GET_LIST_ERROR, courseID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const currentUserState = getState().User.CurrentUser;

        return ModuleApi.getModuleList(courseID,
            currentUserState.token)
            .then(response => dispatch(success(response)))
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Update a module
 * @param {Object} data { name, description, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const updateModule = (data, courseID, moduleID) => {

    const start = () => ({ type: START_UPDATE, data, courseID, moduleID });

    const success = response => ({ type: UPDATE_SUCCESS,
        data, courseID, moduleID, response });

    const failure = response => ({ type: UPDATE_ERROR,
        data, courseID, moduleID, response });

    return (dispatch, getState) => {

        dispatch(start());

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        // add default order value
        const currentOrder = ModuleSelectors.getModule(state, moduleID).order;
        data['order'] = data['order'] || currentOrder;

        return ModuleApi.updateModule(
            data, courseID, moduleID,
            currentUserState.token)
            .then((response) => {

                return dispatch(success(response));

            })
            .catch(error => Promise.reject(dispatch(failure(error))));

    };

};

/**
 * Change the order of the module
 * @param  {Number} newOrder
 * @param  {String} courseID
 * @param  {String} moduleID
 * @return {Function}
 */
export const moveModule = (
        newOrder, courseID, moduleID) => {

    return (dispatch, getState) => {

        /*
        dispatch({
            type: MOVE,
            newOrder, courseID, moduleID,
        });
*/
        const state = getState();

        const module = ModuleSelectors.getModule(state, moduleID);

        return dispatch(updateModule(
            {
                name: module.name,
                description: module.description,
                order: newOrder,
            },
            courseID, moduleID,
        ));

    };

};

/**
 * Add a lesson to the created module
 * @param {String} lessonID
 * @return {Function}
 */
export const addLesson = (lessonID) => {

    return (dispatch, getState) => {

        const state = getState();
        const moduleID = LearnMaterialSelectors.getActiveModule(state).id;

        return dispatch({
            type: ADD_LESSON,
            moduleID, lessonID,
        });

    };

};

/**
 * Remove a module
 * @param {String} courseID
 * @param {String} moduleID
 * @return {Function}
 */
export const removeModule = (courseID, moduleID) => {

    const start = () =>
        ({ type: START_ARCHIVE, courseID, moduleID });
    const success = response =>
        ({ type: ARCHIVE_SUCCESS, courseID, moduleID, response });
    const failure = response =>
        ({ type: ARCHIVE_ERROR, courseID, moduleID, response });

    return (dispatch, getState) => {

        const state = getState();
        const currentUserState = state.User.CurrentUser;

        dispatch(start(courseID));

        return ModuleApi.archiveModule(
            courseID, moduleID,
            currentUserState.token)
            .then(response => dispatch(success(courseID, response)))
            .catch(error => Promise.reject(dispatch(failure(courseID, error))));

    };

};

export default {
    createModule,
    getModule,
    getModuleList,
    updateModule,
    moveModule,
    addLesson,
    removeModule,
};
