
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { hasArrayChanged } from 'Components/hasArrayChanged';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveSortable';
import 'Components/Global/SifiveCheckbox';
import 'Components/Global/SifiveRadioGroup';
import 'Components/Global/RichTextEditor';

import './Answering';
import './Editing';

import { getStyles } from './Styles';

/**
 * MultiSelectQuestionAnswers LitElement
 * template
 */
@customElement('multi-select-questions-answers')
class MultiSelectQuestionAnswers extends LitElement {

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
                <multi-select-questions-answers-editing
                    .answers=${this.answers}
                    .incorrect="${this.incorrect}">
                </multi-select-questions-answers-editing>`;

        } else {

            return html`
                <multi-select-questions-answers-answering
                    .answers=${this.answers}
                    .incorrect="${this.incorrect}">
                </multi-select-questions-answers-answering>`;

        }

    }

    /**
     * Check answer
     */
    checkAnswer() {

        const $answers = DOMUtils.q('multi-select-questions-answers-answering', this.shadowRoot);

        $answers.checkAnswer();

    }

    /**
     * Get the result
     *  @return {Boolean}
     */
    getResult() {

        const $answers = DOMUtils.q('multi-select-questions-answers-answering', this.shadowRoot);

        return $answers.correct;

    }

}

export { MultiSelectQuestionAnswers };
