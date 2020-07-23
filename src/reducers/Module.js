
import {
    GET_LIST_SUCCESS as COURSE_GET_LIST_SUCCESS,
} from 'Actions/Course';

import {
    CREATE_SUCCESS as MODULE_CREATE_SUCCESS,
    ADD_LESSON as MODULE_ADD_LESSON,
} from 'Actions/Module';

import {
    CREATE_SUCCESS as LESSON_CREATE_SUCCESS,
} from 'Actions/Lesson';

import {
    START_CREATE,
    CREATE_SUCCESS,
    CREATE_ERROR,
    START_GET,
    GET_SUCCESS,
    GET_ERROR,
    START_GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,
    START_UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
} from 'Actions/Module';

const INITIAL_STATE = {
    List: {},
};

/**
 * Reducer handeling the modules
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const Module = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateModule Actions
         */
        case START_CREATE:
            delete state.Created;
            delete state.CreateError;
            return {
                ...state,
                Creating: true,
            };
        case CREATE_SUCCESS: {

            const lesson = action.response;
            delete state.Creating;
            return {
                ...state,
                Created: true,
                List: {
                    ...state.List,
                    [lesson.id]: lesson,
                },
            };

        }
        case CREATE_ERROR:
            delete state.Creating;
            return {
                ...state,
                Created: false,
                CreateError: action.response,
            };

        /**
         * GetModule Actions
         */
        case START_GET:
            delete state.Fetched;
            delete state.FetchError;
            return {
                ...state,
                Fetching: true,
            };
        case GET_SUCCESS: {

            const id = action.lessonID;
            const lesson = action.response;

            delete state.Fetching;

            return {
                ...state,
                Fetched: true,
                List: {
                    ...state.List,
                    [id]: lesson,
                },
            };

        }
        case GET_ERROR:
            delete state.Fetching;
            return {
                ...state,
                Fetched: false,
                FetchError: action.response,
            };

        /**
         * GetModuleList Actions
         */
        case START_GET_LIST:
            delete state.FetchedList;
            delete state.FetchListError;
            return {
                ...state,
                FetchingList: true,
            };
        case GET_LIST_SUCCESS: {

            delete state.FetchingList;
            return {
                ...state,
                FetchedList: true,
                List: {
                    ...state.List,
                    ...action.response,
                },
            };

        }
        case GET_LIST_ERROR:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: false,
                FetchListError: action.response,
            };

        /**
         * UpdateModule Actions
         */
        case START_UPDATE:
            delete state.Updated;
            delete state.UpdateError;
            return {
                ...state,
                Updating: true,
            };
        case UPDATE_SUCCESS: {

            const id = action.lessonID;
            const lesson = action.response;

            delete state.Updating;

            return {
                ...state,
                Updated: true,
                List: {
                    ...state.List,
                    [id]: {
                        ...state.List[id],
                        ...lesson,
                    },
                },
            };

        }
        case UPDATE_ERROR:
            delete state.Updating;
            return {
                ...state,
                Updated: false,
                UpdateError: action.response,
            };

        /**
         * Course Action
         */
        case COURSE_GET_LIST_SUCCESS: {

            const courses = JSON.parse(JSON.stringify(action.response));
            const modules = {};

            courses.forEach((course) => {

                course.modules.forEach((module) => {

                    modules[module.id] = {
                        ...module,
                        course: course.id,
                    };

                });

            });

            return {
                ...state,
                FetchedList: true,
                List: {
                    ...state.List,
                    ...modules,
                },
            };

        }

        case MODULE_CREATE_SUCCESS: {

            const module = action.response;
            return {
                ...state,
                List: {
                    ...state.List,
                    [module.id]: module,
                },
            };

        }

        case MODULE_ADD_LESSON: {

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.moduleID]: {
                        ...state.List[action.moduleID],
                        lessons: [
                            ...state.List[action.moduleID].lessons,
                            action.lessonID,
                        ],
                    },
                },
            };

        }

        case LESSON_CREATE_SUCCESS: {

            const lesson = action.response;

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.moduleID]: {
                        ...state.List[action.moduleID],
                        lessons: [
                            ...state.List[action.moduleID].lessons,
                            lesson.id,
                        ],
                    },
                },
            };

        }


        default:
            return state;

    }

};

export { Module };
