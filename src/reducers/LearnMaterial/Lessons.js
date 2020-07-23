
import {
    START_GET, GET_SUCCESS, GET_ERROR,
    START_GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR,
    START_UPDATE, UPDATE_SUCCESS, UPDATE_ERROR,
    START_CREATE, CREATE_SUCCESS, CREATE_ERROR,
    START_UPDATE_PROGRESS, UPDATE_PROGRESS_SUCCESS, UPDATE_PROGRESS_ERROR,
    START_ARCHIVE, ARCHIVE_SUCCESS, ARCHIVE_ERROR,
} from 'Actions/Lesson';

import {
    GET_LIST_SUCCESS as COURSE_GET_LIST_SUCCESS,
} from 'Actions/Course';


export const INITIAL_STATE = {
    list: {},

    fetching: false,
    fetchError: false,

    fetchingList: false,
    fetchListError: false,

    updating: false,
    updateError: false,

    creating: false,
    createError: false,

    updatingProgress: false,
    updateProgressError: false,

    archiving: false,
    archiveError: false,
};

const Lessons = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /* Course GetList Actions */
        case COURSE_GET_LIST_SUCCESS: {

            const lessons = JSON.parse(JSON.stringify(action.response))
                .map(course => course.modules)
                .flat()
                .map(module => module.lessons)
                .flat()
                .reduce((object, item) => {

                    object[item.id] = item;
                    return object;

                }, {});

            return {
                ...state,
                list: {
                    ...state.list,
                    ...lessons,
                },
            };

        }

        /* Lesson Get Actions */
        case START_GET:
            return {
                ...state,
                fetching: true,
                fetchError: false,
            };
        case GET_ERROR:
            return {
                ...state,
                fetching: false,
                fetchError: action.response,
            };
        case GET_SUCCESS: {

            const lesson = action.response;
            return {
                ...state,
                fetching: false,
                list: {
                    ...state.list,
                    [lesson.id]: {
                        ...state.list[lesson.id],
                        ...lesson,
                    },
                },
            };

        }

        /* Lesson GetList Actions*/
        case START_GET_LIST:
            return {
                ...state,
                fetchingList: true,
                fetchListError: false,
            };
        case GET_LIST_ERROR:
            return {
                ...state,
                fetchingList: false,
                fetchListError: action.response,
            };
        case GET_LIST_SUCCESS: {

            const lessons = action.response
                .reduce((object, item) => {

                    object[item.id] = {
                        ...object[item.id],
                        ...item,
                    };
                    return object;

                }, {});

            return {
                ...state,
                fetchingList: false,
                list: {
                    ...state.list,
                    ...lessons,
                },
            };

        }

        /**
         * Lesson Update Actions
         */
        case START_UPDATE:
            return {
                ...state,
                updating: true,
                updateError: false,
            };
        case UPDATE_ERROR:
            return {
                ...state,
                updating: false,
                updateError: action.response,
            };
        case UPDATE_SUCCESS: {

            const lesson = action.response;

            return {
                ...state,
                updating: false,
                list: {
                    ...state.list,
                    [lesson.id]: {
                        ...state.list[lesson.id],
                        ...lesson,
                    },
                },
            };

        }


        /**
         * Lesson Create Actions
         */
        case START_CREATE:
            return {
                ...state,
                creating: true,
                createError: false,
            };
        case CREATE_ERROR:
            return {
                ...state,
                creating: false,
                createError: action.response,
            };
        case CREATE_SUCCESS: {

            const lesson = action.response;

            return {
                ...state,
                creating: false,
                list: {
                    ...state.list,
                    [lesson.id]: {
                        ...state.list[lesson.id],
                        ...lesson,
                    },
                },
            };

        }

        /**
         * Lesson Update Progress Actions
         */

        case START_UPDATE_PROGRESS:
            return {
                ...state,
                updatingProgress: true,
                updateProgressError: false,
            };
        case UPDATE_PROGRESS_SUCCESS:
            return {
                ...state,
                updatingProgress: false,
                list: {
                    ...state.list,
                    [action.lessonID]: {
                        ...state.list[action.lessonID],
                        progress: action.response.progress,
                    },
                },
            };
        case UPDATE_PROGRESS_ERROR:
            return {
                ...state,
                updatingProgress: false,
                updateProgressError: action.response,
            };


        /**
         * Lesson Archive Actions
         */
        case START_ARCHIVE:
            return {
                ...state,
                archiving: true,
                archiveError: false,
            };
        case ARCHIVE_ERROR:
            return {
                ...state,
                archiving: false,
                archiveError: action.response,
            };
        case ARCHIVE_SUCCESS: {

            delete state.list[action.lessonID];

            return {
                ...state,
                archiving: false,
            };

        }

        default:
            return state;

    }

};

export { Lessons };
