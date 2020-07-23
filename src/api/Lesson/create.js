
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Create new lesson
 * @param {Object} data { name, description, content, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} token
 * @return {Promise}
 */
export const createLesson = (data, courseID, moduleID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}course/${courseID}/module/${moduleID}/lesson`;

    const requestOptions = {
        body: JSON.stringify({
            ...data,
        }),
        cache: 'no-cache',
        method: 'POST',
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
