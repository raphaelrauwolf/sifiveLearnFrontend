import {
    MODULE_MAIN_PATH,
    MODULE_EDIT_PATH,
    MODULE_CREATE_PATH,
} from 'Constants/Paths';

import {
    getPathParts,
    doesPathMatch,
} from 'Selectors/Router';

/**
 * Selector that returns module
 * @param {Object} state
 * @param {String} moduleID
 * @return {Boolean}
 */
export const getModule = (state, moduleID) => {

    return state.LearnMaterial.Modules.list[moduleID];

};

/**
 * Selector that returns all lessons for a module
 * @param {Object} state
 * @param {String} moduleID
 * @return {Object}
 */
export const getModuleLessons = (state, moduleID) => {

    return getModule(state, moduleID).lessons;

};

/* ROUTE RELATED SELECTORS */

/**
 * Selector that returns moduleID from path
 * @param {Object} state
 * @return {Boolean}
 */
export const getModuleID = (state) => {

    const pathParts = getPathParts(state, MODULE_MAIN_PATH);

    return pathParts !== null ? pathParts[1] : undefined;

};

/**
 * Selector that returns if on createmodule path
 * @param {Object} state
 * @return {Boolean}
 */
export const isCreatingModule = (state) => {

    return doesPathMatch(state, MODULE_CREATE_PATH);

};

/**
 * Selector that returns if on editcourse path
 * @param {Object} state
 * @return {Boolean}
 */
export const isEditingModule = (state) => {

    return !isCreatingModule(state) &&
        doesPathMatch(state, MODULE_EDIT_PATH);

};

/**
 * Selector that returns if on maincourse path
 * @param {Object} state
 * @return {Boolean}
 */
export const isShowingModule = (state) => {

    return !isCreatingModule(state) &&
        !isEditingModule(state) &&
        doesPathMatch(state, MODULE_MAIN_PATH);

};

/**
 * Selector that returns if on course view
 * @param {Object} state
 * @return {Boolean}
 */
export const isModuleViewActive = (state) => {

    return isCreatingModule(state) ||
        isEditingModule(state) ||
        isShowingModule(state);

};

export default {
    getModule,
    getModuleLessons,

    getModuleID,
    isCreatingModule,
    isEditingModule,
    isShowingModule,
    isModuleViewActive,
};
