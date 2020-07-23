
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';
import 'Components/Global/SifiveRoundButton';
import { hasArrayChanged } from 'Components/hasArrayChanged';

import { editingAnswer } from './Factories/editingAnswer';

import { getStyles } from './Styles';

/**
 * MultiSelectQuestionAnswersEditing LitElement
 * template
 */
@customElement('multi-select-questions-answers-editing')
class MultiSelectQuestionAnswersEditing extends LitElement {

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    answers = [];

    @property({ type: String })
    incorrect = '';

    ignoreNextUpdate = false;

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

        const content = Array.isArray(this.answers) ? html`
            <div class="multi-select-answer-setting row">
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
            <div>
                ${this.answers.map((answer, index) =>
                    editingAnswer(this, answer, index))}
            </div>`: '';

        return html`
            <!-- MultiSelectQuestionAnswersEditing Component -->
            ${content}`;

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        const update = !this.ignoreNextUpdate;

        this.ignoreNextUpdate = false;

        return update;

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        if (!this.answers) {

            this.answers = [
                {
                    id: 0,
                    correct: false,
                    text: '',
                },
                {
                    id: 1,
                    correct: false,
                    text: '',
                },
            ];

            this.emitChange();

        }

    }

    /**
     * Returns the next available id for a new answer
     * @return {Number}
     */
    getNextID() {

        const lastID = Math.max(...this.answers.map(answer => answer.id), -1);

        return lastID + 1;

    }

    /**
     * Fires event to indicate an update
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('answer-update', {
            detail: {
                answers: this.answers,
                incorrect: this.incorrect,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * @param {Number} id
     * @param {String} text
     */
    updateAnswerText(id, text) {

        const answers = [...this.answers];

        answers.some((answer) => {

            if (answer.id === id) {

                answer.text = text;

                return true;

            }

        });

        this.answers = answers;

        this.ignoreNextUpdate = true;

    }

    /**
     * Sorts the Answers depending on the sorted event
     * @param {Number} index
     * @param {Array} sortedArray
     */
    sortAnswers(index, sortedArray) {

        const answers = [];

        sortedArray.forEach((entry, index) =>
            answers[index] = this.answers[entry]);

        this.answers = answers;

        this.emitChange();

    }

    /**
     * Deletes a possible answer and fires change event
     * @param {Number} id
     */
    deleteAnswer(id) {

        if (this.answers.length > 1) {

            this.answers = [...this.answers]
                .filter(answer => answer.id !== id);

            this.emitChange();

        }

    }

    /**
     * @param {Number} id
     * @param {Boolean} correct
     */
    updateCorrectAnswer(id, correct) {

        const answers = [...this.answers];

        answers.some((answer) => {

            if (answer.id === id) {

                answer.correct = correct;

                return true;

            }

        });

        this.answers = answers;

        this.emitChange();

    }

    /**
     * Handle adding for a new answer
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAddClick(event) {

        this.answers = [
            ...this.answers,
            {
                id: this.getNextID(),
                correct: false,
                text: '',
            },
        ];

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

export { MultiSelectQuestionAnswersEditing };
