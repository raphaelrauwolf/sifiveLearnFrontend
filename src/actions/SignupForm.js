
import GoogleActions from 'Actions/Google';
import FacebookActions from 'Actions/Facebook';
import UserActions from 'Actions/User';
import FormActions from 'Actions/Form';

import { sleep } from 'Utils/Sleep';

export const START_SUBMIT = 'SIGNUPFORM.START_SUBMIT';
export const SUBMIT_SUCCESS = 'SIGNUPFORM.SUBMIT_SUCCESS';
export const SUBMIT_ERROR = 'SIGNUPFORM.SUBMIT_ERROR';
export const START_FORM_SIGNUP = 'SIGNUPFORM.START_FORM_SIGNUP';
export const START_GOOGLE_SIGNUP = 'SIGNUPFORM.START_GOOGLE_SIGNUP';
export const START_FACEBOOK_SIGNUP = 'SIGNUPFORM.START_FACEBOOK_SIGNUP';
export const START_SUBMIT_BLOCK = 'SIGNUPFORM.START_SUBMIT_BLOCK';
export const STOP_SUBMIT_BLOCK = 'SIGNUPFORM.STOP_SUBMIT_BLOCK';

/**
 * SignupForm actions to be called by a SignupForm to update redux store
 */
class SignupFormActions {

    /**
     * Handle API login response
     * @param {String} formID
     * @param {Object} data
     * @return {Object}
     */
    submit(formID, data) {

        const start = () => ({ type: START_SUBMIT, formID });
        const success = response =>
            ({ type: SUBMIT_SUCCESS, formID, response });
        const failure = response =>
            ({ type: SUBMIT_ERROR, formID, response });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(UserActions.signup(data))
                .then(data => dispatch(success(data.response)))
                .then(data => dispatch(FormActions.resetForm(formID)))
                .catch(data =>
                    Promise.reject(dispatch(failure(data.response))));

        };

    }

    /**
     * Send data to API signup
     * @param {String} formID
     * @return {Function}
     */
    signupForm(formID) {

        const start = () => ({ type: START_FORM_SIGNUP, formID });

        return (dispatch, getState) => {

            dispatch(start());

            const formState = getState().Form[formID];

            const formData = {

                firstname: formState['Firstname'].Value,
                lastname: formState['Lastname'].Value,
                email: formState['Email'].Value,

                authentication: {

                    email: formState['Email'].Value,
                    password: formState['Password'].Value,

                },

                ...(formState['InviteCode'] && { inviteCode: formState['InviteCode'].Value }),

            };

            return dispatch(this.submit(formID, formData))
                .then(() => {})
                .catch(() => {});

        };

    }

    /**
     * Trigger Google signIn
     * @param {String} formID
     * @return {Object}
     */
    signinGoogle(formID) {

        const start = () => ({ type: START_GOOGLE_SIGNUP, formID });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(GoogleActions.signin()).then(() => {

                const GoogleState = getState().Google;

                const formData = {
                    firstname: GoogleState.firstname,
                    lastname: GoogleState.lastname,
                    email: GoogleState.email,
                    // gender: '',
                    // age: '',
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
    signinFacebook(formID) {

        const start = () => ({ type: START_FACEBOOK_SIGNUP, formID });

        return (dispatch, getState) => {

            dispatch(start());

            return dispatch(FacebookActions.signin()).then(() => {

                return dispatch(FacebookActions.getCurrentUser());

            }).then((response) => {

                const FacebookState = getState().Facebook;

                const formData = {
                    firstname: FacebookState.firstname,
                    lastname: FacebookState.lastname,
                    email: FacebookState.email,
                    // gender: '',
                    // age: '',
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

    /**
     * Stop form submits to prevent spam
     * @param {String} formID
     * @return {Object}
     */
    blockSubmit(formID) {

        return (dispatch, getState) => {

            dispatch({
                type: START_SUBMIT_BLOCK,
                formID,
            });

            sleep(1000).then(() => {

                dispatch({
                    type: STOP_SUBMIT_BLOCK,
                    formID,
                });

            });

        };

    }

}

export default new SignupFormActions();
