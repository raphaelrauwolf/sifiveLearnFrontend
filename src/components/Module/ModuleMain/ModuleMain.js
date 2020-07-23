
import {
    html, customElement, property,
} from 'lit-element';

import {
    getModuleID,
    getModule,
    isShowingModule,
} from 'Selectors/Module';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SifiveLoader';

import { lessonListFactory } from './Factories/lessonList';

import { getStyles } from './Styles';

/**
 * ModuleMain LitElement
 * template
 */
@customElement('module-main')
class ModuleMain extends ConnectedComponent {

    @property({ type: Object })
    module = {};

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

        if (!this.module) {

            return html`<sifive-loader></sifive-loader>`;

        }

        return html`
            <!-- ModuleMain -->
            <div class="grid-container">
                <h5>${this.module.name}</h5>
                <div class="info-container">
                    <div class="description">${this.module.description}</div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number">${this.module.lessons.length}</span>
                            <span class="stat-text">Lessons</span>
                        </div>
                    </div>
                    <div class="estimate-time">
                        <img src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon" />
                        Est. Time &vert;&nbsp; <b>6 H 25 M</b>
                    </div>
                </div>

                ${lessonListFactory(this.module.lessons)}
            </div>
        `;

    }

    /**
     * Redux update
     * @param  {Object} state
     */
    stateChanged(state) {

        this.active = isShowingModule(state);
        this.moduleID = getModuleID(state);

        if (this.active && this.moduleID) {

            this.module = getModule(state, this.moduleID);

        }

    }

}

export { ModuleMain };
