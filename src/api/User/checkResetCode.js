
import {
    API_SERVER_ADDRESS,
    API_KEY,
} from 'Root/settings';

import { handleResponse } from 'Api/handleResponse';

/**
 * Check password reset code
 * @param {String} code
 * @return {Promise}
 */
export const checkPasswordResetCode = (code) => {

    const endpoint = `${API_SERVER_ADDRESS}user/resetpassword/${code}`;

    const requestOptions = {
        cache: 'no-cache',
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
    };

    return fetch(endpoint, requestOptions)
        .then(handleResponse)
        .then(json => json)
        .catch(error => Promise.reject(error));

};
