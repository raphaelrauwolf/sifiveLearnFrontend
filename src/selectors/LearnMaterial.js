
import {
    getCourse,
} from 'Selectors/Course';
import {
    getModule,
} from 'Selectors/Module';
import {
    getLesson,
} from 'Selectors/Lesson';
/**
 * @param {Array} array
 * @param {*} id
 * @return {Number}
 */
export const getArrayIndexByID = (array, id) => {

    return array.findIndex(item => item.id == id);

};

/**
 * @param {Array} array
 * @param {*} id
 * @return {Number}
 */
export const getArrayItemByID = (array, id) => {

    return array.find(item => item.id == id);

};

/**
 * @param {Object} state
 * @return {Object}
 */
export const getActiveCourse = (state) => {

    return getCourse(state, state.LearnMaterial.Active.Course);

};

/**
 * @param {Object} state
 * @return {Object}
 */
export const getActiveModule = (state) => {

    return getModule(state, state.LearnMaterial.Active.Module);

};

/**
 * @param {Object} state
 * @return {Object}
 */
export const getActiveLesson = (state) => {

    return getLesson(state, state.LearnMaterial.Active.Course);

};

export default {
    getArrayIndexByID,
    getArrayItemByID,
    getActiveCourse,
    getActiveModule,
    getActiveLesson,
};
