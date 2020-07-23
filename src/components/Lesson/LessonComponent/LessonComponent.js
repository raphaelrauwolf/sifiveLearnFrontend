
import {
    html, customElement, property,
} from 'lit-element';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { getStyles } from './Styles';

/**
 * LessonComponent LitElement
 * template
 */
@customElement('lesson-component')
class LessonComponent extends ConnectedComponent {

    @property({ type: Boolean })
    editing = false;

    @property({ type: Object })
    data = {};

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
            <!-- LessonComponent -->
            LessonComponent
        `;

    }

    /**
     * @param {Map} changedProps
     */
    updated(changedProps) {}

    /**
     * Check if component can be sent to server
     * @return {Boolean}
     */
    isIncomplete() {

        return true;

    }

}

export { LessonComponent };
