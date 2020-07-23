
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Fetch assessment data
 * @param {String} assessmentId
 * @param {Object} params
 * @param {String} token
 * @return {Promise}
 */
export const getAssessment = (assessmentId, { lessonId, courseId, moduleId }, token) => {

    const endpoint = `${API_SERVER_ADDRESS}course/${courseId}/module/${moduleId}/lesson/${lessonId}/assessment/${assessmentId}`;

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
