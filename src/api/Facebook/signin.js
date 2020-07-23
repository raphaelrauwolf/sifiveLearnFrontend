
import { FacebookProxy } from './Proxy';

/**
 * Signin using Facebook Api
 * @return {Promise}
 */
export const signin = () => {

    return FacebookProxy.signin();

};
