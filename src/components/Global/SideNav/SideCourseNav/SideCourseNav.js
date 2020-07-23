
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

// redux dependencies
import {
    getCourses,
    getCourseID,
} from 'Selectors/Course';

// component dependencies
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SideNav/SideNavButton';
import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * SideCourseNav LitElement
 * template
 */
@customElement('side-course-nav')
class SideCourseNav extends ConnectedComponent {

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ type: Boolean, reflect: true })
    expanded = false;

    @property({ type: Object })
    courses = {};

    @property({ type: String })
    courseID;

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

        const courseList = Object.values(this.courses).map((course) => {

            return html`
                <div class="course ${this.courseID == course.id ? 'active' : ''}">
                    <a href="/course/${course.id}"><b>${course.name}</b></a>
                </div>`;

        });

        return html`
            <!-- SideCourseNav Component -->
            <div class="wrapper">
                <side-nav-button label="Courses"
                    ?label-hidden=${!this.open}
                    @click="${this.onCourseButtonClick}">
                    <svg-icon slot="icon" src="assets/images/icons/course.svg"></svg-icon>
                </side-nav-button>
                <div class="course-list">
                    ${courseList}
                </div>
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.courses = getCourses(state);
        this.courseID = getCourseID(state);

    }

    /**
     * Callback for Menu click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCourseButtonClick(event) {

        this.expanded = !this.expanded;

    }

}

export { SideCourseNav };
