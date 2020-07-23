import {
    SET_COURSE_ACTIVE,
    SET_MODULE_ACTIVE,
    SET_LESSON_ACTIVE,
} from 'Actions/LearnMaterial';

export const INITIAL_STATE = {

    Course: {},
    Module: {},
    Lesson: {},

};

const Active = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_COURSE_ACTIVE:
            return {
                ...state,
                Course: action.courseID,
            };

        case SET_MODULE_ACTIVE:
            return {
                ...state,
                Module: action.moduleID,
            };

        case SET_LESSON_ACTIVE:
            return {
                ...state,
                Lesson: action.lessonID,
            };

        default:
            return state;

    }

};

export { Active };
