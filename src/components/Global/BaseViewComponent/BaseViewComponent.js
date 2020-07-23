
import {
    html, customElement, property,
} from 'lit-element';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { getStyles } from './Styles';

/**
 * BaseComponent LitElement
 * template
 */
@customElement('base-view-component')
class BaseViewComponent extends ConnectedComponent {

    @property({ type: Boolean })
    active = false;

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
            <div>This is the BaseView Component</div>
        `;

    }

    /**
     * Only update view if active
     * @param  {Map} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        return this.active;

    }

}

export { BaseViewComponent };
