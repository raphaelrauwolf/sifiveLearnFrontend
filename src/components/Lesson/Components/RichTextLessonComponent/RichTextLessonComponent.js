
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import DOMUtils from 'Utils/DOMUtils';

import { LessonComponent } from 'Components/Lesson/LessonComponent';
import 'Components/Global/RichTextEditor';

import { getStyles } from './Styles';

export const TYPE = 'LESSON_COMPONENT_TYPE.RICH_TEXT';

/**
 * RichTextLessonComponent LitElement
 * template
 */
@customElement('rich-text-lesson-component')
class RichTextLessonComponent extends LessonComponent {

    @property({ type: Boolean })
    editing = false;

    @property({ type: String, reflect: true })
    data = '';

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
            <div class="wrapper">
                <div class="editor">
                    <rich-text-editor content="${this.data}" @change="${this.onEditorChange}"></rich-text-editor>
                </div>
            </div>`;

        } else {

            return html`
            <div class="wrapper">
                <div class="content">${unsafeHTML(this.data)}</div>
            </div>`;

        }

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        return !this.$editor || this.data !== this.$editor.getHTML();

    }

    /**
     * Setup editor
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.$editor = DOMUtils.q('rich-text-editor', this.shadowRoot);

    }

    /**
     * Return tag for DB
     * @return {String}
     */
    getSerialized() {

        const escapedData = this.data.replace(/"/g, '&quot;');

        return `<rich-text-lesson-component data="${escapedData}"></rich-text-lesson-component>`;

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

        return this.data.length <= 0;

    }

    /**
     * Editable blur callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onEditorChange(event) {

        this.data = event.detail.html;

        event.stopPropagation();

        this.dispatchEvent(new CustomEvent('data-change', {
            detail: {
                data: this.data,
            },
            bubbles: true,
            composed: true,
        }));

    }

}

export { RichTextLessonComponent };
