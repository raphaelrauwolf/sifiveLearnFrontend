
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Get list of uploaded media
 * @param {String} teamId
 * @param {String} token
 * @return {Promise}
 */
export const getAssessmentStats = (teamId, token) => {

    const endpoint = `${API_SERVER_ADDRESS}team/${teamId}/assessments/stats`;

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
