
import { GOOGLE_CLIENTID } from 'Root/settings';

/**
 * Api for handling google signin and other google related tasks
 */
class Google {

    auth2 = null;
    isReady = false;
    isSignedin = false;
    hasAccess = false;

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
                $script.src = 'https://apis.google.com/js/api:client.js?onload=gapiLoad';
                document.body.appendChild($script);

            });

        });

    }

    /**
     * Establish base google auth connection
     */
    initAuth() {

        if (!window.gapi) {

            window.gapiLoad = () => {

                this.initAuth();

            };

            return;

        }

        window.gapi.load('auth2', () => {

            this.auth2 = window.gapi.auth2.init({
                client_id: GOOGLE_CLIENTID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
            });

            this.auth2.then((response) => {

                this.isReady = true;

                if (this.getSigninState()) {

                    this.isSignedin = true;

                }

            }, (error) => {

                this.isReady = false;

            });

        });

    }

    /**
     * Trigger user sign in
     * @return {Promise}
     */
    signin() {

        return new Promise((resolve, reject) => {

            if (this.isSignedin) {

                this.getCurrentUser().then((response) => {

                    resolve({
                        ...response,
                        token: this.getToken(),
                    });

                });

            } else {

                this.auth2.signIn({}).then((response) => {

                    this.getCurrentUser().then((response) => {

                        resolve({
                            ...response,
                            token: this.getToken(),
                        });

                    });

                });

            }

        });

    }

    /**
     * Trigger user sign out
     * @return {Promise}
     */
    signout() {

        return this.auth2.signOut({});

    }

    /**
     * Check if user is signed inspect
     * @return {Boolean}
     */
    getSigninState() {

        return this.auth2.isSignedIn.get();

    }

    /**
     * Get the currently signed in user
     * @return {Object}
     */
    getCurrentUser() {

        const basicProfile = this.auth2.currentUser.get().getBasicProfile();

        return Promise.resolve({
            firstname: basicProfile.getGivenName(),
            lastname: basicProfile.getFamilyName(),
            email: basicProfile.getEmail(),
        });

    }

    /**
     * Get the id token for the signed in user
     * @return {String}
     */
    getToken() {

        return this.auth2.currentUser.get().getAuthResponse().id_token;

    }

}

export const GoogleProxy = new Google();
