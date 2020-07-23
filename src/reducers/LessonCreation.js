
import {
    START_CREATE,
    CREATE_SUCCESS,
    CREATE_ERROR,

    UPDATE_CONTENT,
    UPDATE_CONTENT_SUCCESS,
    UPDATE_CONTENT_ERROR,
} from 'Actions/LessonCreation';

export const INITIAL_STATE = {
    Lesson: {
        name: '',
        description: '',
        content: '',
    },
};

const LessonCreation = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  CreateLesson Actions
         */
        case START_CREATE:
            delete state.Created;
            delete state.Creating;
            return {
                ...INITIAL_STATE,
                Creating: true,
            };
        case CREATE_SUCCESS:
            delete state.Creating;
            return {
                ...state,
                Created: true,
                Lesson: {
                    ...state.Lesson,
                    ...action.response,
                    content: '',
                },
            };
        case CREATE_ERROR:
            delete state.Creating;
            return {
                ...state,
                Created: false,
                CreateError: action.response,
            };

        /**
         *  Update Actions
         */
        case UPDATE_CONTENT:
            delete state.Updating;
            delete state.Updated;
            return {
                ...state,
                Updating: true,
            };
        case UPDATE_CONTENT_SUCCESS:
            delete state.Updating;
            return {
                ...state,
                Updated: true,
                Lesson: {
                    ...state.Lesson,
                    ...action.data,
                },
            };
        case UPDATE_CONTENT_ERROR:
            delete state.Updating;
            return {
                ...state,
                Updated: false,
                UpdateError: action.response,
            };


        default:
            return state;

    }

};

export { LessonCreation };
