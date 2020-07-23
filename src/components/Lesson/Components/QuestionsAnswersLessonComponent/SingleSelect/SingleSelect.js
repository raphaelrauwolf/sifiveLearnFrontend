
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { hasArrayChanged } from 'Components/hasArrayChanged';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveSortable';
import 'Components/Global/SifiveRadioGroup';
import 'Components/Global/RichTextEditor';

import './Answering';
import './Editing';

import { getStyles } from './Styles';

/**
 * SingleSelectQuestionAnswers LitElement
 * template
 */
@customElement('single-select-questions-answers')
class SingleSelectQuestionAnswers extends LitElement {

    @property({ type: Boolean, attribute: true })
    editing = false;

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    answers = [];

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

        if (this.editing) {

            return html`
                <single-select-questions-answers-editing
                .answers=${this.answers}
                incorrect="${this.incorrect}"></single-select-questions-answers-editing>`;

        } else {

            return html`
                <single-select-questions-answers-answering
                    .answers=${this.answers}
                    incorrect="${this.incorrect}">
                </single-select-questions-answers-answering>`;

        }

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
     * Check answer
     */
    checkAnswer() {

        const $answers = DOMUtils.q('single-select-questions-answers-answering', this.shadowRoot);

        $answers.checkAnswer();

    }

    /**
     * Get the result
     *  @return {Boolean}
     */
    getResult() {

        const $answers = DOMUtils.q('single-select-questions-answers-answering', this.shadowRoot);

        return $answers.correct;

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
     * Handle selecting a correct answer
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onRadioGroupInput(event) {

        this.answers.forEach((answer, answerIndex) => {

            answer.correct = answerIndex === event.detail.index;

        });

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

export { SingleSelectQuestionAnswers };
