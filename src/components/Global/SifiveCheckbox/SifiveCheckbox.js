
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifiveCheckbox LitElement
 * template
 */
@customElement('sifive-checkbox')
class SifiveCheckbox extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    checked = false;

    @property({ type: Boolean })
    required = false;

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
            <!-- SifiveCheckbox Component -->
            <label>
                <input
                    type="checkbox"
                    .checked="${this.checked}"
                    ?required="${this.required}"
                    @input="${this.onInput}"
                    />
                ${this.label}
            </label>
        `;

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

export { SifiveCheckbox };
