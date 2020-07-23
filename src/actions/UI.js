
export const TOGGLE_SIDEBAR = 'UI.TOGGLE_SIDEBAR';

/**
 * Set state
 * @param {Object} state
 * @return {Object}
 */
export const setSidebar = (expanded) => {

    return {
        type: TOGGLE_SIDEBAR,
        expanded
    };

};

export default {
    setSidebar,
};
