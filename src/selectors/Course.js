
import {
    COURSE_PATH,
    COURSE_MAIN_PATH,
    COURSE_EDIT_PATH,
    COURSE_CREATE_PATH,
} from 'Constants/Paths';

import {
    getPathParts,
    doesPathMatch,
} from 'Selectors/Router';

/**
 * Selector that returns all courses
 * @param {Object} state
 * @return {Object}
 */
export const getCourses = (state) => {

    return state.LearnMaterial.Courses.list;

};

/**
 * Selector that returns course
 * @param {Object} state
 * @param {String} courseID
 * @return {Boolean}
 */
export const getCourse = (state, courseID) => {

    return state.LearnMaterial.Courses.list[courseID];

};

/**
 * Selector that returns course modules
 * @param {Object} state
 * @param {String} courseID
 * @return {Boolean}
 */
export const getCourseModules = (state, courseID) => {

    return state.LearnMaterial.Courses.list[courseID].modules;

};

/**
 * Check if getCourse is required
 * @param  {Object} state
 * @param  {String} courseID
 * @return {Boolean}
 */
export const shouldGetCourse = (state, courseID) => {

    return courseID in state.LearnMaterial.Courses.list;

};

/**
 * Selector that returns if the course list is being fetched
 * @param {Object} state
 * @return {Boolean}
 */
export const isFetchingList = (state) => {

    return state.LearnMaterial.Courses.fetchingList;

};

/**
 * Check if getCourseList is required
 * @param  {Object} state
 * @return {Boolean}
 */
export const shouldGetCourseList = (state) => {

    return Object.values(state.LearnMaterial.Courses.list).length <= 0 &&
        !state.LearnMaterial.Courses.fetchingList;

};

/**
 * Selector that returns courselist fetch error
 * @param {Object} state
 * @return {Object}
 */
export const getFetchListError = (state) => {

    return state.LearnMaterial.Courses.fetchListError;

};

/* ROUTE RELATED SELECTORS */

/**
 * Selector that returns courseID from path
 * @param {Object} state
 * @return {Boolean}
 */
export const getCourseID = (state) => {

    const pathParts = getPathParts(state, COURSE_PATH);

    return pathParts !== null ? pathParts[1] : undefined;

};

/**
 * Selector that returns if on createcourse path
 * @param {Object} state
 * @return {Boolean}
 */
export const isCreatingCourse = (state) => {

    return doesPathMatch(state, COURSE_CREATE_PATH);

};

/**
 * Selector that returns if on editcourse path
 * @param {Object} state
 * @return {Boolean}
 */
export const isEditingCourse = (state) => {

    return !isCreatingCourse(state) &&
        doesPathMatch(state, COURSE_EDIT_PATH);

};

/**
 * Selector that returns if on maincourse path
 * @param {Object} state
 * @return {Boolean}
 */
export const isShowingCourse = (state) => {

    return !isCreatingCourse(state) &&
        !isEditingCourse(state) &&
        doesPathMatch(state, COURSE_MAIN_PATH);

};

/**
 * Selector that returns if on course view
 * @param {Object} state
 * @return {Boolean}
 */
export const isCourseViewActive = (state) => {

    return isCreatingCourse(state) ||
        isEditingCourse(state) ||
        isShowingCourse(state);

};

export default {
    getCourses,
    shouldGetCourseList,
    getCourse,
    shouldGetCourse,
    isFetchingList,
    getCourseModules,
    getFetchListError,
    getCourseID,
    isCreatingCourse,
    isShowingCourse,
    isEditingCourse,
    isCourseViewActive,
};
