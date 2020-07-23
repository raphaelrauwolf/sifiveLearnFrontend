
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/EditableElements';

import { getStyles } from './Styles';

/**
 * CourseCreateNaming LitElement
 * template
 */
@customElement('course-create-naming')
class CourseCreateNaming extends LitElement {

    @property({ type: String })
    nameValue = '';

    @property({ type: String })
    descriptionValue = '';

    @property({ type: Boolean })
    canContinue = this.checkCanContinue();

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

        let continueButton;

        if (this.canContinue) {

            continueButton = html`
            <div class="grid-container button-container">
                <div class="button" @click=${this.onContinueClick}>Continue</div>
            </div>`;

        }

        return html`
            <!-- CourseCreateNaming -->
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your course a name"
                        .multiline=${false}
                        @input=${this.onNameInput}></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the course"
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

        return this.nameValue.length > 0 && this.descriptionValue.length > 0;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNameInput(event) {

        this.nameValue = event.currentTarget.value;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDescriptionInput(event) {

        this.descriptionValue = event.currentTarget.value;

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
                    name: this.nameValue,
                    description: this.descriptionValue,
                },
                bubbles: true,
                composed: true,
            })
        );

    }


}

export { CourseCreateNaming };
