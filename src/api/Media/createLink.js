
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Create upload link
 * @param {Obejct} data { contentType, filename, extension }
 * @param {String} token
 * @return {Promise}
 */
export const createUploadLink = (data, token) => {

    const endpoint = `${API_SERVER_ADDRESS}media`;

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
