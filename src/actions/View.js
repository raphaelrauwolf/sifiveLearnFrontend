
export const SET_STATE = 'VIEW.SET_STATE';
export const CLEAR_STATE = 'VIEW.CLEAR_STATE';
export const SET_FRESH_STATE = 'VIEW.SET_FRESH_STATE';

/**
 * Set state
 * @param {Object} state
 * @return {Object}
 */
export const setState = (state) => {

    return {
        type: SET_STATE,
        state,
    };

};

/**
 * Clear state
 * @param {Object} state
 * @return {Object}
 */
export const clearState = () => {

    return {
        type: CLEAR_STATE,
    };

};

/**
 * Set fresh state
 * @param {Object} state
 * @return {Object}
 */
export const setFreshState = (state) => {

    return {
        type: SET_FRESH_STATE,
        state,
    };

};

export default {
    setState,
    clearState,
    setFreshState,
};
