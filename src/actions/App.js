
export const UPDATE_OFFLINE = 'APP.UPDATE_OFFLINE';
export const UPDATE_MOBILE = 'APP.UPDATE_MOBILE';
export const UPDATE_TABLET = 'APP.UPDATE_TABLET';
export const UPDATE_SIZE = 'APP.UPDATE_SIZE';
export const UPDATE_DEV = 'APP.UPDATE_DEV';

/**
 * Offline state update
 * @param {Boolean} Offline new online/offline state
 * @return {Object}
 */
export const updateOffline = (Offline) => {

    return {
        type: UPDATE_OFFLINE,
        Offline,
    };

};

/**
 * Mobile state update
 * @param {Boolean} Mobile when media query matches
 * @return {Object}
 */
export const updateMobile = (Mobile) => {

    return {
        type: UPDATE_MOBILE,
        Mobile,
        Tablet: !Mobile,
    };

};

/**
 * Tablet state update
 * @param {Boolean} Tablet when media query matches
 * @return {Object}
 */
export const updateTablet = (Tablet) => {

    return {
        type: UPDATE_TABLET,
        Tablet,
        Mobile: !Tablet,
    };

};

/**
 * Size update
 * @param {Number} width
 * @param {Number} height
 * @param {Number} devicePixelRatio
 * @return {Object}
 */
export const updateSize = (width, height, devicePixelRatio) => {

    return {
        type: UPDATE_SIZE,
        Size: {
            width,
            height,
            devicePixelRatio,
        },
    };

};

/**
 * updateDevFlag update
 * @param {Boolean} flag
 * @return {Object}
 */
export const updateDevFlag = (flag) => {

    return {
        type: UPDATE_DEV,
        isDev: flag,
    };

};

export default {
    updateOffline,
    updateMobile,
    updateTablet,
    updateSize,
    updateDevFlag,
};
