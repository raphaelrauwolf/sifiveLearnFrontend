
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';
import Router from 'Utils/Router';

// Redux Actions
import ViewActions from 'Actions/View';
import CourseActions from 'Actions/Course';
import ModuleActions from 'Actions/Module';
import LessonActions from 'Actions/Lesson';
import NotificationActions from 'Actions/Notification';

// Redux Selectors
import { getCourse } from 'Selectors/Course';
import { getLesson } from 'Selectors/Lesson';
import { getViewState } from 'Selectors/View';

// Components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Course/CourseNaming';
import 'Components/Module/ModuleNaming';
import 'Components/Lesson/LessonComposing';

// Factories
import { overviewFactory } from './Factories/overview';
import { topBarFactory } from './Factories/topBar';

import { getStyles } from './Styles';

// Action states
const OVERVIEW = 'ACTION.OVERVIEW';
const NAMING = 'ACTION.NAMING';
const CREATING_MODULE = 'ACTION.CREATING_MODULE';
const CREATING_LESSON = 'ACTION.CREATING_LESSON';
const EDITING_MODULE = 'ACTION.EDITING_MODULE';
const EDITING_LESSON = 'ACTION.EDITING_LESSON';

/**
 * CourseCreate LitElement
 * template
 */
@customElement('course-create')
class CourseCreate extends ConnectedComponent {

    @property({ type: String })
    action = NAMING;

    @property({ type: Object })
    course = {};

    _didCreate = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * @return {String}  html output
     */
    render() {

        switch (this.action) {

            case OVERVIEW:
                return overviewFactory(
                    this.course, ::this.nameCourse, ::this.stopEditing,
                    ::this.addLessonToModule,
                    ::this.createLesson, ::this.editLesson,
                    ::this.deleteLesson, ::this.sortLesson,
                    ::this.createModule, ::this.editModule,
                    ::this.deleteModule, ::this.sortModule,
                );

            case NAMING:
                return html`
                    <course-naming
                        .course=${this.course}
                        @continue=${this.onNamingContinue}
                    ></course-naming>`;

            case CREATING_MODULE:
                return html`
                    ${topBarFactory(this.onTopBarBackClick)}
                    <module-naming
                        @continue=${this.onModuleCreatingContinue}
                    ></module-naming>`;

            case CREATING_LESSON:
                return html`
                    ${topBarFactory(this.onTopBarBackClick, true)}
                    <lesson-composing
                        .course=${this.course}
                        .module=${this._module}
                    ></lesson-composing>`;

            case EDITING_MODULE:
                return html`
                    ${topBarFactory(this.onTopBarBackClick)}
                    <module-naming
                        .module=${this._module}
                        @continue=${this.onModuleNamingContinue}
                    ></module-naming>`;

            case EDITING_LESSON:
                return html`
                    ${topBarFactory(this.onTopBarBackClick, true)}
                    <lesson-composing
                        .course=${this.course}
                        .module=${this._module}
                        .lesson=${this._lesson}
                    ></lesson-composing>`;

        }

        return html`<!-- CourseCreate Component -->`;

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this._viewState = getViewState(state);

        this._courseID = this._viewState.courseID;

        if (this._courseID) {

            this.course = {
                ...getCourse(state, this._courseID),
            };

        }

        if (this._lesson) {

            this._lesson = {
                ...this._lesson,
                ...getLesson(state, this._lesson.id),
            };

        }

    }

    /**
     * Stop editing the current course
     */
    stopEditing() {

        this.store.dispatch(
            ViewActions.setState({
                isEditing: false,
            })
        );

    }

    /**
     * Name current course
     */
    nameCourse() {

        this.action = NAMING;

    }

    /**
     * Add a lesson to empty module
     * @param {Object} newModule
     * @param {Object} module
     * @param {Object} lesson
     */
    addLessonToModule(newModule, module, lesson) {

        this.store.dispatch(
            LessonActions.moveLesson(
                newModule.id, 5000,
                this.course.id, module.id, lesson.id,
            ));

    }

    /**
     * Create module in current course
     */
    createModule() {

        this.action = CREATING_MODULE;

    }

    /**
     * Edit module
     * @param  {Object} module
     */
    editModule(module) {

        this._module = module;
        this.action = EDITING_MODULE;

    }

    /**
     * Delete module
     * @param {Object}  module
     */
    deleteModule(module) {

        this.store.dispatch(ModuleActions.removeModule(
            this.course.id, module.id));

    }

    /**
     * Delete module
     * @param {Object}  module
     * @param {String}  targetIndex
     * @param {Boolean} isBefore
     */
    sortModule(module, targetIndex, isBefore = false) {

        const targetModule = this.course.modules[targetIndex];

        let newOrder = module.order;

        if (isBefore) {

            if (targetIndex <= 0) {

                newOrder = targetModule.order / 2 - 1000;

            } else {

                const neighbourModule = this.course.modules[targetIndex - 1];
                newOrder = neighbourModule.order +
                    (targetModule.order - neighbourModule.order) / 2;

            }

        } else {

            if (targetIndex >= this.course.modules.length - 1) {

                newOrder = targetModule.order * 2;

            } else {

                const neighbourModule = this.course.modules[targetIndex + 1];
                newOrder = targetModule.order +
                    (neighbourModule.order - targetModule.order) / 2;

            }

        }

        this.store.dispatch(ModuleActions.moveModule(
            newOrder, this.course.id, module.id));

    }

    /**
     * Create lesson in given module
     * @param  {Object} module
     */
    createLesson(module) {

        this._module = module;
        this.action = CREATING_LESSON;

    }

    /**
     * Edit lesson
     * @param  {Object} module
     * @param  {Object} lesson
     */
    editLesson(module, lesson) {

        this._module = module;
        this._lesson = lesson;
        this.action = EDITING_LESSON;

    }

    /**
     * Delete lesson
     * @param {Object}  module
     * @param {Object}  lesson
     */
    deleteLesson(module, lesson) {

        this.store.dispatch(LessonActions.removeLesson(
            this.course.id, module.id, lesson.id));

    }

    /**
     * Sort lesson
     * @param {Object}  module
     * @param {Object}  lesson
     * @param {Number}  targetIndex
     * @param {Boolean}  isBefore
     */
    sortLesson(module, lesson, targetIndex, isBefore) {

        const flatLessons = this.course.modules
            .map(module => module.lessons)
            .flat();

        const targetLesson = flatLessons[targetIndex];
        const targetModule = this.course.modules
            .find(module => module.id === targetLesson.moduleId);
        const targetLessonModuleIndex =
            targetModule.lessons
                .findIndex(lesson => lesson.id === targetLesson.id);

        const isFirstLessonInModule = targetLessonModuleIndex <= 0;

        const isLastLessonInModule = targetLessonModuleIndex >=
            targetModule.lessons.length - 1;

        let newOrder = lesson.order;

        if (isBefore) {

            if (isFirstLessonInModule) {

                newOrder = targetLesson.order / 2 - 1000;

            } else {

                const neighbourLesson = flatLessons[targetIndex - 1];
                newOrder = neighbourLesson.order +
                    (targetLesson.order - neighbourLesson.order) / 2;

            }

        } else {

            if (isLastLessonInModule) {

                newOrder = targetLesson.order * 2;

            } else {

                const neighbourLesson = flatLessons[targetIndex + 1];
                newOrder = targetLesson.order +
                    (neighbourLesson.order - targetLesson.order) / 2;

            }

        }

        this.store.dispatch(
            LessonActions.moveLesson(
                targetLesson.moduleId, newOrder,
                this.course.id, module.id, lesson.id,
            ));

    }

    /**
     * TopBar back click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onTopBarBackClick(event) {

        // if working on a lesson, force lesson update
        if (
            this.action === CREATING_LESSON ||
            this.action === EDITING_LESSON) {

            const lessonComposing = DOMUtils.q('lesson-composing', this.shadowRoot);

            lessonComposing.forceUpdateLesson();

        }

        this.action = OVERVIEW;

    }

    /**
     * Naming continue click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNamingContinue(event) {

        const { name, description } = event.detail.course;

        this.course = {
            ...this.course,
            name, description,
        };

        this.action = OVERVIEW;

        if (this._didCreateCourse) {

            this.store.dispatch(
                CourseActions.updateCourse({
                    name, description,
                }, this._courseID)
            );

        } else {

            this._didCreateCourse = true;

            this.store.dispatch(
                CourseActions.createCourse({
                    name, description,
                })
            ).then(({ response }) => {

                this.store.dispatch(
                    ViewActions.setState({
                        courseID: response.id,
                    })
                );

            }).catch((error) => {

                Router.back();
                this.store.dispatch(
                    NotificationActions.showError('Course creation failed!<br>Try again later!'));

            });

        }

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onModuleCreatingContinue(event) {

        const module = event.detail.module;
        const { name, description } = module;

        this.action = OVERVIEW;

        this.store.dispatch(
            ModuleActions.createModule({
                name, description,
            }, this._courseID)
        );

    }

    /**
     * ModuleNaming continue click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onModuleNamingContinue(event) {

        const module = event.detail.module;
        const { name, description } = module;

        this.course.modules.map((courseModule) => {

            if (courseModule.id === module.id) {

                courseModule.name = name;
                courseModule.description = description;
                console.log(courseModule);

            }

            return courseModule;

        });

        this.course = {
            ...this.course,
        };

        this.action = OVERVIEW;

        this.store.dispatch(
            ModuleActions.updateModule({
                name, description, order: module.order,
            }, this._courseID, module.id)
        );

    }

}

export { CourseCreate };
