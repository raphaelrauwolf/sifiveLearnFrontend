
/**
 * Upload assessment file
 * @param {File} file
 * @param {String} path
 * @param {Function} progress
 * @return {Promise}
 */
export const addAssessment = (file, path, progress = () => {}) => {

    const endpoint = path;

    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('file', file);

        const request = new XMLHttpRequest();
        request.upload.addEventListener('progress', (event) => {

            progress(event);

        }, false);
        request.upload.addEventListener('load', (event) => {

            resolve(event);

        }, false);
        request.upload.addEventListener('error', (event) => {

            reject(event);

        }, false);
        request.open('PUT', endpoint);
        request.send(file);
        console.log(request);

    });

};
