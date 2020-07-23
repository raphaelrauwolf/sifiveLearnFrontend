
import {
    html, customElement, property,
} from 'lit-element';

import Router from 'Utils/Router';
import DOMUtils from 'Utils/DOMUtils';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { getStyles } from './Styles';

/**
 * ComponentRouter LitElement
 * template
 */
@customElement('component-router')
class ComponentRouter extends ConnectedComponent {

    @property({ type: Array })
    routes = [];

    @property({ type: Object })
    location = {};

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

        const slots = [];

        this.routes.some((route) => {

            const matches = Router.match(route.route);

            if (matches) {

                slots.push(html`<slot name="${route.name}"></slot>`);

                return true;

            }

        });

        if (slots.length <= 0) {

            const defaultRoute = this.routes.find(route => route.default);
            slots.push(html`<slot name="${defaultRoute.name}"></slot>`);

            Router.replace(defaultRoute.route);

        }

        return html`
            <!-- ComponentRouter Component -->
            ${slots}
        `;

    }

    /**
     * Callback for updated elenemt
     * @param  {Map} changedProps
     */
    updated(changedProps) {

        this.updateActiveView();

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.location = state.Router.Route;

    }

    firstUpdated() {
        console.log('ComponentRouter firstUpdated')
    }

    /**
     * Set active property for visible view
     */
    updateActiveView() {

        const slot = DOMUtils.q('slot', this.shadowRoot);
        const view = slot.assignedNodes()[0];

        if (view === this.currentView) {
            // TODO: Investigate why sidebar expansion/closing causes updated()
            return
        }

        if (view) {

            if (this.currentView) {

                this.currentView.active = false;

            }

            this.currentView = view;
            this.currentView.active = true;

            if (this.currentView.onPageNavigation) {
                this.currentView.onPageNavigation()
            }

        }

    }

}

export { ComponentRouter };
