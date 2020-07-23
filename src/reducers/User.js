
import { UserSubscriber } from 'Subscribers/User';

import {
    START_GET_CURRENT, GET_CURRENT_SUCCESS, GET_CURRENT_ERROR,
    START_GET, GET_SUCCESS, GET_ERROR,
    START_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    LOGOUT,
    START_SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR,
    START_VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_ERROR,
    START_GET_PROGRESS, GET_PROGRESS_SUCCESS, GET_PROGRESS_ERROR,
    SET_ROLE,
    START_RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
    START_CHECK_RESET_CODE, CHECK_RESET_CODE_SUCCESS, CHECK_RESET_CODE_ERROR,
    START_UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_ERROR,
} from 'Actions/User';

import {
    GET_TEAM_SUCCESS,
} from 'Actions/Team';

export const INITIAL_STATE = {
    List: {},
    LoggedIn: false,
};

const User = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         * GetCurrent Actions
         */
        case START_GET_CURRENT:
            delete state.FetchedCurrent;
            delete state.FetchCurrentError;
            return {
                ...state,
                FetchingCurrent: true,
            };
        case GET_CURRENT_SUCCESS:
            delete state.FetchingCurrent;
            return {
                ...state,
                FetchedCurrent: true,
                CurrentUser: {
                    ...state.CurrentUser,
                    ...action.response,
                },
            };
        case GET_CURRENT_ERROR:
            delete state.FetchingCurrent;
            return {
                ...state,
                FetchedCurrent: false,
                FetchCurrentError: action.response,
            };

        /**
         * Get Actions
         */
        case START_GET:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.userID]: {
                        Fetching: true,
                    },
                },
            };
        case GET_SUCCESS:
            delete state.List[action.userID].Fetching;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.userID]: {
                        ...action.response,
                        Fetched: true,
                    },
                },
            };
        case GET_ERROR:
            delete state.List[action.userID].Fetching;
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.userID]: {
                        Fetched: false,
                        FetchError: action.response,
                    },
                },
            };

        /**
         * Login Actions
         */
        case START_LOGIN:
            delete state.LoggedIn;
            delete state.LoginError;
            return {
                ...state,
                LoggingIn: true,
            };
        case LOGIN_SUCCESS:
            delete state.LoggingIn;
            return {
                ...state,
                LoggedIn: true,
                CurrentUser: {
                    ...state.CurrentUser,
                    ...action.response,
                },
            };
        case LOGIN_ERROR:
            delete state.LoggingIn;
            return {
                ...state,
                LoggedIn: false,
                LoginError: action.response,
            };

        /**
         * Logout Actions
         */
        case LOGOUT:
            UserSubscriber.logout();
            return INITIAL_STATE;

        /**
         * Signup Actions
         */
        case START_SIGNUP:
            delete state.SignedUp;
            delete state.SignupError;
            return {
                ...state,
                SigningUp: true,
            };
        case SIGNUP_SUCCESS:
            delete state.SigningUp;
            return {
                ...state,
                SignedUp: true,
                LoggedIn: true,
                CurrentUser: {
                    ...state.CurrentUser,
                    ...action.response,
                },
            };
        case SIGNUP_ERROR:
            delete state.SigningUp;
            return {
                ...state,
                SignedUp: false,
                SignupError: action.response,
            };

        /**
         * VerifyEmail Actions
         */
        case START_VERIFY_EMAIL:
            return {
                ...state,
                VerifyingEmail: true,
            };
        case VERIFY_EMAIL_SUCCESS:
            delete state.VerifyingEmail;
            return {
                ...state,
                VerifiedEmail: true,
                CurrentUser: {
                    ...state.CurrentUser,
                    isEmailVerified: true,
                },
            };
        case VERIFY_EMAIL_ERROR:
            delete state.VerifyingEmail;
            return {
                ...state,
                VerifiedEmail: false,
                VerifyEmailError: action.response,
            };

        /**
         * GetProgress Actions
         */
        case START_GET_PROGRESS: {

            const { userID } = action;
            const user = {
                ...state.List[userID],
                FetchingProgress: true,
                FetchedProgress: false,
                FetchProgressError: false,
            };

            return {
                ...state,
                List: {
                    ...state.List,
                    [userID]: user,
                },
            };

        }

        case GET_PROGRESS_SUCCESS: {

            const { userID } = action;
            const user = {
                ...state.List[userID],
                FetchingProgress: false,
                FetchedProgress: true,
            };

            user.progress = action.response.map((course) => {

                const modules = course.modules.map((module) => {

                    const lessons = module.lessons.map((lesson) => {

                        return {
                            id: lesson.id,
                            progress: lesson.progress,
                        };

                    });

                    return {
                        id: module.id,
                        progress: module.progress,
                        lessons,
                    };

                });

                return {
                    id: course.id,
                    progress: course.progress,
                    modules,
                };

            });

            return {
                ...state,
                List: {
                    ...state.List,
                    [userID]: user,
                },
            };

        }
        case GET_PROGRESS_ERROR: {

            const { userID } = action;
            const user = {
                ...state.List[userID],
                FetchingProgress: false,
                FetchedProgress: false,
                FetchProgressError: action.response,
            };

            return {
                ...state,
                List: {
                    ...state.List,
                    [userID]: user,
                },
            };

        }

        /**
         * Reset Password Actions
         */
        case START_RESET_PASSWORD:
            return {
                ...state,
                ResettingPassword: true,
                ResettedPassword: false,
                ResetPasswordError: false,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                ResettingPassword: false,
                ResettedPassword: true,
            };
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                ResettingPassword: false,
                ResettedPassword: false,
                ResetPasswordError: action.response,
            };

        /**
         * Check Reset Code Actions
         */
        case START_CHECK_RESET_CODE:
            return {
                ...state,
                CheckingResetCode: true,
                CheckedResetCode: false,
                CheckResetCodeError: false,
            };
        case CHECK_RESET_CODE_SUCCESS:
            return {
                ...state,
                CheckingResetCode: false,
                CheckedResetCode: true,
            };
        case CHECK_RESET_CODE_ERROR:
            return {
                ...state,
                CheckingResetCode: false,
                CheckedResetCode: false,
                CheckResetCodeError: action.response,
            };

        /**
         * Update Password Actions
         */
        case START_UPDATE_PASSWORD:
            return {
                ...state,
                UpdatingPassword: true,
                UpdatedPassword: false,
                UpdatePasswordError: false,
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                UpdatingPassword: false,
                UpdatedPassword: true,
            };
        case UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                UpdatingPassword: false,
                UpdatedPassword: false,
                UpdatePasswordError: action.response,
            };

        /**
         * Role Actions
         */
        case SET_ROLE:
            return {
                ...state,
                CurrentUser: {
                    ...state.CurrentUser,
                    role: action.role,
                },
            };

        /**
         * Team Actions
         */
        case GET_TEAM_SUCCESS: {

            const teamUsers = action.response.users;
            const users = state.List;

            teamUsers.forEach((teamUser) => {

                users[teamUser.id] = {
                    ...users[teamUser.id],
                    ...teamUser,
                };

            });

            return {
                ...state,
                List: users,
            };

        }

        default:
            return state;
    }

};

export { User };
