
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { getStyles } from './Styles';

/**
 * SifiveRadioGroup LitElement
 * template
 */
@customElement('sifive-radio-group')
class SifiveRadioGroup extends LitElement {

    @property({ type: String })
    label = '';

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
            <!-- SifiveRadioGroup Component -->
            <div>
                <slot @slotchange="${this.onSlotChange}"></slot>
            </div>
        `;

    }

    /**
     * select elements
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.$slot = DOMUtils.q('slot', this.shadowRoot);

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSlotChange(event) {

        const $nodes = this.$slot.assignedNodes().filter(node => node.tagName);

        // select radios
        this.$radios = [];

        $nodes.forEach(($node) => {

            this.$radios = [
                ...this.$radios,
                ...DOMUtils.a('sifive-radio', $node),
            ];

        });

        this.$nodes = this.$slot.assignedNodes().filter(node => node.tagName);

        DOMUtils.onDelegate($nodes, 'sifive-radio', 'input', ::this.onInput);

    }

    /**
     * @param {Element} $target
     */
    updateRadioStates($target) {

        this.$radios = [];

        this.$nodes.forEach(($node) => {

            this.$radios = [
                ...this.$radios,
                ...DOMUtils.a('sifive-radio', $node),
            ];

        });

        const index = this.$radios.indexOf($target);

        this.$radios.forEach(($radio) => {

            if (!$target.isSameNode($radio)) {

                $radio.checked = false;

            }

        });

        this.dispatchEvent(new CustomEvent('input', {
            detail: {
                index,
                target: $target,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * Click event callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInput(event) {

        this.updateRadioStates(event.target);

        event.stopPropagation();

    }

}

export { SifiveRadioGroup };
