
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Update a module
 * @param {Object} data { name, description, order }
 * @param {String} courseID
 * @param {String} moduleID
 * @param {String} token
 * @return {Promise}
 */
export const updateModule = (data, courseID, moduleID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}course/${courseID}/module/${moduleID}`;

    const requestOptions = {
        body: JSON.stringify({
            ...data,
        }),
        cache: 'no-cache',
        method: 'PUT',
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
