
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Accept an invite
 * @param {String} code
 * @param {String} token
 * @return {Promise}
 */
export const acceptInvite = (code, token) => {

    const endpoint = `${API_SERVER_ADDRESS}invite/accept`;

    const requestOptions = {
        body: JSON.stringify({
            code,
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
