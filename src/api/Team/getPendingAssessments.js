
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Fetch team data
 * @param {String} teamID
 * @param {String} token
 * @return {Promise}
 */
export const getPendingAssessments = (teamID, token) => {

    const endpoint = `${API_SERVER_ADDRESS}team/${teamID}/assessment`;

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
