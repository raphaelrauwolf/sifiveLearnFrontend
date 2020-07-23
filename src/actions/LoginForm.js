
import GoogleActions from 'Actions/Google';
import FacebookActions from 'Actions/Facebook';
import UserActions from 'Actions/User';
import FormActions from 'Actions/Form';

export const START_SUBMIT = 'LOGINFORM.START_SUBMIT';
export const SUBMIT_SUCCESS = 'LOGINFORM.SUBMIT_SUCCESS';
export const SUBMIT_ERROR = 'LOGINFORM.SUBMIT_ERROR';
export const START_FORM_LOGIN = 'LOGINFORM.START_FORM_LOGIN';
export const START_GOOGLE_LOGIN = 'LOGINFORM.START_GOOGLE_LOGIN';
export const START_FACEBOOK_LOGIN = 'LOGINFORM.START_FACEBOOK_LOGIN';

/**
 * LoginForm actions to be called by a LoginForm to update redux store
 */
class LoginFormActions {

    /**
     * Send data to API login
     * @param {String} formID
     * @param {Object} auth
     * @return {Function}
     */
    submit(formID, auth) {

        const start = () => ({ type: START_SUBMIT, formID });
        const success = response =>
            ({ type: SUBMIT_SUCCESS, formID, response });
        const failure = response =>
            ({ type: SUBMIT_ERROR, formID, response });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(UserActions.login(auth))
                .then(
                    () => {

                        const state = getState();

                        dispatch(success(state.User.CurrentUser));
                        dispatch(FormActions.resetForm(formID));

                    },
                    () => {

                        const state = getState();

                        dispatch(failure(state.User.LoginError));

                    });

        };

    }

    /**
     * Start submit form
     * @todo submit form to server
     * @param {String} formID
     * @return {Function} async update for store
     */
    loginForm(formID) {

        const start = () => ({ type: START_FORM_LOGIN, formID });

        return (dispatch, getState) => {

            dispatch(start());

            const formState = getState().Form[formID];

            const formData = {
                authentication: {
                    email: formState.Email.Value,
                    password: formState.Password.Value,
                },
            };

            return dispatch(this.submit(formID, formData))
                .then(() => {})
                .catch(() => {});

        };

    }

    /**
     * Trigger Google signIn
     * @param {String} formID
     * @return {Object} update for store
     */
    loginGoogle(formID) {

        const start = () => ({ type: START_GOOGLE_LOGIN, formID });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(GoogleActions.signin()).then(() => {

                const GoogleState = getState().Google;

                const formData = {
                    authentication: {
                        email: GoogleState.email,
                        gtoken: GoogleState.token,
                    },
                };

                return dispatch(this.submit(formID, formData))
                    .then(() => {})
                    .catch(() => {});

            });

        };

    }

    /**
     * Trigger Facebook signIn
     * @param {String} formID
     * @return {Object} update for store
     */
    loginFacebook(formID) {

        const start = () => ({ type: START_FACEBOOK_LOGIN, formID });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(FacebookActions.signin()).then(() => {

                return dispatch(FacebookActions.getCurrentUser());

            }).then((response) => {

                const FacebookState = getState().Facebook;

                const formData = {
                    authentication: {
                        email: FacebookState.email,
                        fbtoken: FacebookState.token,
                    },
                };

                return dispatch(this.submit(formID, formData))
                    .then(() => {})
                    .catch(() => {});

            });

        };

    }

}

export default new LoginFormActions();
