
/**
 * Selector that returns if the notification is visible
 * @param {Object} state
 * @return {Function}
 */
export const isVisible = (state) => {

    return state.Notification.Visible;

};

/**
 * Selector that returns the notification mode
 * @param {Object} state
 * @return {Function}
 */
export const getMode = (state) => {

    return state.Notification.Mode;

};

/**
 * Selector that returns the notifications content
 * @param {Object} state
 * @return {Function}
 */
export const getContent = (state) => {

    return state.Notification.Content;

};

export default {
    isVisible,
    getContent,
    getMode,
};
