
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * CourseProgressBar LitElement
 * template
 */
@customElement('course-progress-bar')
class CourseProgressBar extends LitElement {

    @property({ type: Boolean, reflect: true })
    failing = false;

    @property({ type: Boolean, reflect: true })
    complete = false;

    @property({ type: Number })
    percent = 0;

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
            <!-- CourseProgressBar -->
            <div class="wrapper">
                <div class="small-data">${Math.round(this.percent)}%</div>
                <div class="bar-container">
                    <div class="bar" style="width:${this.percent}%"></div>
                    <svg-icon class="finish-line" src="assets/images/icons/finish_line.svg"></svg-icon>
                </div>
                <div class="complete-label">Completed</div>
            </div>
        `;

    }

    /**
     * @param {Object} changedProps
     */
    updated(changedProps) {

        this.complete = this.percent >= 100;

    }

}

export { CourseProgressBar };
