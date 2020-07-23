
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

// Components
import 'Components/Global/EditableElements';

import { getStyles } from './Styles';

/**
 * ModuleNaming LitElement
 * template
 */
@customElement('module-naming')
class ModuleNaming extends LitElement {

    @property({ type: Object })
    module = {};

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
            <!-- ModuleNaming -->
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your module a name"
                        .value=${this.module.name}
                        .multiline=${false}
                        @input=${this.onNameInput}></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the module"
                        .value=${this.module.description}
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

        return this.module.name && this.module.description &&
            this.module.name.length > 0 &&
            this.module.description.length > 0;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNameInput(event) {

        this.module = {
            ...this.module,
            name: event.currentTarget.value,
        };

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDescriptionInput(event) {

        this.module = {
            ...this.module,
            description: event.currentTarget.value,
        };

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
                    module: this.module,
                },
                bubbles: true,
                composed: true,
            })
        );

    }


}

export { ModuleNaming };
