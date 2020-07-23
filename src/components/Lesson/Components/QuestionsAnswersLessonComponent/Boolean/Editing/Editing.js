
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';

import { getStyles } from './Styles';

/**
 * BooleanQuestionAnswers LitElement
 * template
 */
@customElement('boolean-questions-answers-editing')
class BooleanQuestionAnswersEditing extends LitElement {

    @property({ type: Boolean })
    answer = undefined;

    @property({ type: String })
    incorrect = '';

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
            <!-- BooleanQuestionAnswersEditing Component -->
            <div class="boolean-settings row">
                <div class="row-left">
                    <div class="row-label">Answer</div>
                </div>
                <div class="row-right">
                    <sifive-radio-group @input="${this.onRadioGroupInput}">
                        <div>
                            <sifive-radio label="True" name="boolean-answer" value="true"
                            ?checked="${this.answer === true}"></sifive-radio>
                            <div class="divider"></div>
                            <sifive-radio label="False" name="boolean-answer" value="false"
                            ?checked="${this.answer === false}"></sifive-radio>
                        </div>
                    </sifive-radio-group>
                </div>
            </div>
            <div class="boolean-settings row">
                <div class="row-left">
                    <div class="row-label">Incorrect</div>
                </div>
                <div class="row-right">
                    <sifive-input type="text"
                        @input="${this.onIncorrectInput}"
                        value="${this.incorrect}"
                        placeholder="Display text in case of incorrect answer"></sifive-input>
                </div>
            </div>`;

    }

    /**
     *
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                answer: this.answer,
                incorrect: this.incorrect,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onRadioGroupInput(event) {

        this.answer = event.detail.target.value === 'true';

        this.emitChange();

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onIncorrectInput(event) {

        this.incorrect = event.target.value;

        this.emitChange();

    }

}

export { BooleanQuestionAnswersEditing };
