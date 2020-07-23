
import {
    START_CREATE,
    CREATE_SUCCESS,
    CREATE_ERROR,

    ADD_MODULE,

    ADD_LESSON,
} from 'Actions/CourseCreation';

import {
    CREATE_SUCCESS as MODULECREATION_CREATE_SUCCESS,
} from 'Actions/ModuleCreation';

export const INITIAL_STATE = {
    Course: {
        name: '',
        description: '',
    },
    Modules: [],
    UnsortedLessons: [],
};

const CourseCreation = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateCourse Actions
         */
        case START_CREATE:
            return {
                ...INITIAL_STATE,
                Creating: true,
            };
        case CREATE_SUCCESS:
            delete state.Creating;
            return {
                ...state,
                Created: true,
                Course: action.response,
            };
        case CREATE_ERROR:
            delete state.Creating;
            return {
                ...state,
                Created: false,
                CreateError: action.response,
            };

        case MODULECREATION_CREATE_SUCCESS: {

            const module = action.response;

            return {
                ...state,
                Modules: [
                    ...state.Modules,
                    module.id,
                ],
            };

        }

        /**
         *  AddModule Actions
         */
        case ADD_MODULE:
            delete state.AddingModule;
            return {
                ...state,
                Modules: [
                    ...state.Modules,
                    action.moduleID,
                ],
            };

        /**
         *  AddLesson Actions
         */
        case ADD_LESSON:
            delete state.AddingLesson;
            return {
                ...state,
                UnsortedLessons: [
                    ...state.UnsortedLessons,
                    action.lessonID,
                ],
            };

        default:
            return state;

    }

};

export { CourseCreation };
