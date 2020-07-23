
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifiveRoundButton LitElement
 * template
 */
@customElement('sifive-round-button')
class SifiveRoundButton extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: String })
    href = false;

    @property({ type: Boolean, attribute: true })
    red = false;

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

        if (this.href) {

            return html`
            <a href="${this.href}" >
                <slot name="icon"></slot>
            </a>`;

        } else {

            return html`
            <div>
                <slot name="icon"></slot>
            </div>`;

        }

    }

}

export { SifiveRoundButton };
