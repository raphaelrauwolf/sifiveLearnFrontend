
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// redux dependencies
import { store } from 'Root/store';
import FormActions from 'Actions/Form';

import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveCheckbox';

import { getStyles } from './Styles';

/**
 * SifiveField LitElement
 * template
 */
@customElement('sifive-field')
class SifiveField extends connect(store)(LitElement) {

    @property({ type: String, attribute: 'field-id', reflect: true })
    fieldID = '';

    @property({ type: String, attribute: 'form-id', reflect: true })
    formID = '';

    @property({ type: String, reflect: true })
    value = '';

    @property({ type: String, reflect: true })
    name = '';

    @property({ type: String, reflect: true })
    type = 'text';

    @property({ type: String, reflect: true })
    placeholder = '';

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ type: String })
    validation = '';

    @property({ type: String, attribute: 'repeat-id', reflect: true })
    repeatID = ''

    @property({ type: Boolean, reflect: true })
    invalid = false;

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

        if (this.type === 'checkbox') {

            return html`
            <sifive-checkbox
                label="${this.label}"
                ?checked="${this.value}"
                ?required="${this.required}"
                @input="${this.onInput}">
            </sifive-checkbox>`;

        }

        return html`
            <!-- SifiveField Component -->
            <sifive-input
                name="${this.name}"
                type="${this.type}"
                .placeholder="${this.placeholder}"
                .value="${this.value}"
                ?required="${this.required}"
                @focus="${this.onFocus}"
                @blur="${this.onBlur}"
                @input="${this.onInput}">
            </sifive-input>
        `;

        /*


        <input
            type="${this.type}"
            .placeholder="${this.placeholder}"
            .value="${this.value}"
            ?required="${this.required}"
            @focus="${this.onFocus}"
            @blur="${this.onBlur}"
            @input="${this.onInput}"
        ></input>

         */

    }

    /**
     * Callback for initial update
     */
    firstUpdated() {

        store.dispatch(
            FormActions.initializeField(
                this.formID, this.fieldID, this.required,
            )
        );

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        if (state.Form[this.formID] && state.Form[this.formID][this.fieldID]) {

            const fieldState = state.Form[this.formID][this.fieldID];

            this.value = fieldState.Value || '';
            this.invalid = fieldState.Value && !fieldState.Valid;

        } else {

            this.value = '';

        }

    }

    /**
     * Focus Callback for email field
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFocus(event) {

        store.dispatch(FormActions.focusField(this.formID, this.fieldID));

    }

    /**
     * Blur Callback for email field
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBlur(event) {

        store.dispatch(FormActions.blurField(this.formID, this.fieldID));

    }

    /**
     * Input Callback for email field
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInput(event) {

        const value = this.type !== 'checkbox' ? event.target.value : event.target.checked;

        store.dispatch(
            FormActions.changeField(
                this.formID, this.fieldID,
                this.validation, value,
                this.repeatID,
            )
        );

    }

}

export { SifiveField };
