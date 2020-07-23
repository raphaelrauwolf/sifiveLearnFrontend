
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveButton';

import { getStyles } from './Styles';

/**
 * ShortTextQuestionAnswersAnswering LitElement
 * template
 */
@customElement('short-text-questions-answers-answering')
class ShortTextQuestionAnswersAnswering extends LitElement {

    @property({ type: String })
    answer = '';

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
            <!-- ShortTextQuestionAnswersAnswering Component -->
            <div class="${cssClass}">
                <sifive-input type="text"
                    @input=${this.onTextInput}
                    ?disabled=${this.answered}
                    ?red=${this.correct === false}
                    ?green=${this.correct}
                    placeholder="Type your answer here"></sifive-input>
            </div>

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
    onTextInput(event) {

        this.userAnswer = event.target.value;
        this.correct = null;

    }

}

export { ShortTextQuestionAnswersAnswering };
