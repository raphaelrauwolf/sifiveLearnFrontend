
import { GoogleProxy } from './Proxy';

/**
 * Fetch current user data
 * @return {Promise}
 */
export const getCurrentUser = () => {

    return GoogleProxy.getCurrentUser();

};
