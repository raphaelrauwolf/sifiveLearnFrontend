
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { hasArrayChanged } from 'Components/hasArrayChanged';

import { getStyles } from './Styles';

/**
 * SifiveDropdown LitElement
 * template
 */
@customElement('sifive-dropdown')
class SifiveDropdown extends LitElement {

    @property({ type: Boolean, attribute: true })
    disabled = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    open = false;

    @property({ type: Boolean, attribute: 'label-selectable' })
    labelSelectable = false;

    @property({ type: String })
    label = '';

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    items = [];

    @property({ type: Number })
    activeIndex = false;


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

        let label = this.label;

        if (this.activeIndex !== false) {

            label = this.items[this.activeIndex];

        }

        return html`
            <!-- SifiveDropdown Component -->
            <div class="dropdown" @click="${this.onDropdownClick}">
                <slot name="icon"></slot>
                <div class="label">${label}</div>
                <div class="divider"></div>
                <div class="arrow"></div>
            </div>
            <div class="menu">
                ${this.labelSelectable ?
                    html`
                    <div class="item" @click="${this.onItemClick}">
                        ${this.label}
                    </div>` : ''}
                ${this.items.map(item => html`<div class="item" @click="${this.onItemClick}">${item}</div>`)}
            </div>
        `;

    }

    /**
     * Click Callback for dropdown button
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDropdownClick(event) {

        this.open = !this.open;

    }

    /**
     * Click Callback for item
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onItemClick(event) {

        this.open = false;

        if (this.labelSelectable) {

            const index = DOMUtils.index(event.currentTarget);
            this.activeIndex = index === 0 ? false : index - 1;

        } else {

            this.activeIndex = DOMUtils.index(event.currentTarget);

        }

        this.dispatchEvent(new CustomEvent('input', {
            detail: {
                index: this.activeIndex,
                value: this.items[this.activeIndex],
            },
            bubbles: true,
            composed: true,
        }));

    }

}

export { SifiveDropdown };
