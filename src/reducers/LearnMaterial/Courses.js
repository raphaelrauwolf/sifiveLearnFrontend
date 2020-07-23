
import {
    START_GET, GET_SUCCESS, GET_ERROR,
    START_GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR,
    START_UPDATE, UPDATE_SUCCESS, UPDATE_ERROR,
    START_CREATE, CREATE_SUCCESS, CREATE_ERROR,
    REMOVE_MODULE,
} from 'Actions/Course';

import {
    GET_SUCCESS as GET_MODULE_SUCCESS,
    GET_LIST_SUCCESS as GET_MODULE_LIST_SUCCESS,
    START_UPDATE as START_MODULE_UPDATE,
    UPDATE_SUCCESS as UPDATE_MODULE_SUCCESS,
    CREATE_SUCCESS as CREATE_MODULE_SUCCESS,
    REMOVE_LESSON as MODULE_REMOVE_LESSON,
    MOVE as MODULE_MOVE,
    ARCHIVE_SUCCESS as ARCHIVE_MODULE_SUCCESS,
} from 'Actions/Module';

import {
    GET_SUCCESS as GET_LESSON_SUCCESS,
    GET_LIST_SUCCESS as GET_LESSON_LIST_SUCCESS,
    UPDATE_SUCCESS as UPDATE_LESSON_SUCCESS,
    CREATE_SUCCESS as CREATE_LESSON_SUCCESS,
    UPDATE_PROGRESS_SUCCESS as UPDATE_LESSON_PROGRESS_SUCCESS,
    MOVE as LESSON_MOVE,
    ARCHIVE_SUCCESS as ARCHIVE_LESSON_SUCCESS,
} from 'Actions/Lesson';

import {
    getArrayIndexByID,
} from 'Selectors/LearnMaterial';

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
};

const Courses = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         * Module Actions
         */
        case GET_MODULE_SUCCESS: {

            const module = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);

            const oldModule = course.modules[moduleIndex];

            course.modules[moduleIndex] = {
                ...oldModule,
                ...module,
            };

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case GET_MODULE_LIST_SUCCESS: {

            const modules = action.response;

            const courseID = action.courseID;

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: {
                        ...state.list[courseID],
                        modules,
                    },
                },
            };

        }
        case START_MODULE_UPDATE: {

            const courseID = action.courseID;
            const moduleID = action.moduleID;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);

            const oldModule = course.modules[moduleIndex];

            course.modules[moduleIndex] = {
                ...oldModule,
                ...action.data,
            };

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case UPDATE_MODULE_SUCCESS: {

            const module = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);

            const oldModule = course.modules[moduleIndex];

            course.modules[moduleIndex] = {
                ...oldModule,
                ...module,
            };

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case CREATE_MODULE_SUCCESS: {

            const module = action.response;

            return {
                ...state,
                list: {
                    ...state.list,
                    [module.courseId]: {
                        ...state.list[module.courseId],
                        modules: [
                            ...state.list[module.courseId].modules,
                            module,
                        ],
                    },
                },
            };


        }
        case MODULE_REMOVE_LESSON: {

            const course = state.list[action.courseID];
            const moduleIndex =
                getArrayIndexByID(course.modules, action.moduleID);
            const lessonIndex =
                getArrayIndexByID(
                    course.modules[moduleIndex].lessons, action.lessonID);

            const lessons = course.modules[moduleIndex].lessons;
            lessons.splice(lessonIndex, 1);

            course.modules[moduleIndex].lessons = lessons;

            return {
                ...state,
                list: {
                    ...state.list,
                    [action.courseID]: {
                        ...state.list[action.courseID],
                        modules: [
                            ...state.list[action.courseID].modules,
                            module,
                        ],
                    },
                },
            };

        }
        case MODULE_MOVE: {

            const {
                newOrder, courseID, moduleID,
            } = action;

            const course = state.list[courseID];
            const modules = course.modules;
            const moduleIndex =
                getArrayIndexByID(modules, moduleID);
            const module = modules[moduleIndex];

            module.order = newOrder;

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: {
                        ...state.list[courseID],
                        modules,
                    },
                },
            };

        }
        case ARCHIVE_MODULE_SUCCESS: {

            const { courseID, moduleID } = action;

            const modules = state.list[courseID].modules;
            const moduleIndex = modules
                .findIndex(module => module.id === moduleID);

            modules.splice(moduleIndex, 1);

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: {
                        ...state.list[courseID],
                        modules,
                    },
                },
            };

        }

        /* Lesson Get Actions */
        case GET_LESSON_SUCCESS: {

            const lesson = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;
            const lessonID = action.lessonID;

            const course = state.list[courseID];

            const moduleIndex = getArrayIndexByID(course.modules, moduleID);
            const lessonIndex =
                getArrayIndexByID(
                    course.modules[moduleIndex].lessons, lessonID);

            const oldLesson = course.modules[moduleIndex].lessons[lessonIndex];

            course.modules[moduleIndex].lessons[lessonIndex] = {
                ...oldLesson,
                ...lesson,
            };

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case GET_LESSON_LIST_SUCCESS: {

            const lessons = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);

            const oldLessons = course.modules[moduleIndex].lessons;

            course.modules[moduleIndex].lessons = [
                ...oldLessons,
                ...lessons,
            ];

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case UPDATE_LESSON_SUCCESS: {

            const lesson = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;
            const lessonID = action.lessonID;

            const newModuleID = lesson.moduleId;

            const course = state.list[courseID];

            if (moduleID === newModuleID) {

                const moduleIndex = getArrayIndexByID(course.modules, moduleID);

                const lessonIndex =
                    getArrayIndexByID(
                        course.modules[moduleIndex].lessons, lessonID);

                const oldLesson = course.modules[moduleIndex]
                    .lessons[lessonIndex];

                course.modules[moduleIndex].lessons[lessonIndex] = {
                    ...oldLesson,
                    ...lesson,
                };

            } else {

                const moduleIndex = getArrayIndexByID(course.modules, moduleID);
                const newModuleIndex = getArrayIndexByID(
                    course.modules, newModuleID);

                const lessonIndex =
                    getArrayIndexByID(
                        course.modules[moduleIndex].lessons, lessonID);

                course.modules[moduleIndex].lessons.splice(lessonIndex, 1);
                course.modules[newModuleIndex].lessons.push(lesson);
                // remove from old module
                // add to new module

            }

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case CREATE_LESSON_SUCCESS: {

            const lesson = action.response;

            const courseID = action.courseID;
            const moduleID = action.moduleID;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);

            const oldLessons = course.modules[moduleIndex].lessons;

            course.modules[moduleIndex].lessons = [
                ...oldLessons,
                lesson,
            ];

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case UPDATE_LESSON_PROGRESS_SUCCESS: {

            const courseID = action.courseID;
            const moduleID = action.moduleID;
            const lessonID = action.lessonID;
            const progress = action.response.progress;

            const course = state.list[courseID];
            const moduleIndex = getArrayIndexByID(course.modules, moduleID);
            const lessonIndex =
                getArrayIndexByID(
                    course.modules[moduleIndex].lessons, lessonID);

            const lesson = {
                ...course.modules[moduleIndex].lessons[lessonIndex],
                progress,
            };

            course.modules[moduleIndex].lessons[lessonIndex] = lesson;

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case LESSON_MOVE: {

            const {
                newModuleID, newOrder, courseID, moduleID, lessonID,
            } = action;

            const course = state.list[courseID];
            const oldModuleIndex =
                getArrayIndexByID(course.modules, moduleID);
            const oldModule = course.modules[oldModuleIndex];
            const oldLessonIndex =
                getArrayIndexByID(oldModule.lessons, lessonID);
            const oldLesson = oldModule.lessons[oldLessonIndex];

            const newModuleIndex =
                getArrayIndexByID(course.modules, newModuleID);

            course.modules[oldModuleIndex].lessons.splice(oldLessonIndex, 1);

            course.modules[newModuleIndex].lessons.push({
                ...oldLesson,
                order: newOrder,
            });

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: course,
                },
            };

        }
        case ARCHIVE_LESSON_SUCCESS: {

            const course = state.list[action.courseID];
            const moduleIndex =
                getArrayIndexByID(course.modules, action.moduleID);
            const lessonIndex =
                getArrayIndexByID(
                    course.modules[moduleIndex].lessons, action.lessonID);

            const lessons = course.modules[moduleIndex].lessons;
            lessons.splice(lessonIndex, 1);

            course.modules[moduleIndex].lessons = lessons;

            return {
                ...state,
                list: {
                    ...state.list,
                    [action.courseID]: course,
                },
            };

        }

        /* Course Get Actions */
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

            const course = action.response;

            return {
                ...state,
                fetching: false,
                list: {
                    ...state.list,
                    [course.id]: {
                        ...state.list[course.id],
                        ...course,
                    },
                },
            };

        }

        /* Course GetList Actions*/
        case START_GET_LIST:
            return {
                ...state,
                fetchingList: true,
                fetchError: false,
            };
        case GET_LIST_ERROR:
            return {
                ...state,
                fetchingList: false,
                fetchListError: action.response,
            };
        case GET_LIST_SUCCESS: {

            const courses = JSON.parse(JSON.stringify(action.response))
                .reduce((object, course) => {

                    object[course.id] = course;
                    return object;

                }, {});

            return {
                ...state,
                fetchingList: false,
                list: {
                    ...state.list,
                    ...courses,
                },
            };

        }

        /* Course Update Actions*/
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

            const course = action.response;
            return {
                ...state,
                updating: false,
                list: {
                    ...state.list,
                    [course.id]: {
                        ...state.list[course.id],
                        ...course,
                    },
                },
            };

        }

        /* Course Create Actions*/
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

            const course = action.response;
            return {
                ...state,
                creating: false,
                list: {
                    ...state.list,
                    [course.id]: {
                        ...state.list[course.id],
                        ...course,
                    },
                },
            };

        }

        case REMOVE_MODULE: {

            const { courseID, moduleID } = action;

            const modules = state.list[courseID].modules;
            const moduleIndex = modules
                .findIndex(module => module.id === moduleID);

            modules.splice(moduleIndex, 1);

            return {
                ...state,
                list: {
                    ...state.list,
                    [courseID]: {
                        ...state.list[courseID],
                        modules,
                    },
                },
            };

        }

        default:
            return state;

    }

};

export { Courses };
