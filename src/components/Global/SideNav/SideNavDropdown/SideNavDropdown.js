
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { getStyles } from './Styles';

/**
 * SideNavDropdown LitElement
 * template
 */
@customElement('side-nav-dropdown')
class SideNavDropdown extends LitElement {

    @property({ type: String })
    label = '';

    @property({ type: String })
    eyebrow = '';

    @property({ type: Boolean, attribute: 'label-hidden', reflect: true })
    labelHidden = false;

    @property({ type: Array })
    dropdownList = [];

    @property({ type: Number })
    dropdownActiveIndex = 0;

    @property({ type: Boolean })
    openDropdown = false;


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
            <!-- SideNavDropdown Component -->
            <div class="wrapper"
                @click=${this.onClick}
                @mouseenter=${this.onMouseEnter}
                @mouseleave=${this.onMouseLeave}>
                <div class="icon">
                    <slot name="icon"></slot>
                </div>
                <div class="label">
                    <div class="eyebrow">${this.eyebrow}</div>
                    ${this.dropdownList[this.dropdownActiveIndex] || this.label}
                </div>
                <div class="arrow"></div>
                <div class="dropdown-list ${this.openDropdown ? 'open' : ''}">
                    <ul>
                        ${html`${this.dropdownList.map(item => html`<li @click="${this.onDropdownItemClick}">${item}</li>`)}`}
                    </ul>
                </div>
            </div>
        `;

    }

    /**
     * Set new active dropdown item
     * @param {Number} index
     */
    setDrowndownAciveIndex(index) {

        this.dropdownActiveIndex = index;

        this.dispatchEvent(new CustomEvent('dropdown-select', {
            detail: {
                index,
                item: this.dropdownList[index],
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * Callback for click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onClick(event) {

        this.openDropdown = !this.openDropdown;

    }

    /**
     * Callback for mouseenter
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseEnter(event) {

        window.clearTimeout(this.closeDropdownTimeout);

    }

    /**
     * Callback for mouseleave
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMouseLeave(event) {

        if (this.openDropdown) {

            this.closeDropdownTimeout = window.setTimeout(() => {

                this.openDropdown = false;

            }, 1000);

        }

    }

    /**
     * Callback for dropdown item click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDropdownItemClick(event) {

        this.setDrowndownAciveIndex(DOMUtils.index(event.target));

    }

}

export { SideNavDropdown };
