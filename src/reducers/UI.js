
import {
    TOGGLE_SIDEBAR,
} from 'Actions/UI';

const INITIAL_STATE = {
    sidebarExpanded: false
};

/**
 * Reducer handeling the view state
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const UI = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarExpanded: action.expanded
            };

        default:
            return state;

    }

};

export { UI };
