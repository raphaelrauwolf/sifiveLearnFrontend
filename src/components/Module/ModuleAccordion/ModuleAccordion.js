
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveRoundButton';
import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * ModuleAccordion LitElement
 * template
 */
@customElement('module-accordion')
class ModuleAccordion extends LitElement {

    @property({ type: Object })
    module = {}

    @property({ type: Boolean })
    openable = false;

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

        let creatorInfo;
        const creator = this.module.creator;

        if (creator) {

            const creatorName = `${creator.firstname} ${creator.lastname}`;
            creatorInfo = html`<div class="creator">Created by <a href="/user/${creator.id}">${creatorName}</a></div>`;

        }

        let openButton;

        if (this.openable) {

            openButton = html`
            <sifive-round-button @click="${this.onExpandClick}">
                ${this.open ?
                    html`<svg-icon slot="icon" src="assets/images/icons/arrow_collapse.svg"></svg-icon>`:
                    html`<svg-icon slot="icon" src="assets/images/icons/arrow_expand.svg"></svg-icon>`}
            </sifive-round-button>`;

        }

        return html`
            <!-- ModuleAccordion Component -->
            <div class="wrapper">
                <div class="info">
                    <h5>
                        <svg-icon src="assets/images/icons/module.svg" alt="Module Icon"></svg-icon>
                        ${this.module.name}
                    </h5>
                    ${creatorInfo}
                </div>
                <div class="bar-content">
                    <slot name="bar-content"></slot>
                    ${openButton}
                </div>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>`;

    }

    /**
     * Expand click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onExpandClick(event) {

        this.open = !this.open;

    }

}

export { ModuleAccordion };
