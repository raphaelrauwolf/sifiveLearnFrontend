
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/SifiveField';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveButton';
import 'Components/Module/ModuleAccordion';

import { availableContentFactory } from './Factories/availableContent';

// redux dependencies
import {
    getCreatedCourse,
} from 'Selectors/CourseCreation';
import {
    getCourses,
} from 'Selectors/NewCourse';
import CourseCreationActions from 'Actions/CourseCreation';

import { getStyles } from './Styles';

/**
 * CourseCreateSearch LitElement
 * template
 */
@customElement('course-create-search')
class CourseCreateSearch extends ConnectedComponent {

    @property({ type: Object })
    courses = {};

    @property({ type: Object })
    course = {};

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

        const availableContent = availableContentFactory(
            Object.values(this.courses), this.course.id, this.onAddClick);

        const filters = ['All', 'Modules', 'Lessons', 'Official'];

        return html`
            <!-- CourseCreateSearch -->
            <div class="grid-container">
                <div class="top-container">
                    <div class="search-container">
                        <sifive-field placeholder="Search modules, lessons or resources"></sifive-field>
                    </div>
                    <div class="button-container">
                        <sifive-dropdown label="Filter"
                            .items="${filters}"></sifive-dropdown>
                        <sifive-button label="Create Module"
                            @click="${this.onCreateModuleClick}"></sifive-button>
                        <sifive-button label="Create Lesson"
                            @click="${this.onCreateLessonClick}"></sifive-button>
                    </div>
                </div>
                <div class="content-container">
                    <h5>Available Content</h5>
                    ${availableContent}
                </div>
            </div>
        `;

    }

    /**
     * Redux update
     * @param  {Object} state
     */
    stateChanged(state) {

        this.courses = getCourses(state);
        this.course = getCreatedCourse(state);

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAddClick(event) {

        if (event.detail.module) {

            this.store.dispatch(
                CourseCreationActions.addModule(
                    event.detail.module.id)
            );

        } else {

            this.store.dispatch(
                CourseCreationActions.addLesson(
                    event.detail.lesson.id)
            );

        }

        this.dispatchEvent(new CustomEvent('add-click', {
            detail: {},
            bubbles: true,
            composed: true,
        }));

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCreateModuleClick(event) {

        this.dispatchEvent(new CustomEvent('create-module-click', {
            detail: {},
            bubbles: true,
            composed: true,
        }));

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCreateLessonClick(event) {

        this.dispatchEvent(new CustomEvent('create-lesson-click', {
            detail: {},
            bubbles: true,
            composed: true,
        }));

    }

}

export { CourseCreateSearch };
