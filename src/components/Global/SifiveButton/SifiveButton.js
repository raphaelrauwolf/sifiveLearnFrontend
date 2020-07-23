
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifiveButton LitElement
 * template
 */
@customElement('sifive-button')
class SifiveButton extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: Boolean })
    propagation = false;

    @property({ type: String })
    href = false;

    @property({ type: String })
    label = '';

    @property({ type: String })
    class = '';

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

        const content = html`
            <div class="label">
                ${this.label}
            </div>
            <div class="flex"></div>
            <div class="icon">
                <slot name="icon"></slot>
            </div>
        `;

        if (this.href) {

            return html`
            <a href="${this.href}">
                ${content}
            </a>`;

        } else {

            return html`
            <div class=${this.class} @click="${this.onClick}">
                ${content}
            </div>`;

        }

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({})
    onClick(event) {

        if (this.disabled) {

            event.preventDefault();
            event.stopPropagation();

        } else if (!this.href) {

            if (!this.propagation) {

                event.preventDefault();
                event.stopPropagation();

            }

            this.dispatchEvent(new CustomEvent('click', {
                detail: {},
                bubbles: true,
                composed: true,
            }));

        }

    }

}

export { SifiveButton };
