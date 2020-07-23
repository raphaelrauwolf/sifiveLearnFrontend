
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SideNavButton LitElement
 * template
 */
@customElement('side-nav-button')
class SideNavButton extends LitElement {

    @property({ type: String })
    label = '';

    @property({ type: String })
    eyebrow = '';

    @property({ type: String })
    href = '';

    @property({ type: Boolean, attribute: 'label-hidden', reflect: true })
    labelHidden = false;

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

        if (this.href !== '') {

            return html`
            <!-- SideNavButton Component -->
            <a href="${this.href}" class="wrapper">
                <div class="icon">
                    <slot name="icon"></slot>
                </div>
                <div class="label">
                    <div class="eyebrow">${this.eyebrow}</div>
                    ${this.label}
                </div>
            </a>`;

        } else {

            return html`
                <!-- SideNavButton Component -->
                <div class="wrapper">
                    <div class="icon">
                        <slot name="icon"></slot>
                    </div>
                    <div class="label">
                        <div class="eyebrow">${this.eyebrow}</div>
                        ${this.label}
                    </div>
                </div>`;

        }

    }

}

export { SideNavButton };
