
import {
    html, customElement, property,
} from 'lit-element';

// redux dependencies
import {
    isCreatingLesson,
    isShowingLesson,
    isEditingLesson,
} from 'Selectors/Lesson';

// component dependencies
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Lesson/LessonCreate';
import 'Components/Lesson/LessonMain';

import { getStyles } from './Styles';

/**
 * LessonView LitElement
 * template for /lesson
 */
@customElement('lesson-view')
class LessonView extends PrivateViewComponent {

    @property({ type: Boolean })
    isShowingLesson = false;

    @property({ type: Boolean })
    isEditingLesson = false;

    @property({ type: Boolean })
    isCreatingLesson = false;

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

        if (this.isCreatingLesson) {

            content = html`<lesson-create></lesson-create>`;

        } else if (this.isEditingLesson) {

            content = html`<div>Editing Lesson</div>`;

        } else if (this.isShowingLesson) {

            content = html`<lesson-main></lesson-main>`;

        }

        return html`
            <!-- LessonView Component -->
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

        this.isShowingLesson = isShowingLesson(state);
        this.isEditingLesson = isEditingLesson(state);
        this.isCreatingLesson = isCreatingLesson(state);

    }

}

export { LessonView };
