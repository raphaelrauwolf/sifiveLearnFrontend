
import {
    UPDATE_ROUTE,
} from 'Actions/Router';

const INITIAL_STATE = {
    Route: {
        path: '',
        hash: '',
        search: '',
        pathParts: [''],
        searchParts: [''],
    },
};

/**
 * Reducer handeling the location and routes
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const Router = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UPDATE_ROUTE:
            return {
                ...state,
                Route: action.Route,
            };
        default:
            return state;

    }

};

export { Router };
