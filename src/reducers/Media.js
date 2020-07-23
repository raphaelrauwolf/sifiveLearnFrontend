
import {
    START_ADD,
    ADD_PROGRESS,
    ADD_SUCCESS,
    ADD_ERROR,

    START_UPLOAD_LINK_CREATE,
    UPLOAD_LINK_CREATE_SUCCESS,
    UPLOAD_LINK_CREATE_ERROR,

    START_GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,

    START_GET,
    GET_SUCCESS,
    GET_ERROR,
} from 'Actions/Media';

const INITIAL_STATE = {
    List: {},
};

/**
 * Reducer handeling the media
 * @param {Object} state,
 * @param {Object} action
 * @return {Function}
 */
const Media = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        /* Add Media */
        case START_ADD:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.mediaID]: {
                        ...state.List[action.mediaID],
                        Adding: true,
                    },
                },
            };
        case ADD_PROGRESS:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.mediaID]: {
                        ...state.List[action.mediaID],
                        progress: action.progress,
                    },
                },
            };
        case ADD_SUCCESS: {

            const media = action.response;

            return {
                ...state,
                List: {
                    ...state.List,
                    [action.mediaID]: {
                        ...state.List[action.mediaID],
                        ...media,
                        Adding: false,
                        Added: true,
                    },
                },
            };

        }
        case ADD_ERROR:
            return {
                ...state,
                List: {
                    ...state.List,
                    [action.mediaID]: {
                        ...state.List[action.mediaID],
                        Adding: false,
                        Added: false,
                        AddError: action.response,
                    },
                },
            };

        /* CreateUloadLink Action */
        case START_UPLOAD_LINK_CREATE:
            return {
                ...state,
                CreatingUploadLink: true,
            };
        case UPLOAD_LINK_CREATE_SUCCESS: {

            const media = action.response;

            return {
                ...state,
                List: {
                    ...state.List,
                    [media.id]: {
                        ...state.List[media.id],
                        ...media,
                    },
                },
                CreatedUploadLink: true,
                CreatingUploadLink: false,
            };

        }
        case UPLOAD_LINK_CREATE_ERROR:
            return {
                ...state,
                CreatedUploadLink: false,
                CreatingUploadLink: false,
                CreateUploadLinkError: action.response,
            };

        /* Get Media */
        case START_GET:
            delete state.Fetched;
            return {
                ...state,
                Fetching: true,
            };

        case GET_SUCCESS: {

            const media = action.response;

            delete state.Fetching;
            return {
                ...state,
                Fetched: true,
                List: {
                    ...state.List,
                    [media.id]: {
                        ...state.List[media.id],
                        ...media,
                    },
                },
            };

        }

        case GET_ERROR:
            delete state.Fetching;
            return {
                ...state,
                Fetched: false,
                FetchError: action.response,
            };


        /* Get Media List */
        case START_GET_LIST:
            delete state.FetchedList;
            delete state.FetchListError;
            return {
                ...state,
                FetchingList: true,
            };

        case GET_LIST_SUCCESS:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: true,
                List: {
                    ...state.List,
                    ...action.response,
                },
            };

        case GET_LIST_ERROR:
            delete state.FetchingList;
            return {
                ...state,
                FetchedList: false,
                FetchListError: action.response,
            };

        default:
            return state;

    }

};

export { Media };
