
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRoundButton';
import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * CourseAccordion LitElement
 * template
 */
@customElement('course-accordion')
class CourseAccordion extends LitElement {

    @property({ type: Object })
    course = {}

    @property({ type: Boolean })
    openable = false;

    @property({ type: Boolean, reflect: true })
    open = false;

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

        const creator = this.course.creator;
        const creatorName = `${creator.firstname} ${creator.lastname}`;

        let openButton;

        if (this.openable) {

            openButton = html`
            <sifive-round-button @click="${this.onExpandClick}">
                ${this.open ?
                    html`<svg-icon slot="icon" src="assets/images/icons/arrow_collapse.svg"></svg-icon>`:
                    html`<svg-icon slot="icon" src="assets/images/icons/arrow_expand.svg"></svg-icon>`}
            </sifive-round-button>`;

        }

        return html`
            <!-- CourseAccordion Component -->
            <div class="wrapper">
                <div class="info">
                    <h5>
                        <a href="/course/${this.course.id}">
                            <svg-icon src="assets/images/icons/course.svg" alt="Module Icon"></svg-icon>
                            ${this.course.name}
                        </a>
                    </h5>
                    <div class="creator">Created by <a href="/user/${creator.id}">${creatorName}</a></div>
                </div>
                <div class="actions">
                    <slot name="actions"></slot>
                    ${openButton}
                </div>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>`;


    }

    /**
     * Expand click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onExpandClick(event) {

        this.open = !this.open;

    }

}

export { CourseAccordion };
