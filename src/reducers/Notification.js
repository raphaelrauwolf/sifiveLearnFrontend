
import {
    ERROR_MODE,
} from 'Constants/Notification';

import {
    SHOW,
    HIDE,
} from 'Actions/Notification';

const INITIAL_STATE = {
    Visible: false,
    Mode: ERROR_MODE,
    Content: '',
};

const Notification = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SHOW:

            return {
                ...state,
                Visible: true,
                Mode: action.mode,
                Content: action.content,
            };

        case HIDE:

            return {
                ...state,
                Visible: false,
            };

        default:
            return state;

    }

};

export { Notification };
