
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifiveInput LitElement
 * template
 */
@customElement('sifive-input')
class SifiveInput extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: Boolean, attribute: 'strong-placeholder' })
    strongPlaceholder = false;

    @property({ type: Boolean, attribute: true })
    small = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    focus = false;

    @property({ type: Boolean })
    required = false;

    @property({ type: String, reflect: true })
    name = '';

    @property({ type: String })
    type = 'text';

    @property({ type: String })
    placeholder = '';

    @property({ type: String })
    value = '';

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
            <!-- SifiveInput Component -->
            <slot name="icon"></slot>
            <input
                type="${this.type}"
                name="${this.name}"
                placeholder="${this.placeholder}"
                .value="${this.value}"
                ?disabled=${this.disabled}
                ?required=${this.required}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                @input=${this.onInput} />
        `;

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFocus(event) {

        this.focus = true;

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBlur(event) {

        this.focus = false;

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInput(event) {

        this.value = this.type !== 'checkbox' ?
            event.target.value :
            event.target.value === 'on';

    }

}

export { SifiveInput };
