
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import 'Components/Course/CourseProgressBar';

import { getStyles } from './Styles';

/**
 * CourseSummaryRow LitElement
 * template
 */
@customElement('course-summary-row')
class CourseSummaryRow extends LitElement {

    @property({ type: Object })
    course = {}

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

        let progress;

        if (this.course.progress > 0) {

            progress = html`<course-progress-bar percent="${this.course.progress}"></course-progress-bar>`;

        }

        return html`
            <!-- CourseSummaryRow Component -->
            <div class="wrapper">
                <h5>Certification Course</h5>
                <h2><a href="/course/${this.course.id}">${this.course.name}</a></h2>
                ${progress}
                <div class="information">
                    <div class="start-date">
                        <img src="assets/images/icons/start_time.svg" alt="Start Time Icon" />
                        Start Date &vert;&nbsp;<b>17 Apr</b>
                    </div>
                    <div class="deadline">
                        <img src="assets/images/icons/watch.svg" alt="Deadline Icon" />
                        Next Deadline &vert;&nbsp; <b>30 JUN 2019</b>
                    </div>
                    <div class="estimate-time">
                        <img src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon" />
                        Est. Time &vert;&nbsp; <b>6 H 25 M</b>
                    </div>
                </div>
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     * @return {void}
     */
    stateChanged(state) {}

}

export { CourseSummaryRow };
