
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import Router from 'Utils/Router';

// Redux Actions
import ViewActions from 'Actions/View';

// Redux Selectors
import { getCourse, getFetchListError, isShowingCourse } from 'Selectors/Course';
import { getViewState } from 'Selectors/View';
import { getRole } from 'Selectors/User';

// Components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SVGIcon';

// Factories
import { headerFactory } from './Factories/header';
import { moduleListFactory } from './Factories/moduleList';

import { getStyles } from './Styles';

import { ROLES } from 'Constants/User';

/**
 * CourseMain LitElement
 * template
 */
@customElement('course-main')
class CourseMain extends ConnectedComponent {

    @property({ type: Boolean })
    active = false;

    @property({ type: Object })
    course = {};

    @property({ type: String })
    userRole = {};

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

        if (!this.course || !this.course.modules) {

            return html`<sifive-loader></sifive-loader>`;

        }

        let topBar;

        if (this.userRole === ROLES.MANAGER) {

            topBar = html`
                <top-bar visible>
                    <div slot="content" class="top-bar-content grid-container">
                        <div class="edit-link" @click="${this.onEditClick}">
                            <svg-icon src="assets/images/icons/edit.svg"></svg-icon>Edit Course
                        </div>
                    </div>
                </top-bar>`;

        }

        return html`
            <!-- CourseMain -->
            ${topBar}
            <div class="grid-container">
                <h1>${this.course.name}</h1>
                <div class="description">${this.course.description}</div>
                <div class="info-container">
                    <div class="start-date">
                        <svg-icon src="assets/images/icons/start_time.svg" alt="Start Time Icon"></svg-icon>
                        Start Date &vert;&nbsp;<b>17 Apr</b>
                    </div>
                    <div class="estimate-time">
                        <svg-icon src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon"></svg-icon>
                        Est. Time &vert;&nbsp; <b>6 H 25 M</b>
                    </div>
                </div>
                ${headerFactory(this.course.progress, this.onStartButtonClick)}
                ${moduleListFactory(this.course.modules)}
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.active = isShowingCourse(state);
        this._viewState = getViewState(state);

        this._courseID = this._viewState.courseID;
        this.userRole = ROLES[getRole(state)];

        if (this.active && this._courseID) {

            this.course = getCourse(state, this._courseID);

            if (!this.course && getFetchListError(state)) {

                // TODO: Redirect to home if course doesnt exist

            }


        }

    }

    /**
     * Redirect to next lesson
     */
    startNextLesson() {

        let lesson;

        this.course.modules.find((module) => {

            lesson = module.lessons.find((lesson) => {

                return lesson.progress < 100;

            });

            return !!lesson;

        });

        Router.push('/lesson/' + lesson.id);

    }

    /**
     * StartButton click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onStartButtonClick(event) {

        this.startNextLesson();

    }

    /**
     * Edit click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onEditClick(event) {

        this.store.dispatch(
            ViewActions.setState({
                isEditing: true,
            })
        );

    }


}

export { CourseMain };
