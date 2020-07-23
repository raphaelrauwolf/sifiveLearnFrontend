
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

// Components
import 'Components/Global/EditableElements';

import { getStyles } from './Styles';

/**
 * CourseNaming LitElement
 * template
 */
@customElement('course-naming')
class CourseNaming extends LitElement {

    @property({ type: Object })
    course = {};

    @property({ type: Boolean })
    canContinue = this.checkCanContinue();

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

        let continueButton;

        if (this.canContinue) {

            continueButton = html`
            <div class="grid-container button-container">
                <div class="button" @click=${this.onContinueClick}>Continue</div>
            </div>`;

        }

        return html`
            <!-- CourseNaming -->
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your course a name"
                        .value=${this.course.name}
                        .multiline=${false}
                        @input=${this.onNameInput}></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the course"
                        .value=${this.course.description}
                        .multiline=${false}
                        @input=${this.onDescriptionInput}
                        ></editable-h4>
                </div>
            </div>
            ${continueButton}`;

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        this.canContinue = this.checkCanContinue();

    }

    /**
     * @return {Boolean}
     */
    checkCanContinue() {

        return this.course.name && this.course.description &&
            this.course.name.length > 0 &&
            this.course.description.length > 0;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNameInput(event) {

        this.course.name = event.currentTarget.value;
        this.course = { ...this.course };

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDescriptionInput(event) {

        this.course.description = event.currentTarget.value;
        this.course = { ...this.course };

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onContinueClick(event) {

        this.dispatchEvent(
            new CustomEvent('continue', {
                detail: {
                    course: this.course,
                },
                bubbles: true,
                composed: true,
            })
        );

    }


}

export { CourseNaming };
