
import { INITIAL_STATE } from 'Reducers/User';

/**
 * Class handling local storage state for User
 */
class User {

    storageKey = 'Sifive_User';

    /**
     * Resetting local storage
     */
    logout() {

        localStorage.removeItem(this.storageKey);

    }

    /**
     * Function reading the state from local storage
     * @return {Object} local storage state
     */
    getState() {

        const storageState = localStorage.getItem(this.storageKey);

        if (!storageState) {

            return INITIAL_STATE;

        }

        try {

            return JSON.parse(storageState);

        } catch (e) {

            return INITIAL_STATE;

        }

    }

    /**
     * Function writing certain parts to local storage state
     * @param {Object} state current store state
     * @return {Object} local storage state
     */
    writeState(state) {

        const userStoreState = state.User;
        const storageObject = {
            ...INITIAL_STATE,
            LoggedIn: userStoreState.LoggedIn,
            CurrentUser: userStoreState.CurrentUser,
        };

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(storageObject),
        );

        return storageObject;

    }

}

const UserSubscriber = new User();

export { UserSubscriber };
