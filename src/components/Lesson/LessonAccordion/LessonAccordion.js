
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * LessonAccordion LitElement
 * template
 */
@customElement('lesson-accordion')
class LessonAccordion extends LitElement {

    @property({ type: Object })
    lesson = {}

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
            <!-- LessonAccordion Component -->
            <div class="wrapper">
                <div class="info">
                    <h5>
                        <a href="/lesson/${this.lesson.id}">
                            <svg-icon src="assets/images/icons/lesson.svg" alt="Lesson Icon"></svg-icon>
                            ${this.lesson.name}
                        </a>
                    </h5>
                </div>
                <div class="bar-content">
                    <slot name="bar-content"></slot>
                </div>
            </div>`;

    }

}

export { LessonAccordion };
