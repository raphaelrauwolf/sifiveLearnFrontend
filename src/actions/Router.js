
import pathRegexp from 'path-to-regexp';

import {
    DESIGN_PATH, LOGIN_PATH, FORGOT_PATH, SIGNUP_PATH, VERIFY_PATH,
    PROFILE_PATH, USER_PATH, TEAM_PATH, COURSE_PATH, MODULE_PATH, LESSON_PATH,
    INVITE_PATH, RESET_PATH, TERMS_PATH, PRIVACY_PATH,
} from 'Constants/Paths';

export const UPDATE_ROUTE = 'ROUTER.UPDATE_ROUTE';

/**
 * Update location, routes and Views
 * @param {Location} location new location
 * @return {Function}
 */
export const navigateTo = (location) => {

    return (dispatch, getState) => {

        const path = location.pathname;
        const search = location.search;
        const hash = location.hash;

        const route = {
            path, search, hash,
            pathParts: path.slice(1).split('/'),
            searchParts: search.slice(1).split('&'),
        };

        loadViewIfNeeded(route);
        dispatch(updateRoute(route));

    };

};

/**
 * Update current Route
 * @param {String} Route new Route string
 * @return {Object}
 */
export const updateRoute = (Route) => {

    return {
        type: UPDATE_ROUTE,
        Route,
    };

};

/**
 * Loads required views for the new route
 * @param {Object} route new route
 */
const loadViewIfNeeded = (route) => {

    const { path } = route;

    if (pathRegexp(LOGIN_PATH).test(path)) {

        import(
            /* webpackChunkName: "LoginView" */
            /* webpackPrefetch: true */
            'Views/LoginView').then(() => {});

    } else if (pathRegexp(SIGNUP_PATH).test(path)) {

        import(
            /* webpackChunkName: "SignupView" */
            /* webpackPrefetch: true */
            'Views/SignupView').then(() => {});

    } else if (pathRegexp(FORGOT_PATH).test(path)) {

        import(
            /* webpackChunkName: "ForgotView" */
            'Views/ForgotView').then(() => {});

    } else if (pathRegexp(RESET_PATH).test(path)) {

        import(
            /* webpackChunkName: "ResetView" */
            'Views/ResetView').then(() => {});

    } else if (pathRegexp(INVITE_PATH).test(path)) {

        import(
            /* webpackChunkName: "InviteView" */
            'Views/InviteView').then(() => {});

    } else if (pathRegexp(VERIFY_PATH).test(path)) {

        import(
            /* webpackChunkName: "VerifyView" */
            'Views/VerifyView').then(() => {});

    } else if (pathRegexp(PROFILE_PATH).test(path)) {

        import(
            /* webpackChunkName: "ProfileView" */
            'Views/ProfileView').then(() => {});

    } else if (pathRegexp(USER_PATH).test(path)) {

        import(
            /* webpackChunkName: "UserView" */
            'Views/UserView').then(() => {});

    } else if (pathRegexp(TEAM_PATH).test(path)) {

        import(
            /* webpackChunkName: "TeamView" */
            'Views/TeamView').then(() => {});

    } else if (pathRegexp(COURSE_PATH).test(path)) {

        import(
            /* webpackChunkName: "CourseView" */
            'Views/CourseView').then(() => {});

    } else if (pathRegexp(MODULE_PATH).test(path)) {

        import(
            /* webpackChunkName: "ModuleView" */
            'Views/ModuleView');

    } else if (pathRegexp(LESSON_PATH).test(path)) {

        import(
            /* webpackChunkName: "LessonView" */
            'Views/LessonView').then(() => {});

    } else if (pathRegexp(DESIGN_PATH).test(path)) {

        import(
            /* webpackChunkName: "DesignView" */
            'Views/DesignView').then(() => {});

    } else if (pathRegexp(TERMS_PATH).test(path)) {

        import(
            /* webpackChunkName: "TermsView" */
            'Views/TermsView').then(() => {});

    } else if (pathRegexp(PRIVACY_PATH).test(path)) {

        import(
            /* webpackChunkName: "PrivacyView" */
            'Views/PrivacyView').then(() => {});

    } else {

        import(
            /* webpackChunkName: "HomeView" */
            /* webpackPrefetch: true */
            'Views/HomeView').then(() => {});

    }

};

export default {
    navigateTo,
    updateRoute,
};
