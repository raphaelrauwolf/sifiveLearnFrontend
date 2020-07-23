
import NotificationActions from 'Actions/Notification';
import FormActions from 'Actions/Form';
import UserActions from 'Actions/User';

import {
    getFieldValue,
} from 'Selectors/Form';

export const START_SUBMIT = 'RESETFORM.START_SUBMIT';
export const SUBMIT_SUCCESS = 'RESETFORM.SUBMIT_SUCCESS';
export const SUBMIT_ERROR = 'RESETFORM.SUBMIT_ERROR';
export const START_FORM_SUBMIT = 'RESETFORM.START_FORM_SUBMIT';

/**
 * ResetForm actions to be called by a ResetForm to update redux store
 */
class ResetFormActions {

    /**
     * Send data to API login
     * @param {String} formID
     * @param {String} code
     * @return {Function}
     */
    submit(formID, code) {

        const start = () => ({ type: START_SUBMIT, formID });
        const success = response =>
            ({ type: SUBMIT_SUCCESS, formID, response });
        const failure = response =>
            ({ type: SUBMIT_ERROR, formID, response });

        return (dispatch, getState) => {

            dispatch(start());

            const state = getState();
            const password = getFieldValue(state, formID, 'Password');

            const data = {
                code,
                password,
            };

            return dispatch(UserActions.updatePassword(data))
                .then(
                    (response) => {

                        dispatch(NotificationActions.showSuccess('🔑 Password updated!'));
                        dispatch(FormActions.resetForm(formID));
                        return dispatch(success(response));

                    },
                    () => {

                        const state = getState();

                        console.log(state.User);

                        dispatch(failure('state.User.ResetPasswordError'));

                    });

        };

    }

}

export default new ResetFormActions();
