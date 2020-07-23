
import { FacebookProxy } from './Proxy';

/**
 * Check if user is signed in
 * @return {Promise}
 */
export const getSigninState = () => {

    return FacebookProxy.getSigninState();

};
