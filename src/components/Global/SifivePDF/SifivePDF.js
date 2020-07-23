
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifivePDF LitElement
 * template
 */
@customElement('sifive-pdf')
class SifivePDF extends LitElement {

    @property({ type: String })
    src = '';

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
            <!-- SifivePDF Component -->
            <iframe src="${this.src}" frameborder="0"></iframe>
        `;

    }

}

export { SifivePDF };
