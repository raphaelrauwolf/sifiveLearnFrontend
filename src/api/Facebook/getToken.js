
import { FacebookProxy } from './Proxy';

/**
 * Get current auth2 token
 * @return {Promise}
 */
export const getToken = () => {

    return FacebookProxy.getToken();

};
