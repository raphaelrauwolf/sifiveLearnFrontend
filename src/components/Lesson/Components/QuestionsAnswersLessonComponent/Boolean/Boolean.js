
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';

import './Editing';
import './Answering';

import { getStyles } from './Styles';

/**
 * BooleanQuestionAnswers LitElement
 * template
 */
@customElement('boolean-questions-answers')
class BooleanQuestionAnswers extends LitElement {

    @property({ type: Boolean, attribute: true })
    editing = false;

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

        if (this.editing) {

            return html`
                <!-- BooleanQuestionAnswers [EDITING] Component -->
                <boolean-questions-answers-editing
                    answer="${this.answer}"
                    incorrect="${this.incorrect}"></boolean-questions-answers-editing>`;

        } else {

            return html`
                <!-- BooleanQuestionAnswers [ANSWERING] Component -->
                <boolean-questions-answers-answering
                    answer="${this.answer}"
                    incorrect="${this.incorrect}"></boolean-questions-answers-answering>`;

        }

    }

    /**
     * Check answer
     */
    checkAnswer() {

        const $answers = DOMUtils.q('boolean-questions-answers-answering', this.shadowRoot);

        $answers.checkAnswer();

    }

    /**
     * Get the result
     *  @return {Boolean}
     */
    getResult() {

        const $answers = DOMUtils.q('boolean-questions-answers-answering', this.shadowRoot);

        return $answers.correct;

    }

}

export { BooleanQuestionAnswers };
