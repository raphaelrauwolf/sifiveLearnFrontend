
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import { getStyles } from './Styles';

/**
 * SifiveDropzone LitElement
 * template
 */
@customElement('sifive-dropzone')
class SifiveDropzone extends LitElement {

    @property({ type: String })
    dropEventName = 'dropzone-drop';

    @property({ type: String })
    droppableClass = '';

    @property({ type: Object })
    payload = {};

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
            <!-- SifiveDropzone Component -->
            <slot @slotchange="${this.onSlotChange}"></slot>
        `;

    }

}

export { SifiveDropzone };
