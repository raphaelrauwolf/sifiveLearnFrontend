
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * TimeStamp LitElement
 * template
 */
@customElement('time-stamp')
class TimeStamp extends LitElement {

    @property({ type: String })
    text = '';

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
            <!-- TimeStamp Component -->
            <div class="border">
                ${this.text}
            </div>
        `;

    }

}

export { TimeStamp };
