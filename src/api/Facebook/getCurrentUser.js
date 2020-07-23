
import { FacebookProxy } from './Proxy';

/**
 * Fetch current user data
 * @return {Promise}
 */
export const getCurrentUser = () => {

    return FacebookProxy.getCurrentUser();

};
