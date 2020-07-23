
/**
 * Handle API responses and check for errors
 * @param {*} response
 * @return {Promise}
 */
export const handleResponse = (response) => {

    return response.json().then((json) => {

        if (!json) {

            json = { emptyResponse: true };

            return Promise.reject(json);

        } else if (response.ok && !json.error) {

            return json;

        } else if (json.error) {

            return Promise.reject(json.error);

        } else {

            return Promise.reject(response.error);

        }

    });

};
