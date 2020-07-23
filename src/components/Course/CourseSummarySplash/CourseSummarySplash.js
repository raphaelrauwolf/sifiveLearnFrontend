
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveImage';

import { getStyles } from './Styles';

/**
 * CourseSummarySplash LitElement
 * template
 */
@customElement('course-summary-splash')
class CourseSummarySplash extends LitElement {

    @property({ type: Object })
    course = {};

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

        return html`
            <!-- CourseSummarySplash Component -->
            <div class="grid-container">
                <div class="content-container">
                    <h5>Certification Course</h5>
                    <h1><a href="/course/${this.course.id}">${this.course.name}</a></h1>
                    <div class="description">${this.course.description}</div>
                    <div class="information">
                        <div class="start-date">
                            <svg-icon src="assets/images/icons/start_time.svg" alt="Start Time Icon"></svg-icon>
                            Start Date &vert;&nbsp;<b>17 Apr</b>
                        </div>
                        <div class="flex"></div>
                        <div class="deadline">
                            <svg-icon src="assets/images/icons/watch.svg" alt="Deadline Icon"></svg-icon>
                            Next Deadline &vert;&nbsp; <b>30 JUN 2019</b>
                        </div>
                        <div class="flex"></div>
                        <div class="estimate-time">
                            <svg-icon src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon"></svg-icon>
                            Est. Time &vert;&nbsp; <b>6 H 25 M</b>
                        </div>
                    </div>
                </div>
                <img src="assets/images/illustrations/coding-coffee.jpg" alt="Coding &amp; Coffee" />
            </div>
        `;

    }

}

export { CourseSummarySplash };
