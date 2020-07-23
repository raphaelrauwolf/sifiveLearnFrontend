
import { sleep } from 'Utils/Sleep';

import {
    SUCCESS_MODE,
    WARNING_MODE,
    ERROR_MODE,
} from 'Constants/Notification';

export const SHOW = 'NOTIFICATION.SHOW';
export const HIDE = 'NOTIFICATION.HIDE';

/**
 * Show notification
 * @param {String} content
 * @param {String} mode
 * @return {Function}
 */
export const show = (content, mode = '') => {

    const start = () => ({ type: SHOW, mode, content });

    return (dispatch, getState) => {

        dispatch(start());

        return sleep(3000).then(() => dispatch(hide()));

    };

};

/**
 * Show success notification
 * @param {String} content
 * @return {Function}
 */
export const showSuccess = (content) => {

    return (dispatch, getState) => {

        return dispatch(show(content, SUCCESS_MODE));

    };

};

/**
 * Show error notification
 * @param {String} content
 * @return {Function}
 */
export const showError = (content) => {

    return (dispatch, getState) => {

        return dispatch(show(content, ERROR_MODE));

    };

};

/**
 * Show warn notification
 * @param {String} content
 * @return {Function}
 */
export const showWarning = (content) => {

    return (dispatch, getState) => {

        return dispatch(show(content, WARNING_MODE));

    };

};

/**
 * Hide notification
 * @return {Function}
 */
export const hide = () => {

    const hide = () => ({ type: HIDE });

    return hide();

};

export default {
    show,
    showSuccess,
    showError,
    showWarning,
    hide,
};
