

import {
    CREATE_TEAM_INVITE_SUCCESS,
} from 'Actions/Team';

import {
    START_GET, GET_SUCCESS, GET_ERROR,
    START_ACCEPT, ACCEPT_SUCCESS, ACCEPT_ERROR,
    START_GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR,
    START_UPDATE, UPDATE_SUCCESS, UPDATE_ERROR,
    SAVE_INVITE_ID, CLEAR_SAVED_INVITE_ID,
} from 'Actions/Invite';

export const INITIAL_STATE = {
    List: [],
};

const Invite = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /**
         *  GetInvite Actions
         */
        case START_GET:
            delete state.Fetched;
            delete state.FetchError;
            return {
                ...state,
                Fetching: true,
            };
        case GET_SUCCESS:
            delete state.Fetching;
            return {
                ...state,
                Fetched: false,
                List: {
                    ...state.List,
                    [action.inviteID]: {
                        ...action.response,
                    },
                },
            };
        case GET_ERROR:
            delete state.Fetching;
            return {
                ...state,
                Fetched: false,
                FetchError: action.response,
            };

        /**
         *  AcceptInvite Actions
         */
        case START_ACCEPT:
            delete state.Accepted;
            delete state.AcceptError;
            return {
                ...state,
                Accepting: true,
            };

        case ACCEPT_SUCCESS:
            delete state.Accepting;
            return {
                ...state,
                Accepted: true,
                List: {
                    ...state.List,
                    [action.inviteID]: {
                        ...action.response,
                    },
                },
            };

        case ACCEPT_ERROR:
            delete state.Accepting;
            return {
                ...state,
                Accepted: true,
                AcceptError: action.response,
            };

            /**
         * GetList Actions
         */

        case START_GET_LIST:
            return {
                ...state,
                FetchingList: true,
            };
        case GET_LIST_SUCCESS:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: true,
                List: [
                    ...state.List,
                    ...action.response,
                ],
            };
        case GET_LIST_ERROR:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: false,
                FetchListError: action.response,
            };

        case CREATE_TEAM_INVITE_SUCCESS:
            return {
                ...state,
                List: [
                    ...state.List,
                    action.response,
                ],
            };

        /**
         * Update course actions
         */
        case START_UPDATE: {

            const inviteIndex = state.List
                .findIndex(invite => invite.id === action.inviteID);
            const invite = {
                ...state.List[inviteIndex],
                Updating: true,
                Updated: false,
                UpdateError: false,
            };
            state.List[inviteIndex] = invite;
            return state;

        }
        case UPDATE_SUCCESS: {

            const inviteIndex = state.List
                .findIndex(invite => invite.id === action.inviteID);
            const invite = {
                ...state.List[inviteIndex],
                ...action.response,
                Updating: false,
                Updated: true,
                UpdateError: false,
            };
            state.List[inviteIndex] = invite;
            return state;

        }
        case UPDATE_ERROR: {

            const inviteIndex = state.List
                .findIndex(invite => invite.id === action.inviteID);
            const invite = {
                ...state.List[inviteIndex],
                Updating: false,
                Updated: false,
                UpdateError: action.response,
            };
            state.List[inviteIndex] = invite;
            return state;

        }

        case SAVE_INVITE_ID:
            return {
                ...state,
                SavedID: action.inviteID,
            };

        case CLEAR_SAVED_INVITE_ID:
            delete state.SavedID;
            return {
                ...state,
            };

        default:
            return state;

    }

};

export { Invite };
