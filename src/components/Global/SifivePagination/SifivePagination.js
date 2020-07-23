
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { hasArrayChanged } from 'Components/hasArrayChanged';

import { getStyles } from './Styles';

import { itemsFactory } from './Factories/items';
import { paginationFactory } from './Factories/pagination';

/**
 * SifivePagination LitElement
 * template
 */
@customElement('sifive-pagination')
class SifivePagination extends LitElement {

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    items = [];

    @property({ type: Array })
    slotItems = [];

    @property({ type: Number })
    activePageIndex = 0;

    @property({ type: Number })
    pageLength = 0;

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

        const contentItems = this.items.length > 0 ?
            this.items : this.slotItems;

        return html`
            <!-- SifivePagination Component -->
            <div class="list-wrapper">
                ${itemsFactory(this.activePageIndex, this.pageLength, this.items)}
                <slot></slot>
            </div>
            <div class="ui">
                <slot name="actions"></slot>
                ${paginationFactory(
                    this.activePageIndex, this.pageLength, contentItems,
                    ::this.setActivePage)}
            </div>`;

    }

    /**
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        this.$slot = DOMUtils.q('slot', this.shadowRoot);
        this.slotItems = this.$slot.assignedNodes()
            .filter(node => node.tagName);

    }

    /**
     * @param  {Map} changedProps
     */
    updated(changedProps) {

        if (changedProps.has('activePageIndex')) {

            if (this.items.length <= 0 && this.slotItems) {

                DOMUtils.removeClass(this.slotItems, 'visible');

                const startIndex = this.activePageIndex * this.pageLength;

                const visibleSlotItems = [...this.slotItems]
                    .slice(startIndex, startIndex + this.pageLength);

                DOMUtils.addClass(visibleSlotItems, 'visible');

            }

        }

    }

    /**
     * Set the active page index
     * @param {Number} index
     */
    setActivePage(index = 0) {

        this.activePageIndex = index;

    }

}

export { SifivePagination };
