
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';

import { getStyles } from './Styles';

/**
 * BooleanQuestionAnswersAnswering LitElement
 * template
 */
@customElement('boolean-questions-answers-answering')
class BooleanQuestionAnswersAnswering extends LitElement {

    @property({ type: Boolean })
    answer = undefined;

    @property({ type: String })
    incorrect = '';

    @property({ type: Boolean })
    userAnswer = null;

    @property({ type: Boolean })
    correct = null;

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

        const cssClass = (this.correct === false) ? 'wrong' : 'correct';

        return html`
            <!-- BooleanQuestionAnswersAnswering Component -->
            <sifive-radio-group class="${cssClass}">
                <div>
                    <sifive-radio label="True" name="boolean-answer" value="true"
                        @input=${this.onRadioInput}
                        ?checked=${this.userAnswer === true}
                        ?red=${this.correct === false && this.userAnswer === true}
                        ?green=${this.correct && this.userAnswer === true}
                    ></sifive-radio>
                    <sifive-radio label="False" name="boolean-answer" value="false"
                        @input=${this.onRadioInput}
                        ?checked=${this.userAnswer === false}
                        ?red=${this.correct === false && this.userAnswer === false}
                        ?green=${this.correct && this.userAnswer === false}
                    ></sifive-radio>
                </div>
            </sifive-radio-group>

            <div class="incorrect">
                <h5>${this.incorrect}</h5>
            </div>`;

    }

    /**
     * Check the given answer
     */
    checkAnswer() {

        this.correct = this.userAnswer === this.answer;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onRadioInput(event) {

        this.userAnswer = event.target.value === 'true';
        this.correct = null;

    }

}

export { BooleanQuestionAnswersAnswering };
