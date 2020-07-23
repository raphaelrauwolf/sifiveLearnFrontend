
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/EditableElements';
import 'Components/Global/SifiveButton';

// redux dependencies
import {
    getActiveCourse,
} from 'Selectors/LearnMaterial';
import ModuleActions from 'Actions/Module';

import { getStyles } from './Styles';

/**
 * ModuleCreate LitElement
 * template
 */
@customElement('module-create')
class ModuleCreate extends ConnectedComponent {

    @property({ type: String })
    nameValue = '';

    @property({ type: String })
    descriptionValue = '';

    @property({ type: Object })
    course = false;

    @property({ type: Boolean })
    canContinue = false;

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
            <!-- CourseCreateNaming -->
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your module a name"
                        @input="${this.onNameInput}"></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the module"
                        @input="${this.onDescriptionInput}"></editable-h4>
                </div>
            </div>

            ${this.canContinue ?
                html`
                <div class="grid-container button-container">
                    <sifive-button label="Continue" @click="${this.onContinueClick}"></sifive-button>
                </div>`:
                html``}
        `;

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        this.canContinue = this.nameValue.length > 0 &&
            this.descriptionValue.length > 0;

    }

    /**
     * Redux update
     * @param  {Object} state
     */
    stateChanged(state) {

        this.course = getActiveCourse(state);

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNameInput(event) {

        this.nameValue = event.currentTarget.value;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDescriptionInput(event) {

        this.descriptionValue = event.currentTarget.value;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onContinueClick(event) {

        this.store.dispatch(
            ModuleActions.createModule({
                name: this.nameValue,
                description: this.descriptionValue,
            }, this.course.id)
        ).then((data) => {

            this.dispatchEvent(
                new CustomEvent('module-created', {
                    detail: {
                        module: data.response,
                    },
                    bubbles: true,
                    composed: true,
                })
            );

        });

    }

}

export { ModuleCreate };
