
import {
    LESSON_PATH,
    LESSON_MAIN_PATH,
    LESSON_EDIT_PATH,
    LESSON_CREATE_PATH,
} from 'Constants/Paths';

import {
    getPathParts,
    doesPathMatch,
} from 'Selectors/Router';

import {
    getModule,
} from 'Selectors/Module';

/**
 * Selector that returns all lessons
 * @param {Object} state
 * @return {Object}
 */
export const getLessons = (state) => {

    return state.LearnMaterial.Lessons.list;

};

/**
 * Selector that returns lesson
 * @param {Object} state
 * @param {String} lessonID
 * @return {Object}
 */
export const getLesson = (state, lessonID) => {

    return state.LearnMaterial.Lessons.list[lessonID];

};


/**
 * Check if getLesson is required
 * @param  {Object} state
 * @param  {String} lessonID
 * @return {Boolean}
 */
export const shouldGetLesson = (state, lessonID) => {

    return !isFetchingLesson(state, lessonID) &&
        (
            !(lessonID in state.LearnMaterial.Lessons.list) ||
            typeof getLesson(state, lessonID).content === 'undefined'
        );

};

/**
 * Check if lesson is being fetched
 * @param  {[type]} state [description]
 * @param  {[type]} lessonID [description]
 * @return {Boolean} [description]
 */
export const isFetchingLesson = (state, lessonID) => {

    return state.LearnMaterial.Lessons.fetching;

};

/**
 * Get the module id of a lesson
 * @param  {Object} state
 * @param  {String} lessonID
 * @return {String}
 */
export const getLessonModuleID = (state, lessonID) => {

    return (lessonID in state.LearnMaterial.Lessons.list) &&
        getLesson(state, lessonID).moduleId;

};

/**
 * Get the course id of a lesson
 * @param  {Object} state
 * @param  {String} lessonID
 * @return {String}
 */
export const getLessonCourseID = (state, lessonID) => {

    return (lessonID in state.LearnMaterial.Lessons.list) &&
        getModule(state, getLessonModuleID(state, lessonID)).courseId;

};

/* ROUTE RELATED SELECTORS */

/**
 * Selector that returns lessonID from path
 * @param {Object} state
 * @return {Boolean}
 */
export const getLessonID = (state) => {

    const pathParts = getPathParts(state, LESSON_PATH);

    return pathParts !== null ? pathParts[1] : undefined;

};

/**
 * Selector that returns if on createlesson path
 * @param {Object} state
 * @return {Boolean}
 */
export const isCreatingLesson = (state) => {

    return doesPathMatch(state, LESSON_CREATE_PATH);

};

/**
 * Selector that returns if on editlesson path
 * @param {Object} state
 * @return {Boolean}
 */
export const isEditingLesson = (state) => {

    return !isCreatingLesson(state) &&
        doesPathMatch(state, LESSON_EDIT_PATH);

};

/**
 * Selector that returns if on mainlesson path
 * @param {Object} state
 * @return {Boolean}
 */
export const isShowingLesson = (state) => {

    return !isCreatingLesson(state) &&
        !isEditingLesson(state) &&
        doesPathMatch(state, LESSON_MAIN_PATH);

};

/**
 * Selector that returns if on lesson view
 * @param {Object} state
 * @return {Boolean}
 */
export const isLessonViewActive = (state) => {

    return isCreatingLesson(state) ||
        isEditingLesson(state) ||
        isShowingLesson(state);

};

export default {
    getLessons,
    getLesson,
    shouldGetLesson,
    isFetchingLesson,
    getLessonModuleID,
    getLessonCourseID,
    getLessonID,
    isCreatingLesson,
    isEditingLesson,
    isShowingLesson,
    isLessonViewActive,
};
