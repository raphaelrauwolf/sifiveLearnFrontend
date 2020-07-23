
const SETTINGS = {
    LOCAL_PRODUCTION: false, // flag to force PRODUCTION on local
};

/* eslint-disable-next-line no-undef */
if (__PRODUCTION__ || (!__STAGING__ && SETTINGS.LOCAL_PRODUCTION)) {

    SETTINGS.PRODUCTION = true;
    SETTINGS.API_SERVER_ADDRESS = 'xxx';
    SETTINGS.API_KEY = 'xxx';
    SETTINGS.GOOGLE_CLIENTID = 'xxx';
    SETTINGS.FACEBOOK_APPID = 'xxx';

} else if (__STAGING__) {// eslint-disable-line no-undef

    SETTINGS.STAGING = true;
    SETTINGS.API_SERVER_ADDRESS = 'xxx';
    SETTINGS.API_KEY = 'xxx';
    SETTINGS.GOOGLE_CLIENTID = 'xxx';
    SETTINGS.FACEBOOK_APPID = 'xxx';

} else {

    SETTINGS.LOCAL = true;
    SETTINGS.API_SERVER_ADDRESS = 'xxx';
    SETTINGS.API_KEY = 'xxx';
    SETTINGS.GOOGLE_CLIENTID = 'xxx';
    SETTINGS.FACEBOOK_APPID = 'xxx';

}

export default SETTINGS;
export const API_SERVER_ADDRESS = SETTINGS.API_SERVER_ADDRESS;
export const API_KEY = SETTINGS.API_KEY;
export const GOOGLE_CLIENTID = SETTINGS.GOOGLE_CLIENTID;
export const FACEBOOK_APPID = SETTINGS.FACEBOOK_APPID;
