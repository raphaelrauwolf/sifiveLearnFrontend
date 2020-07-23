
import {
    html, customElement, property,
} from 'lit-element';

// redux dependencies
import {
    getCourses,
    isFetchingList,
} from 'Selectors/Course';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Course/CourseSummaryRow';
import 'Components/Course/CourseSummarySplash';
import 'Components/Global/SifiveLoader';


import { getStyles } from './Styles';

/**
 * LearnerDashboard LitElement
 * template
 */
@customElement('learner-dashboard')
class LearnerDashboard extends ConnectedComponent {

    @property({ type: Object })
    courses = {};

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

        if (this.isFetchingList) {

            return html`<sifive-loader></sifive-loader>`;

        }

        let courseContent;
        const courses = Object.values(this.courses);

        if (courses.length > 1) {

            courseContent = courses.sort((first, second) => {

                if (first.progress >= 100) {

                    return 1;

                }

                return first.progress < second.progress;

            }).map((course) => {

                return html`<course-summary-row .course="${course}"></course-summary-row>`;

            });

            return html`
            <div class="grid-container">
                <div class="course-list">
                    ${courseContent}
                </div>
            </div>`;

        } else if (courses.length === 1) {

            return html`<course-summary-splash .course=${courses[0]}></course-summary-splash>`;

        } else {

            return html`
            <div class="grid-container">
                <div class="no-content">There are no courses available</div>
            </div>`;

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.courses = getCourses(state);
        this.isFetchingList = isFetchingList(state);

    }

}

export { LearnerDashboard };
