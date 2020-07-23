
import {
    CREATE_SUCCESS as COURSE_CREATE_SUCCESS,
    ADD_MODULE as COURSE_ADD_MODULE,
} from 'Actions/Course';

import {
    CREATE_SUCCESS as MODULE_CREATE_SUCCESS,
} from 'Actions/Module';

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
    ADD_MODULE,
    ADD_UNSORTED_LESSON,
} from 'Actions/Course';

export const INITIAL_STATE = {
    List: {},
    LastCreatedCourseID: 16,
};

const Course = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateCourse Actions
         */
        case START_CREATE:
            delete state.Created;
            delete state.CreateError;
            return {
                ...state,
                Creating: true,
            };
        case CREATE_SUCCESS: {

            const course = action.response;
            delete state.Creating;
            return {
                ...state,
                Created: true,
                LastCreatedCourseID: course.id,
                List: {
                    ...state.List,
                    [course.id]: {
                        ...course,
                        modules: [],
                    },
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
         * GetCourse Actions
         */
        case START_GET:
            delete state.Fetched;
            delete state.FetchError;
            return {
                ...state,
                Fetching: true,
            };
        case GET_SUCCESS: {

            const id = action.courseID;
            const course = action.response;

            delete state.Fetching;

            return {
                ...state,
                Fetched: true,
                List: {
                    ...state.List,
                    [id]: course,
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
         * GetCourseList Actions
         */
        case START_GET_LIST:
            delete state.FetchedList;
            delete state.FetchListError;
            return {
                ...state,
                FetchingList: true,
            };
        case GET_LIST_SUCCESS: {

            const courses = {};

            JSON.parse(JSON.stringify(action.response)).forEach((course) => {

                course.modules = course.modules.map(module => module.id);

                courses[course.id] = course;

            });

            delete state.FetchingList;
            return {
                ...state,
                FetchedList: true,
                List: {
                    ...state.List,
                    ...courses,
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
         * UpdateCourse Actions
         */
        case START_UPDATE:
            delete state.Updated;
            delete state.UpdateError;
            return {
                ...state,
                Updating: true,
            };
        case UPDATE_SUCCESS: {

            const id = action.courseID;
            const course = action.response;

            delete state.Updating;

            return {
                ...state,
                Updated: true,
                List: {
                    ...state.List,
                    [id]: {
                        ...state.List[id],
                        ...course,
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
         * AddModule Actions
         */
        case ADD_MODULE: {

            const course = state.List[action.courseID];

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.courseID]: {
                        ...course,
                        modules: [
                            ...course.modules,
                            action.moduleID,
                        ],
                    },
                },
            };

        }

        case ADD_UNSORTED_LESSON: {

            const course = state.List[action.courseID];

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.courseID]: {
                        ...course,
                        UnsortedLessons: [
                            ...(course.UnsortedLessons ?
                                course.UnsortedLessons : []),
                            action.lessonID,
                        ],
                    },
                },
            };

        }

        case COURSE_CREATE_SUCCESS: {

            const course = action.response;

            return {
                ...state,
                List: {
                    ...state.List,
                    [course.id]: course,
                },
            };

        }

        case COURSE_ADD_MODULE: {

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.courseID]: {
                        ...state.List[action.courseID],
                        modules: [
                            ...state.List[action.courseID].modules,
                            action.moduleID,
                        ],
                    },
                },
            };

        }

        case MODULE_CREATE_SUCCESS: {

            const module = action.response;

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.courseID]: {
                        ...state.List[action.courseID],
                        modules: [
                            ...state.List[action.courseID].modules,
                            module.id,
                        ],
                    },
                },
            };

        }
        /*
        case MODULE_REMOVE_LESSON: {

            const module = state.List;

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.courseID]: {
                        ...state.List[action.courseID],
                        modules: [
                            ...state.List[action.courseID].modules,
                            module.id,
                        ],
                    },
                },
            };

        }
        */

        default:
            return state;
    }

};

export { Course };
