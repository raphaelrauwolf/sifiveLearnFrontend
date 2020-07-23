
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';

import { getStyles } from './Styles';

/**
 * ShortTextQuestionAnswers LitElement
 * template
 */
@customElement('short-text-questions-answers-editing')
class ShortTextQuestionAnswersEditing extends LitElement {

    @property({ type: String })
    answer = '';

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
            <!-- ShortTextQuestionAnswersEditing Component -->
            <div class="wrapper editing">
                <div class="short-text-settings row">
                    <div class="row-left">
                        <div class="row-label">Answer</div>
                    </div>
                    <div class="row-right">
                        <sifive-input type="text"
                            @input="${this.onAnswerInput}"
                            value="${this.answer}"
                            placeholder="Correct answer"></sifive-input>
                    </div>
                </div>
                <div class="short-text-settings row">
                    <div class="row-left">
                        <div class="row-label">Incorrect</div>
                    </div>
                    <div class="row-right">
                        <sifive-input type="text"
                            @input="${this.onIncorrectInput}"
                            value="${this.incorrect}"
                            placeholder="Display text in case of incorrect answer"></sifive-input>
                    </div>
                </div>
            </div>`;

    }

    /**
     *
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('answer-update', {
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
    onAnswerInput(event) {

        this.answer = event.target.value;

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

export { ShortTextQuestionAnswersEditing };
