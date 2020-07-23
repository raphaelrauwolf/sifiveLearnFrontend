
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { SifiveDraggable } from 'Components/Global/SifiveDraggable';

import { getStyles } from './Styles';

/**
 * SifiveSortable LitElement
 * template
 */
@customElement('sifive-sortable')
class SifiveSortable extends SifiveDraggable {

    @property({ type: String })
    sortGroup = '';

    @property({ type: Boolean })
    sortTarget = true;

    /**
     * Get highest parent node
     * @type {Node}
     */
    get parent() {

        return this.getParent();

    }

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
            <!-- SifiveSortable Component -->
            <slot @slotchange="${this.onSlotChange}"></slot>
        `;

    }

    /**
     * Find the highest parent node
     * @return {Node}
     */
    getParent() {

        let parent = this.parentNode;

        while (
            !(parent instanceof ShadowRoot) &&
            parent !== document.body
        ) {

            parent = parent.parentNode;

        }

        return parent;

    }

    /**
     * Find the next SifiveSortable
     * @return {Node}
     */
    getSortables() {

        return DOMUtils.a('sifive-sortable', this.parent);

    }

    /**
     * Get all sortables with the same sortGroup
     * @return {Array}
     */
    getGroupSortables() {

        return this.getSortables()
            .filter(sortable => sortable.sortGroup === this.sortGroup);

    }

    /**
     * Create a sorted array representing the sort result
     * @param {Number} index
     * @param {Number} targetIndex
     * @return {Array}
     */
    getSortedArray(index, targetIndex) {

        const length = this.getGroupSortables().length;

        const arr = [];

        for (let i = 0; i < length; i++) {

            arr[i] = i;

        }

        const cache = arr.splice(index, 1)[0];

        arr.splice(targetIndex, 0, cache);

        return arr;

    }

    /**
     * Get the index of a SifiveSortable sibling
     * @param {Node} $target
     * @return {Number}
     */
    getSortableIndex($target = this) {

        return this.getGroupSortables().indexOf($target);

    }

    /**
     * Find a SifiveSortable in the given event bubble path
     * @param {Event} event
     * @return {Node}
     */
    findClosestSortable(event) {

        const path = event.composedPath();

        let didFindSortable = false;
        const node = path.find(($node) => {

            const matches = $node instanceof SifiveSortable &&
                !$node.isSameNode(this) &&
                $node.sortTarget &&
                $node.sortGroup === this.sortGroup;

            if (!didFindSortable && matches) {

                didFindSortable = true;

                return matches;

            }

            return false;

        });

        return node;

    }

    /**
     * DragStart handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragStart(event) {

        super.onDragStart(event);

        this.sortableIndex = this.getSortableIndex();

    }

    /**
     * DragOver handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragOver(event) {

        super.onDragOver(event);

        const sortTarget = this.findClosestSortable(event);

        if (sortTarget && this.lastSortTarget !== sortTarget) {

            const targetIndex = this.getSortableIndex(sortTarget);
            const groupSortables = this.getGroupSortables();

            DOMUtils.addClass(this, 'sortable');
            DOMUtils.removeClass(groupSortables, 'sorttarget-before');
            DOMUtils.removeClass(groupSortables, 'sorttarget-after');

            if (targetIndex < this.sortableIndex) {

                if (targetIndex > 0) {

                    // DOMUtils.addClass(groupSortables[targetIndex - 1], 'sorttarget-after');

                }

                DOMUtils.addClass(sortTarget, 'sorttarget-before');

            } else {

                DOMUtils.addClass(sortTarget, 'sorttarget-after');

            }

            this.dispatchEvent(new CustomEvent('sortable-sortable', {
                detail: {
                    sortTarget,
                    targetIndex,
                    index: this.sortableIndex,
                },
                bubbles: false,
                composed: true,
            }));

            this.lastSortTarget = sortTarget;

        } else if (!sortTarget && this.lastSortTarget) {

            const groupSortables = this.getGroupSortables();

            DOMUtils.removeClass(this, 'sortable');
            DOMUtils.removeClass(groupSortables, 'sorttarget-before');
            DOMUtils.removeClass(groupSortables, 'sorttarget-after');

            this.lastSortTarget = undefined;

        }

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDragEnd(event) {

        super.onDragEnd(event);

        if (!this.dropped && this.lastSortTarget) {

            const targetIndex = this.getSortableIndex(this.lastSortTarget);
            const sortedArray =
                this.getSortedArray(this.sortableIndex, targetIndex);

            this.dispatchEvent(new CustomEvent('sorted', {
                detail: {
                    startIndex: this.sortableIndex,
                    targetIndex: targetIndex,
                    current: this,
                    target: this.lastSortTarget,
                    groupSortables: this.getGroupSortables(),
                    sortedArray,
                },
                bubbles: false,
                composed: true,
            }));

        }

        // remove all classes
        const groupSortables = this.getGroupSortables();
        DOMUtils.removeClass(groupSortables, 'sorttarget-before');
        DOMUtils.removeClass(groupSortables, 'sorttarget-after');
        DOMUtils.removeClass(this, 'sortable');

    }

}

export { SifiveSortable };
