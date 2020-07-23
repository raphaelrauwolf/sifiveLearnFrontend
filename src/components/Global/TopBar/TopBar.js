
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * TopBar LitElement
 * template
 */
@customElement('top-bar')
class TopBar extends LitElement {

    @property({ type: Boolean })
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
            <!-- TopBar Component -->
            <nav>
                <slot name="content"></slot>
            </nav>`;

    }

}

export { TopBar };
