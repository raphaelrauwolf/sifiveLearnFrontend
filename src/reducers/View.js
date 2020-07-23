
import {
    SET_STATE,
    CLEAR_STATE,
    SET_FRESH_STATE,
} from 'Actions/View';

const INITIAL_STATE = {};

/**
 * Reducer handeling the view state
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const View = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_STATE:
            return {
                ...state,
                ...action.state,
            };

        case CLEAR_STATE:
            return {};

        case SET_FRESH_STATE:
            return {
                ...action.state,
            };

        default:
            return state;

    }

};

export { View };
