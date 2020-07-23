
import {
    START_GET, GET_SUCCESS, GET_ERROR,
    START_GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR,
    START_UPDATE, UPDATE_SUCCESS, UPDATE_ERROR,
    START_CREATE, CREATE_SUCCESS, CREATE_ERROR,
    START_ARCHIVE, ARCHIVE_SUCCESS, ARCHIVE_ERROR,
} from 'Actions/Module';

import {
    GET_LIST_SUCCESS as COURSE_GET_LIST_SUCCESS,
} from 'Actions/Course';

import {
    CREATE_SUCCESS as LESSON_CREATE_SUCCESS,
} from 'Actions/Lesson';

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

    archiving: false,
    archiveError: false,

};

const Modules = (state = INITIAL_STATE, action) => {

    switch (action.type) {


        /**
         * Lesson Actions
         */
        case LESSON_CREATE_SUCCESS: {

            const { moduleID } = action;
            const module = state.list[moduleID];

            module.lessons = module.lessons.map(lesson => lesson.id);

            return {
                ...state,
                list: {
                    ...state.list,
                    [moduleID]: {
                        ...module,
                        lessons: [
                            ...module.lessons,
                            action.response.id,
                        ],
                    },
                },
            };

        }

        /**
         * Course Actions
         */
        case COURSE_GET_LIST_SUCCESS: {

            const modules = JSON.parse(JSON.stringify(action.response))
                .map(course => course.modules)
                .flat()
                .reduce((object, module) => {

                    object[module.id] = module;
                    return object;

                }, {});

            return {
                ...state,
                list: {
                    ...state.list,
                    ...modules,
                },
            };

        }

        /* Module Get Actions */
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

            const module = action.response;
            return {
                ...state,
                fetching: false,
                list: {
                    ...state.list,
                    [module.id]: {
                        ...state.list[module.id],
                        ...module,
                    },
                },
            };

        }

        /* Module GetList Actions*/
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

            const modules = action.response
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
                    ...modules,
                },
            };

        }

        /**
         * Module Update Actions
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

            const module = action.response;

            return {
                ...state,
                updating: false,
                list: {
                    ...state.list,
                    [module.id]: {
                        ...state.list[module.id],
                        ...module,
                    },
                },
            };

        }

        /**
         * Module Create Actions
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

            const module = action.response;

            return {
                ...state,
                creating: false,
                list: {
                    ...state.list,
                    [module.id]: {
                        ...state.list[module.id],
                        ...module,
                    },
                },
            };

        }

        /**
         * Module Archive Actions
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

            delete state.list[action.moduleID];

            return {
                ...state,
                archiving: false,
            };

        }

        default:
            return state;

    }

};

export { Modules };
