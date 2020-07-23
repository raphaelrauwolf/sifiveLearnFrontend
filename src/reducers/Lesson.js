
import {
    GET_LIST_SUCCESS as COURSE_GET_LIST_SUCCESS,
} from 'Actions/Course';

import {
    CREATE_SUCCESS as LESSON_CREATE_SUCCESS,
    UPDATE_SUCCESS as LESSON_UPDATE_SUCCESS,
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
    START_UPDATE_PROGRESS,
    UPDATE_PROGRESS_SUCCESS,
    UPDATE_PROGRESS_ERROR,
} from 'Actions/Lesson';

const INITIAL_STATE = {
    List: {},
};

/**
 * Reducer handeling the lessons
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const Lesson = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateLesson Actions
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
         * GetLesson Actions
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
                    [id]: {
                        ...state.List[id],
                        ...lesson,
                    },
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
         * GetLessonList Actions
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
         * UpdateLesson Actions
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
            const lessons = {};

            courses.forEach((course) => {

                course.modules.forEach((module) => {

                    module.lessons.forEach((lesson) => {

                        lessons[lesson.id] = {
                            ...lesson,
                            ...state.List[lesson.id],
                            course: course.id,
                            module: module.id,
                        };

                    });

                });

            });

            return {
                ...state,
                FetchedList: true,
                List: {
                    ...state.List,
                    ...lessons,
                },
            };

        }

        case LESSON_CREATE_SUCCESS: {

            const lesson = action.response;
            return {
                ...state,
                List: {
                    ...state.List,
                    [lesson.id]: lesson,
                },
            };

        }

        case LESSON_UPDATE_SUCCESS: {

            const lesson = action.response;
            return {
                ...state,
                List: {
                    ...state.List,
                    [lesson.id]: {
                        ...state.List[lesson.id],
                        ...lesson,
                    },
                },
            };

        }

        /* LessonProgressUpdate Actions */

        case START_UPDATE_PROGRESS:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.lessonID]: {
                        ...state.List[action.lessonID],
                        UpdatingProgress: true,
                    },
                },
            };
        case UPDATE_PROGRESS_SUCCESS:
            delete state.List[action.lessonID].UpdatingProgess;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.lessonID]: {
                        ...state.List[action.lessonID],
                        UpdatedProgress: true,
                        progress: action.response.progress,
                    },
                },
            };
        case UPDATE_PROGRESS_ERROR:
            delete state.List[action.lessonID].UpdatingProgess;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.lessonID]: {
                        ...state.List[action.lessonID],
                        UpdatedProgress: false,
                        UpdateProgressError: action.response,
                    },
                },
            };


        default:
            return state;

    }

};

export { Lesson };
