
export const SET_COURSE_ACTIVE = 'LEARNMATERIAL.SET_COURSE_ACTIVE';
export const SET_MODULE_ACTIVE = 'LEARNMATERIAL.SET_MODULE_ACTIVE';
export const SET_LESSON_ACTIVE = 'LEARNMATERIAL.SET_LESSON_ACTIVE';

/**
 * Set Course active
 * @param {Object} courseID
 * @return {Object}
 */
export const setCourseActive = (courseID) => {

    return {
        type: SET_COURSE_ACTIVE,
        courseID,
    };

};

/**
 * Set Course active
 * @param {Object} moduleID
 * @return {Object}
 */
export const setModuleActive = (moduleID) => {

    return {
        type: SET_MODULE_ACTIVE,
        moduleID,
    };

};

/**
 * Set Course active
 * @param {Object} lessonID
 * @return {Object}
 */
export const setLessonActive = (lessonID) => {

    return {
        type: SET_LESSON_ACTIVE,
        lessonID,
    };

};

export default {
    setCourseActive,
    setModuleActive,
    setLessonActive,
};
