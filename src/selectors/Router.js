
import pathRegexp from 'path-to-regexp';

/**
 * Selector that returns a path art
 * @param {Object} state
 * @param {Number} index
 * @return {Function}
 */
export const getPath = (state) => {

    return state.Router.Route.path;

};

/**
 * Selector that returns a path part
 * @param {Object} state
 * @param {Number} index
 * @return {Function}
 */
export const getPathPart = (state, index) => {

    return state.Router.Route.pathParts[index];

};

/**
 * Selector that returns path parts by path
 * @param {Object} state
 * @param {String} path
 * @return {Function}
 */
export const getPathParts = (state, path) => {

    return pathRegexp(path).exec(state.Router.Route.path);

};

/**
 * Selector that returns if path matches regexp
 * @param {Object} state
 * @param {String} path
 * @return {Function}
 */
export const doesPathMatch = (state, path) => {

    return pathRegexp(path).test(state.Router.Route.path);

};

/**
 * Selector that returns if path matches regexp
 * @param {Object} state
 * @param {String} hash
 * @return {Function}
 */
export const hasHash = (state, hash) => {

    return state.Router.Route.hash.indexOf(hash) > -1;

};

export default {
    getPath,
    getPathPart,
    getPathParts,
    doesPathMatch,
    hasHash,
};
