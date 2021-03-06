
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { hasArrayChanged } from 'Components/hasArrayChanged';
import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';

import { answeringAnswer } from './Factories/answeringAnswer';

import { getStyles } from './Styles';

/**
 * SingleSelectQuestionAnswersAnswering LitElement
 * template
 */
@customElement('single-select-questions-answers-answering')
class SingleSelectQuestionAnswersAnswering extends LitElement {

    @property({ type: Boolean })
    answer = undefined;

    @property({ type: String })
    incorrect = '';

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    userAnswers = [];

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    results = [];

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
            <!-- SingleSelectQuestionAnswersAnswering Component -->
            <sifive-radio-group class="${cssClass}">
                ${this.answers.map((answer, index) =>
                    answeringAnswer(this, answer, index, this.results[index]))}
            </sifive-radio-group>

            <div class="incorrect">
                <h5>${this.incorrect}</h5>
            </div>`;

    }

    /**
     * Check the given answer
     */
    checkAnswer() {

        let wrongCount = 0;

        this.results = this.answers.map((answer, index) => {

            const correct =
                this.answers[index].correct === !!this.userAnswers[index];

            if (!correct) {

                wrongCount++;

            }

            return correct;

        });

        this.correct = wrongCount <= 0;

    }

}

export { SingleSelectQuestionAnswersAnswering };
