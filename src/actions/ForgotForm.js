
import NotificationActions from 'Actions/Notification';
import FormActions from 'Actions/Form';
import UserActions from 'Actions/User';

export const START_SUBMIT = 'FORGOTFORM.START_SUBMIT';
export const SUBMIT_SUCCESS = 'FORGOTFORM.SUBMIT_SUCCESS';
export const SUBMIT_ERROR = 'FORGOTFORM.SUBMIT_ERROR';
export const START_FORM_SUBMIT = 'FORGOTFORM.START_FORM_SUBMIT';

/**
 * ForgotForm actions to be called by a ForgotForm to update redux store
 */
class ForgotFormActions {

    /**
     * Send data to API login
     * @param {String} formID
     * @param {Object} data
     * @return {Function}
     */
    submit(formID) {

        const start = () => ({ type: START_SUBMIT, formID });
        const success = response =>
            ({ type: SUBMIT_SUCCESS, formID, response });
        const failure = response =>
            ({ type: SUBMIT_ERROR, formID, response });

        return (dispatch, getState) => {

            dispatch(start());

            const email = getState().Form[formID].Email.Value;

            return dispatch(UserActions.resetPassword({ email }))
                .then(
                    (response) => {

                        dispatch(NotificationActions.showSuccess('✉️ Email sent!'));
                        dispatch(FormActions.resetForm(formID));
                        return dispatch(success(response));

                    },
                    () => {

                        const state = getState();

                        dispatch(failure(state.User.ResetPasswordError));

                    });

        };

    }

}

export default new ForgotFormActions();
