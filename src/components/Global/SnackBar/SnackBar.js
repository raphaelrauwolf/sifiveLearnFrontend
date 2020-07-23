
import {
    html, customElement, property,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

// redux dependencies
import { isVisible, getContent, getMode } from 'Selectors/Notification';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { ERROR_MODE } from 'Constants/Notification';
import { getStyles } from './Styles';

/**
 * SideNav LitElement
 * template
 */
@customElement('snack-bar')
class SnackBar extends ConnectedComponent {

    @property({ type: Boolean, reflect: true })
    visible = false;

    @property({ type: String, reflect: true })
    mode = ERROR_MODE;

    @property({ type: String })
    content = '';

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
            <!-- SnackBar Component -->
            <div class="wrapper">${unsafeHTML(this.content)}</div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.visible = isVisible(state);
        this.content = getContent(state);
        this.mode = getMode(state);

    }

}

export { SnackBar };
