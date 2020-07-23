
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * BaseComponent LitElement
 * template
 */
@customElement('base-component')
class BaseComponent extends LitElement {

    @property({ type: Boolean, attribute: true, reflect: true })
    visible = false;

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
            <!-- Base Component -->
            <div>This is the Base Component - ${this.visible}</div>
        `;

    }

}

export { BaseComponent };
