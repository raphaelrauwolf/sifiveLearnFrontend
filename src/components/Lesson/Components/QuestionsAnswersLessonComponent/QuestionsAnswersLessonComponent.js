
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';


import DOMUtils from 'Utils/DOMUtils';

import { LessonComponent } from 'Components/Lesson/LessonComponent';
import 'Components/Global/RichTextEditor';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveCheckbox';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveRadioGroup';

// Question Type Components
import './ShortText';
import './SingleSelect';
import './MultiSelect';
import './Boolean';

import { getStyles } from './Styles';

export const TYPE = 'LESSON_COMPONENT_TYPE.QUESTIONS_ANSWERS';

/**
 * QuestionsAnswersLessonComponent LitElement
 * template
 */
@customElement('questions-answers-lesson-component')
class QuestionsAnswersLessonComponent extends LessonComponent {

    @property({ type: Boolean, attribute: true })
    editing = false;

    @property({ type: String })
    type = '';

    @property({ type: Object })
    data = {};

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

        let content;

        if (this.editing) {

            let answerSettings;
            let dropDownIndex = false;

            switch (this.data.type) {
                case 'short-text':
                    dropDownIndex = 0;
                    answerSettings = html`<short-text-questions-answers editing
                        .answer="${this.data.answer}"
                        .incorrect="${this.data.incorrect}"
                        @answer-update="${this.onAnswerChange}"></short-text-questions-answers>`;
                    break;
                case 'single-select':
                    dropDownIndex = 1;
                    answerSettings = html`<single-select-questions-answers editing
                        .answers="${this.data.answers}"
                        .incorrect="${this.data.incorrect}"
                        @answer-update="${this.onAnswerChange}"></single-select-questions-answers>`;
                    break;
                case 'multi-select':
                    dropDownIndex = 2;
                    answerSettings = html`<multi-select-questions-answers editing
                        .answers="${this.data.answers}"
                        .incorrect="${this.data.incorrect}"
                        @answer-update="${this.onAnswerChange}"></multi-select-questions-answers>`;
                    break;
                case 'boolean':
                    dropDownIndex = 3;
                    answerSettings = html`<boolean-questions-answers editing
                        .answer="${this.data.answer}"
                        .incorrect="${this.data.incorrect}"
                        @change="${this.onAnswerChange}"></boolean-questions-answers>`;
                    break;
            }

            let addQuestionButton;

            if (this.data.type) {

                addQuestionButton = html`
                    <sifive-button label="Add another question"
                        @click="${this.onAddQuestionClick}">
                    </sifive-button>`;

            }

            content = html`
                <div class="wrapper editing">
                    <div class="question row">
                        <div class="row-left">
                            <sifive-dropdown
                                @input="${this.onTypeInput}"
                                label="Select Type"
                                .activeIndex="${dropDownIndex}"
                                .items="${['Short Text', 'Single Select', 'Multiple Select', 'True/False']}"></sifive-dropdown>
                        </div>
                        <div class="row-right">
                            <rich-text-editor placeholder="Write question text" @change="${this.onQuestionChange}" content="${this.data.question || ''}"></rich-text-editor>
                        </div>
                    </div>
                    ${answerSettings}
                    ${addQuestionButton}
                </div>`;

        } else {

            content = html`content`;

            switch (this.data.type) {
                case 'short-text':
                    content = html`
                        <div class="wrapper answering">
                            <h2>${unsafeHTML(this.data.question)}</h2>
                            <short-text-questions-answers
                                .answer="${this.data.answer}"
                                .incorrect="${this.data.incorrect}"></short-text-questions-answers>
                        </div>`;
                    break;
                case 'single-select':
                    content = html`
                        <div class="wrapper answering">
                            <h2>${unsafeHTML(this.data.question)}</h2>
                            <single-select-questions-answers
                                .answers=${this.data.answers}
                                .incorrect="${this.data.incorrect}"></single-select-questions-answers>
                        </div>`;
                    break;
                case 'multi-select':
                    content = html`
                        <div class="wrapper answering">
                            <h2>${unsafeHTML(this.data.question)}</h2>
                            <multi-select-questions-answers
                                .answers=${this.data.answers}
                                .incorrect="${this.data.incorrect}"></multi-select-questions-answers>
                        </div>`;
                    break;
                case 'boolean':
                    content = html`
                        <div class="wrapper answering">
                            <h2>${unsafeHTML(this.data.question)}</h2>
                            <boolean-questions-answers
                                .answer="${this.data.answer}"
                                .incorrect="${this.data.incorrect}"></boolean-questions-answers>
                        </div>`;
                    break;
            }

        }

        return html`
            <!-- QuestionsAnswersLessonComponent Component -->
            ${content}
        `;

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        const didQuestionChange = !this.$questionEditor ||
            this.data.question !== this.$questionEditor.getHTML();

        return didQuestionChange;

    }

    /**
     * Setup editor
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.$questionEditor = DOMUtils.q('.question rich-text-editor', this.shadowRoot);

    }

    /**
     * Return tag for DB
     * @return {String}
     */
    getSerialized() {

        const escapedData = JSON.stringify(this.data).replace(/"/g, '&quot;');

        return `<questions-answers-lesson-component data="${escapedData}"></questions-answers-lesson-component>`;

    }

    /**
     * Return content for DB
     * @return {String}
     */
    getContent() {

        return {
            type: TYPE,
            data: this.data,
        };

    }

    /**
     * Check if component can be sent to server
     * @return {Boolean}
     */
    isIncomplete() {

        const hasType = !!this.data.type;
        const hasQuestion = this.data.question && this.data.question.length > 0;
        const hasIncorrect = this.data.incorrect &&
            this.data.incorrect.length > 0;
        let hasValidAnswers = true;

        if (hasType && this.data.type === 'multi-select') {

            hasValidAnswers = this.data.answers.length >= 2 &&
                !this.data.answers.find(answer => answer.text.length <= 0);

        } else if (hasType && this.data.type === 'single-select') {

            hasValidAnswers = this.data.answers.length >= 2 &&
                !this.data.answers.find(answer => answer.text.length <= 0) &&
                !!this.data.answers.find(answer => answer.correct);

        } else if (hasType && this.data.type === 'short-text') {

            hasValidAnswers = this.data.answer.length > 0;

        }

        return !hasType ||
            !hasQuestion ||
            !hasIncorrect ||
            !hasValidAnswers;

    }

    /**
     *
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('data-change', {
            detail: {
                data: this.data,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     *
     */
    checkAnswer() {

        const $answers = DOMUtils.q([
            'short-text-questions-answers',
            'boolean-questions-answers',
            'multi-select-questions-answers',
            'single-select-questions-answers',
        ].join(','), this.shadowRoot);

        $answers.checkAnswer();

    }

    /**
     * @return {Boolean}
     */
    getResult() {

        const $answers = DOMUtils.q([
            'short-text-questions-answers',
            'boolean-questions-answers',
            'multi-select-questions-answers',
            'single-select-questions-answers',
        ].join(','), this.shadowRoot);

        return $answers.getResult();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onTypeInput(event) {

        if (event.detail.index === 0) {

            this.type = 'short-text';
            this.data = {
                type: 'short-text',
                question: '',
                incorrect: '',
            };

        } else if (event.detail.index === 1) {

            this.type = 'single-select';
            this.data = {
                type: 'single-select',
                question: '',
                incorrect: '',
            };

        } else if (event.detail.index === 2) {

            this.type = 'multi-select';
            this.data = {
                type: 'multi-select',
                question: '',
                incorrect: '',
            };

        } else if (event.detail.index === 3) {

            this.type = 'boolean';
            this.data = {
                type: 'boolean',
                question: '',
                answer: null,
                incorrect: '',
            };

        }

        this.emitChange();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onQuestionChange(event) {

        this.data = {
            ...this.data,
            question: event.detail.html,
        };

        this.emitChange();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAnswerChange(event) {

        event.stopPropagation();

        this.data = {
            ...this.data,
            ...event.detail,
        };

        this.emitChange();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAddQuestionClick(event) {

        this.dispatchEvent(new CustomEvent('add-question', {
            detail: {},
            bubbles: true,
            composed: true,
        }));

    }

}

export { QuestionsAnswersLessonComponent };
