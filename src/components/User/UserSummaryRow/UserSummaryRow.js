
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import { ROLES } from 'Constants/User';

import 'Components/Global/SifiveRoundButton';
import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * UserSummaryRow LitElement
 * template
 */
@customElement('user-summary-row')
class UserSummaryRow extends LitElement {

    @property({ type: Object })
    user = {}

    @property({ type: Array })
    progresses = [];

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

        const role = ROLES[this.user.permissions.role].LABEL;

        let expandButton;

        if (this.progresses.length > 1) {

            expandButton = html`
                <div class="expand">
                    <sifive-round-button @click="${this.onExpandClick}">
                        ${this.open ?
                            html`<svg-icon slot="icon" src="assets/images/icons/arrow_collapse.svg"></svg-icon>`:
                            html`<svg-icon slot="icon" src="assets/images/icons/arrow_expand.svg"></svg-icon>`}
                    </sifive-round-button>
                </div>
            `;

        }

        const progresses = this.progresses.map((course, index) => {

            return html`
                <div class="course-entry">
                    <div class="course-progress">
                        <a href="/course/${course.id}"><b>${course.name}</b></a><br />
                        <course-progress-bar percent="${course.progress}"></course-progress-bar>
                    </div>
                </div>`;

        });

        return html`
            <!-- UserSummaryRow Component -->
            <div class="member">
                <div class="member-background"></div>
                <div class="member-info">
                    <a href="/user/${this.user.id}"><b>${this.user.firstname} ${this.user.lastname}</b></a><br />
                    ${role}
                </div>
                <div class="member-progress">
                    ${progresses}
                </div>
                ${expandButton}
                <div class="member-actions">
                    <slot name="actions"></slot>
                </div>
            </div>`;

    }


    /**
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onExpandClick(event) {

        this.open = !this.open;

    }

}

export { UserSummaryRow };
