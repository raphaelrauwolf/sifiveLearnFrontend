
import { FACEBOOK_APPID } from 'Root/settings';

/**
 * Api for handling facebook signin and other facebook related tasks
 */
class Facebook {

    isReady = false;
    isSignedin = false;

    /**
     * initializing api connection
     */
    constructor() {

        this.loadJS();
        this.initAuth();


    }

    /**
     * Load Facebook sdk
     */
    loadJS() {

        window.addEventListener('load', () => {

            window.requestAnimationFrame(() => {

                const $script = document.createElement('script');
                $script.setAttribute('async', 'async');
                $script.setAttribute('defer', 'defer');
                $script.src = 'https://connect.facebook.net/en_US/sdk.js';
                document.body.appendChild($script);

            });

        });

    }

    /**
     * Establish base Facebook auth connection
     */
    initAuth() {

        window.fbAsyncInit = () => {

            window.FB.init({
                appId: FACEBOOK_APPID,
                status: true,
                version: 'v3.2',
            });

            this.FB = window.FB;

            this.isReady = true;
            this.isSignedin = false;

            this.getSigninState();

        };

    }

    /**
     * Trigger user login
     * @return {Promise}
     */
    signin() {

        return new Promise((resolve, reject) => {

            this.FB.login((response) => {

                if (response.authResponse) {

                    resolve(response);

                } else {

                    reject(response);

                }

            }, {
                return_scopes: true,
                scope: 'email',
            });

        });

    }

    /**
     * Trigger user logout
     * @return {Promise}
     */
    signout() {

        return new Promise((resolve, reject) => {

            if (!this.isSignedin) {

                resolve();

            } else {

                this.FB.logout((response) => {});

                this.FB.api('/me/permissions', 'delete', (response) => {

                    this.isSignedin = false;

                });

            }

        });

    }

    /**
     * Check if user is signed inspect
     * @return {Promise}
     */
    getSigninState() {

        return new Promise((resolve, reject) => {

            this.FB.getLoginStatus((response) => {

                if (response.status === 'connected') {

                    this.isSignedin = true;

                    this.accessToken = response.authResponse.accessToken;

                    resolve({
                        ...response,
                        isSignedin: true,
                    });

                } else if (response.status === 'not_authorized') {

                    this.isSignedin = false;

                    resolve({
                        ...response,
                        isSignedin: false,
                    });

                } else {

                    this.isSignedin = false;

                    resolve({
                        ...response,
                        isSignedin: false,
                    });

                }

            });

        });

    }

    /**
     * Get the currently signed in user
     * @return {Object}
     */
    getCurrentUser() {

        return new Promise((resolve, reject) => {

            this.FB.api('/me', { fields: 'email, first_name, last_name' }, (response) => {

                resolve(response);

            });

        });

    }

    /**
     * Get the id token for the signed in user
     * @return {String}
     */
    getToken() {

        return this.accessToken;

    }

}

export const FacebookProxy = new Facebook();
