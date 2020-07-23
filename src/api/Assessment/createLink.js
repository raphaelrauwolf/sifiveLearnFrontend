
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Create upload link
 * @param {Object} data { contentType, filename, extension }
 * @param {Object} params { lesson, course }
 * @param {String} token
 * @return {Promise}
 */
export const createUploadLink = (data, params, token) => {

    const { lesson, course } = params;

    // https://api.sifiveacademy.com/course/:courseId/module/:moduleId/lesson/:lessonId/assessment

    const endpoint = `${API_SERVER_ADDRESS}course/${course.id}/module/${lesson.moduleId}/lesson/${lesson.id}/assessment`;

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
