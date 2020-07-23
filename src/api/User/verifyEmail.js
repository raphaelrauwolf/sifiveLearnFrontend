
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Verify the users email
 * @param {Object} verificationCode
 * @param {String} token
 * @return {Promise}
 */
export const verifyEmail = (verificationCode, token) => {

    const endpoint = `${API_SERVER_ADDRESS}user/verify`;

    const requestOptions = {
        body: JSON.stringify({
            verificationCode,
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
