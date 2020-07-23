
import {
    LitElement, html, customElement,
} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// redux dependencies
import { store } from 'Root/store';

import { getStyles } from './Styles';

/**
 * ConnectedComponent LitElement
 * template
 */
@customElement('connected-component')
class ConnectedComponent extends connect(store)(LitElement) {

    store = store;

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
            <!-- ConnectedComponent Component -->
            <div>This is the ConnectedComponent Component</div>
        `;

    }

}

export { ConnectedComponent };
