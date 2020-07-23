
import {
    html, customElement, property,
} from 'lit-element';

// redux dependencies
import {
    isCreatingModule,
    isShowingModule,
    isEditingModule,
} from 'Selectors/Module';

// component dependencies
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Module/ModuleMain';
import 'Components/Module/ModuleCreate';

import { getStyles } from './Styles';

/**
 * ModuleView LitElement
 * template for /module
 */
@customElement('module-view')
class ModuleView extends PrivateViewComponent {

    @property({ type: Boolean })
    isShowingModule = false;

    @property({ type: Boolean })
    isEditingModule = false;

    @property({ type: Boolean })
    isCreatingModule = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        let content = '';

        if (this.isCreatingModule) {

            content = html`<module-create></module-create>`;

        } else if (this.isEditingModule) {

            content = html`<div>Editing Module</div>`;

        } else if (this.isShowingModule) {

            content = html`<module-main></module-main>`;

        }

        return html`
            <!-- ModuleView Component -->
            <div class="wrapper">
                ${content}
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.isShowingModule = isShowingModule(state);
        this.isEditingModule = isEditingModule(state);
        this.isCreatingModule = isCreatingModule(state);

    }

}

export { ModuleView };
