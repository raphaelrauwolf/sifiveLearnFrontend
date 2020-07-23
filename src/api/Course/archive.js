
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Archive course
 * @param {String} courseID
 * @param {String} token
 * @return {Promise}
 */
export const archiveCourse = (courseID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}course/${courseID}/archive`;

    const requestOptions = {
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
