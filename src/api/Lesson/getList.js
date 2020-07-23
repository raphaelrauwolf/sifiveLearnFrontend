
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Fetch lesson list for a module
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} token
 * @return {Promise}
 */
export const getLessonList = (courseID, moduleID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}course/${courseID}/module/${moduleID}/lesson`;

    const requestOptions = {
        cache: 'no-cache',
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'token': token,
        },
    };

    return fetch(endpoint, requestOptions)
        .then(handleResponse)
        .then(json => json)
        .catch(error => Promise.reject(error));

};
