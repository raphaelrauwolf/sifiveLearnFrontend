
import {
    START_CREATE,
    CREATE_SUCCESS,
    CREATE_ERROR,

    ADD_LESSON,
} from 'Actions/ModuleCreation';

export const INITIAL_STATE = {
    Module: {
        id: null,
        name: '',
        description: '',
        lessons: [],
    },
    Lessons: [],
};

const ModuleCreation = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateLesson Actions
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
                Module: action.response,
            };
        case CREATE_ERROR:
            delete state.Creating;
            return {
                ...state,
                Created: false,
                CreateError: action.response,
            };

        case ADD_LESSON:
            return {
                ...state,
                Lessons: [
                    ...state.Lessons,
                    action.lessonID,
                ],
            };

        default:
            return state;

    }

};

export { ModuleCreation };
