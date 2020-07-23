
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { getStyles } from './Styles';

/**
 * SifiveRadio LitElement
 * template
 */
@customElement('sifive-radio')
class SifiveRadio extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    checked = false;

    @property({ type: Boolean })
    required = false;

    @property({ type: String })
    name = '';

    @property({ type: String })
    value = '';

    @property({ type: String })
    label = '';

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
            <!-- SifiveRadio Component -->
            <label>
                <input
                    type="radio"
                    name="${this.name}"
                    value="${this.value}"
                    ?checked="${this.checked}"
                    ?disabled="${this.disabled}"
                    ?required="${this.required}"
                    @input="${this.onInput}"
                />
                ${this.label}
            </label>
        `;

    }

    /**
     *
     */
    updated() {

        const $input = DOMUtils.q('input', this.shadowRoot);
        $input.checked = this.checked;

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInput(event) {

        this.checked = event.target.checked;

    }

}

export { SifiveRadio };
