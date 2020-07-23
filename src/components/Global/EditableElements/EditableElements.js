
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { getStyles } from './Styles';

/**
 * EditableElement LitElement
 * template
 */
@customElement('editable-element')
class EditableElement extends LitElement {

    @property({ type: String })
    placeholder = '';

    @property({ type: String })
    value = '';

    @property({ type: Boolean })
    multiline = true;

    @property({ type: Boolean, attribute: true, reflect: true })
    changed = false;

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
            <!-- EditableElement Component -->
            <div contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</div>
        `;

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        return (changedProps.has('value') && changedProps.get('value') === undefined) || changedProps.has('changed');

    }

    /**
     * Setup editor
     * @param {Object} changedProps
     */
    firstUpdated(changedProps) {

        if (changedProps.has('value') && this.value !== '' && typeof this.value !== 'undefined') {

            this.changed = true;

        }

        this.$element = DOMUtils.q(':host > *', this.shadowRoot);

    }

    /**
     * Blur callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBlur(event) {

        if (this.ignoreNextFocus) {

            return;

        }

        if (this.value === '') {

            this.value = this.placeholder;
            this.changed = false;

        }

    }

    /**
     * Focus callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFocus(event) {

        if (this.ignoreNextFocus) {

            this.ignoreNextFocus = false;
            return;

        }

        if (!this.changed) {

            this.value = '';
            this.changed = true;

        }

        this.ignoreNextFocus = true;

        this.$element.blur();
        this.$element.focus();

    }

    /**
     * Change callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInput(event) {

        this.value = DOMUtils.text(this.$element);
        this.changed = true;

    }

    /**
     * Keydown callback
     * @param {Object} event
     * @return {Boolean}
     */
    onKeydown(event) {

        if (!this.multiline && event.keyCode === 13) {

            event.preventDefault();
            event.stopPropagation();

            return false;

        }

        return true;

    }

}

export { EditableElement };

/**
 * EditableH1 LitElement
 * template
 */
@customElement('editable-h1')
class EditableH1 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H1 Component -->
            <h1 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h1>
        `;

    }

}

export { EditableH1 };

/**
 * EditableH2 LitElement
 * template
 */
@customElement('editable-h2')
class EditableH2 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H2 Component -->
            <h2 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h2>
        `;

    }

}

export { EditableH2 };


/**
 * EditableH3 LitElement
 * template
 */
@customElement('editable-h3')
class EditableH3 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H3 Component -->
            <h3 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h3>
        `;

    }

}

export { EditableH3 };


/**
 * EditableH4 LitElement
 * template
 */
@customElement('editable-h4')
class EditableH4 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H4 Component -->
            <h4 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h4>
        `;

    }

}

export { EditableH4 };


/**
 * EditableH5 LitElement
 * template
 */
@customElement('editable-h5')
class EditableH5 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H5 Component -->
            <h5 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h5>
        `;

    }

}

export { EditableH5 };


/**
 * EditableH6 LitElement
 * template
 */
@customElement('editable-h6')
class EditableH6 extends EditableElement {

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- EditableElement H6 Component -->
            <h6 contenteditable="true"
                @blur=${this.onBlur}
                @focus=${this.onFocus}
                @input=${this.onInput}
                @keydown=${this.onKeydown}
            >${!this.changed ? this.placeholder : this.value}</h6>
        `;

    }

}

export { EditableH6 };
