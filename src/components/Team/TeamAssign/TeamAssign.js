
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';
import Router from 'Utils/Router';
import {
    getTeamID,
    getTeamCourses,
    shouldFetchTeamCourses,
} from 'Selectors/Team';
import { getCourses } from 'Selectors/Course';

import TeamActions from 'Actions/Team';

// component dependencies
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Course/CourseAccordion';

import { courseListFactory } from './Factories/courseList';

import { getStyles } from './Styles';

/**
 * TeamAssign LitElement
 * template
 */
@customElement('team-assign')
class TeamAssign extends ConnectedComponent {

    @property({ type: Number })
    teamID = -Infinity;

    @property({ type: Array })
    assignableCourses = [];

    @property({ type: Array })
    teamCourses = [];

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        if (this.assignableCourses && this.assignableCourses.length <= 0) {

            return html`
                <div class="grid-container">
                    <h3>Assign Course</h3>
                    <div class="header">
                        <p>
                            There are no courses available for this team.<br>
                            Create a new one to get them busy!
                        </p>
                        <div class="button-container">
                            <div class="button" @click="${this.onCreateNewCourseClick}">Create New Course</div>
                        </div>
                    </div>
                </div>`;

        }

        return html`
            <!-- TeamAssign -->
            <div class="grid-container">
                <h3>Assign Course</h3>
                <div class="header">
                    <p>Course creation gives you the tools you need to create impactful courses with modular lessons and share them with teams.</p>
                    <div class="button-container">
                        <div class="button" @click="${this.onCreateNewCourseClick}">Create New Course</div>
                    </div>
                </div>
                <div class="list-header">
                    <h5>Available Courses</h5>
                    <div class="list-controls">
                        <div @click="${this.onExpandAllClick}">Expand all</div> &vert;
                        <div @click="${this.onCollapseAllClick}">Collapse all</div>
                    </div>
                </div>

                <div class="course-list">
                    ${courseListFactory(this.assignableCourses, ::this.assignCourse)}
                </div>
            </div>
        `;

    }

    /**
     * select elements
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.courseList = DOMUtils.q('.course-list', this.shadowRoot);

    }

    /**
     * Callback for component updates
     * @param {Map} changedProps
     */
    updated(changedProps) {

        if (this.shouldFetchTeamCourses) {

            this.store.dispatch(TeamActions.getTeamCourses(this.teamID));

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.teamID = getTeamID(state);

        if (this.teamID) {

            this.teamCourses = getTeamCourses(state, this.teamID);
            this.assignableCourses = this.teamCourses &&
                Object.values(getCourses(state))
                    .filter((course) => {

                        const foundTeamCourse = this.teamCourses
                            .find(teamCourse => teamCourse.id === course.id);

                        return !foundTeamCourse;

                    });

            this.shouldFetchTeamCourses =
                shouldFetchTeamCourses(state, this.teamID);

        }

    }

    /**
     * Assign the given course to a team
     * @param  {String} courseID
     */
    assignCourse(courseID) {

        this.store.dispatch(
            TeamActions.assignCourse(this.teamID, courseID));

    }

    /**
     * Expand all click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onExpandAllClick(event) {

        const courseAccordions = DOMUtils.a('course-accordion', this.courseList);

        DOMUtils.setAttrib(courseAccordions, 'open', 'open');

    }

    /**
     * Expand all click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCollapseAllClick(event) {

        const courseAccordions = DOMUtils.a('course-accordion', this.courseList);

        DOMUtils.removeAttrib(courseAccordions, 'open');

    }

    /**
     * Create New Course click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCreateNewCourseClick(event) {

        Router.push('/course/create');

    }

}

export { TeamAssign };
