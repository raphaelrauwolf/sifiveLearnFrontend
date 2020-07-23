
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { getStyles } from './Styles';

/**
 * SifiveUpload LitElement
 * template
 */
@customElement('sifive-upload')
class SifiveUpload extends LitElement {

    @property({ type: Boolean, attribute: true, reflect: true })
    highlighted = false;

    @property({ type: Boolean, reflect: true })
    pending = false;

    @property({ type: Boolean })
    multiple = false;

    @property({ type: String })
    accept = '';


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

        return html`
            <!-- SifiveUpload Component -->
            <div class="wrapper"
                @dragenter="${this.onDragEnter}"
                @dragover="${this.onDragOver}"
                @dragleave="${this.onDragLeave}"
                @drop="${this.onDrop}">
                <div class="label">
                    ${!this.pending ?
                        'Click or drop to upload' :
                        'Uploading ...'}
                </div>
                <input type="file"
                    ?disabled=${this.pending}
                    ?multiple=${this.multiple}
                    @change=${this.onFileChange}
                    accept="${this.accept}">
            </div>
        `;

    }

    /**
     * select elements
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.$droppZone = DOMUtils.q('.wrapper', this.shadowRoot);
        this.$input = DOMUtils.q('input', this.shadowRoot);

    }

    /**
     *
     */
    highlight() {

        this.highlighted = true;

    }

    /**
     *
     */
    unhighlight() {

        this.highlighted = false;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onDragEnter(event) {

        event.preventDefault();
        event.stopPropagation();

        this.highlight();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onDragOver(event) {

        event.preventDefault();
        event.stopPropagation();

        this.highlight();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onDragLeave(event) {

        event.preventDefault();
        event.stopPropagation();

        this.unhighlight();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onDrop(event) {

        event.preventDefault();
        event.stopPropagation();

        this.unhighlight();

        const dataTransfer = event.dataTransfer;
        const files = dataTransfer.files;

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                files,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onFileChange(event) {

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                files: this.$input.files,
            },
            bubbles: true,
            composed: true,
        }));

    }


}

export { SifiveUpload };
