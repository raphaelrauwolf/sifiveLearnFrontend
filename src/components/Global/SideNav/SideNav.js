
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

// redux dependencies

// component dependencies
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import UIActions from 'Actions/UI'

import { topFactory } from './Factories/top';
import { bottomFactory } from './Factories/bottom';

import { getStyles } from './Styles';

/**
 * SideNav LitElement
 * template
 */
@customElement('side-nav')
class SideNav extends ConnectedComponent {

/*    @property({ type: Boolean, reflect: true })
    visible = false;*/

    @property({ type: Boolean, reflect: true })
    open = false;

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
            <!-- SideNavMain Component -->
            <nav
                @mouseenter=${this.onMouseEnter}
                @mouseleave=${this.onMouseLeave}>
                ${topFactory(this.open)}
                ${bottomFactory(this.open)}
            </nav>
        `;

    }

    expandSidebar(open) {
        this.open = open
        this.store.dispatch(UIActions.setSidebar(open))
    }

    /**
     * Callback for mouse enter
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseEnter(event) {

        this._isMouseIn = true;

        window.clearTimeout(this.__mouseLeaveTimeout);

        this.expandSidebar(true)


    }

    /**
     * Callback for mouse leave
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseLeave(event) {

        this._isMouseIn = false;

        this._mouseLeaveTimeout = window.setTimeout(() => {

            if (!this._isMouseIn) {

                this.expandSidebar(false)

            }

        }, 500);

    }

}

export { SideNav };
