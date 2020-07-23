
import {
    UPDATE_OFFLINE,
    UPDATE_MOBILE,
    UPDATE_TABLET,
    UPDATE_SIZE,
    UPDATE_DEV,
} from 'Actions/App';

const INITIAL_STATE = {
    Offline: false,
    Mobile: false,
    Tablet: false,
    isDev: false,
    Size: {
        width: 0,
        height: 0,
        devicePixelRatio: 1,
    },
};

const App = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case UPDATE_OFFLINE:
            return {
                ...state,
                Offline: action.Offline,
            };

        case UPDATE_MOBILE:
            return {
                ...state,
                Mobile: action.Mobile,
            };

        case UPDATE_TABLET:
            return {
                ...state,
                Tablet: action.Tablet,
            };

        case UPDATE_SIZE:
            return {
                ...state,
                Size: {
                    ...state.Size,
                    ...action.Size,
                },
            };

        case UPDATE_DEV:
            return {
                ...state,
                isDev: action.isDev,
            };

        default:
            return state;

    }

};

export { App };
