
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import 'Components/Global/SifiveInput';

import './Editing';
import './Answering';

import { getStyles } from './Styles';

/**
 * ShortTextQuestionAnswers LitElement
 * template
 */
@customElement('short-text-questions-answers')
class ShortTextQuestionAnswers extends LitElement {

    @property({ type: Boolean, attribute: true })
    editing = false;

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

        if (this.editing) {

            return html`
                <!-- BooleanQuestionAnswers [EDITING] Component -->
                <short-text-questions-answers-editing
                    answer="${this.answer}"
                    incorrect="${this.incorrect}"></short-text-questions-answers-editing>`;

        } else {

            return html`
                <!-- BooleanQuestionAnswers [ANSWERING] Component -->
                <short-text-questions-answers-answering
                    .answer="${this.answer}"
                    .incorrect="${this.incorrect}"></short-text-questions-answers-answering>`;

        }

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        let didChange = false;

        if (!this.answer) {

            this.answer = '';
            didChange = true;

        }

        if (!this.incorrect) {

            this.incorrect = '';
            didChange = true;

        }

        if (didChange) {

            this.emitChange();

        }

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
     * Check answer
     */
    checkAnswer() {

        const $answers = DOMUtils.q('short-text-questions-answers-answering', this.shadowRoot);

        $answers.checkAnswer();

    }

    /**
     * Get the result
     *  @return {Boolean}
     */
    getResult() {

        const $answers = DOMUtils.q('short-text-questions-answers-answering', this.shadowRoot);

        return $answers.correct;

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

export { ShortTextQuestionAnswers };
