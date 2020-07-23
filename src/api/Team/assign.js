
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Assign course
 * @param {String} teamID
 * @param {String} courseID
 * @param {String} token
 * @return {Promise}
 */
export const assignCourse = (teamID, courseID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}team/${teamID}/course/${courseID}`;

    const requestOptions = {
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
