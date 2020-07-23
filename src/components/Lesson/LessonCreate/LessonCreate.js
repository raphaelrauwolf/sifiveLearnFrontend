
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import _debounce from 'lodash.debounce';

import DOMUtils from 'Utils/DOMUtils';

// redux dependencies
import {
    getActiveCourse, getActiveModule,
} from 'Selectors/LearnMaterial';
import {
    shouldFetchMedia, isFetchingMediaList, getMediaList,
} from 'Selectors/Media';
import MediaActions from 'Actions/Media';
import LessonActions from 'Actions/Lesson';

// component dependencies
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveRoundButton';
import 'Components/Global/EditableElements';

// lesson components
import 'Components/Lesson/Components/RichTextLessonComponent';
import 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import 'Components/Lesson/Components/MediaFilesLessonComponent';
import 'Components/Lesson/Components/AssessmentLessonComponent';

import { componentFactory } from './Factories/component';
import { selectComponentFactory } from './Factories/selectComponent';

import { getStyles } from './Styles';

/**
 * LessonCreate LitElement
 * template
 */
@customElement('lesson-create')
class LessonCreate extends ConnectedComponent {

    @property({ type: String })
    nameValue = '';

    @property({ type: String })
    descriptionValue = '';

    @property({ type: Array })
    components = [];

    @property({ type: Object })
    course = false;

    @property({ type: Object })
    module = false;

    @property({ type: Object })
    lesson = {
        incomplete: true,
        name: 'Unnamed Lesson',
        description: '',
        content: '',
    };

    @property({ type: Object })
    media = {};

    @property({ type: Boolean })
    canAddComponent = this.checkCanAddComponent();

    @property({ type: Boolean })
    isAddingComponent = false;

    didCreate = false;
    isCreating = false;

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

        const components = html`${this.components.map((component, index) =>
            componentFactory(this, component, index, index < this.components.length - 1))}`;

        const selectComponent = selectComponentFactory(this);

        return html`
            <!-- CourseCreateNaming -->
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your lesson a name"
                        @input="${this.onNameInput}"
                        value="${this.nameValue}"></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the lesson"
                        @input="${this.onDescriptionInput}"
                        value="${this.descriptionValue}"></editable-h4>
                </div>
            </div>

            ${components}

            ${selectComponent}

            ${this.canAddComponent && !this.isAddingComponent ?
                html`
                <div class="grid-container add-button-container">
                    <div class="dotted-line"></div>
                    <sifive-button label="Add Component" @click="${this.onAddComponentClick}">
                        <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                    </sifive-button>
                </div>`: ''}
        `;

    }

    /**
     * Create Lesson
     * @param  {Map} changedProps map of changed properties
     */
    firstUpdated(changedProps) {

        this.createLesson();

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        this.canAddComponent = this.checkCanAddComponent();

        if (this.shouldFetchMedia && !this.isFetchingMediaList) {

            this.store.dispatch(MediaActions.getMediaList());

        }

        if (
            (changedProps.has('descriptionValue') && changedProps.get('descriptionValue')) ||
            (changedProps.has('nameValue') && changedProps.get('nameValue')) ||
            (changedProps.has('components') && changedProps.get('components'))
        ) {

            this.lesson = {
                ...this.lesson,
                incomplete: this.checkIncompleteComponents(),
                name: this.nameValue,
                description: this.descriptionValue,
                content: this.getContent(),
            };

            this.updateLesson();

        }

    }

    /**
     * Redux update
     * @param  {Object} state
     */
    stateChanged(state) {

        this.shouldFetchMedia = shouldFetchMedia(state);
        this.isFetchingMediaList = isFetchingMediaList(state);

        this.media = getMediaList(state);
        this.course = getActiveCourse(state);
        this.module = getActiveModule(state);

    }

    /**
     * Create a lesson
     */
    createLesson() {

        if (this.isCreating || this.didCreate) {

            return;

        }

        this.isCreating = true;
        this.didCreate = true;

        this.store.dispatch(
            LessonActions.createLesson(
                this.lesson,
                this.course.id,
                this.module.id,
            )
        ).then((data) => {

            this.didCreate = true;
            this.isCreating = false;

            this.lesson = {
                ...this.lesson,
                ...data.response,
            };

            this.dispatchEvent(
                new CustomEvent('lesson-created', {
                    detail: {
                        lesson: data.response,
                    },
                    bubbles: true,
                    composed: true,
                })
            );

        }).catch((error) => {

            this.isCreating = false;
            this.didCreate = false;

        });

    }

    /**
     * Update the current lesson
     */
    updateLesson = _debounce(() => {

        this.checkIncompleteComponents();

        if (!this.didCreate) {

            this.createLesson();

            return;

        }

        this.store.dispatch(
            LessonActions.updateLesson(
                this.lesson,
                this.course.id,
                this.module.id,
                this.lesson.id,
            ),
        ).then((data) => {

            this.dispatchEvent(
                new CustomEvent('lesson-updated', {
                    detail: {
                        updates: data.response,
                    },
                    bubbles: true,
                    composed: true,
                })
            );

        });

    }, 5000);

    /**
     * Add a new component
     * @param {String} type component type
     */
    addComponent(type) {

        this.components = [
            ...this.components,
            {
                id: this.components.length,
                type: type,
                editing: true,
                dragging: false,
            },
        ];

        this.isAddingComponent = false;

    }

    /**
     * Sorts the Components depending on the sorted event
     * @param {Number} index
     * @param {Array} sortedArray
     */
    sortComponents(index, sortedArray) {

        const components = [];

        sortedArray.forEach((entry, index) =>
            components[index] = this.components[entry]);

        this.components = components;

    }

    /**
     * Deletes a component and fires change event
     * @param {Number} index
     */
    deleteComponent(index) {

        const components = [...this.components];
        components.splice(index, 1);

        this.components = components;

    }

    /**
     * Update the component data used for lesson creation
     * @param {Number} index
     * @param {Object} componentData
     */
    updateComponentData(index, componentData) {

        const component = DOMUtils.a([
            '.component rich-text-lesson-component',
            '.component questions-answers-lesson-component',
            '.component media-files-lesson-component',
            '.component assessment-lesson-component',
        ].join(','), this.shadowRoot)[index];

        const cache = [
            ...this.components,
        ];
        cache[index].data = component.data;

        this.components = cache;

    }

    /**
     * @return {String}
     */
    getContent() {

        const contents = DOMUtils.a([
            '.component rich-text-lesson-component',
            '.component questions-answers-lesson-component',
            '.component media-files-lesson-component',
            '.component assessment-lesson-component',
        ].join(','), this.shadowRoot).map(($component, index) => {

            return $component.getContent();

        });

        return JSON.stringify(contents);

    }

    /**
     * Check if new component can be added
     * @return {Boolean}
     */
    checkCanAddComponent() {

        return this.nameValue.length > 0 && this.descriptionValue.length > 0;

    }

    /**
     * Check if a component has no content
     * @return {Boolean}
     */
    checkIncompleteComponents() {

        const components = DOMUtils.a([
            '.component rich-text-lesson-component',
            '.component questions-answers-lesson-component',
            '.component media-files-lesson-component',
            '.component assessment-lesson-component',
        ].join(','), this.shadowRoot).map(($component, index) => {

            return {
                index,
                isIncomplete: $component.isIncomplete(),
                component: $component,
            };

        });

        const isIncomplete = components.find(comp => comp.isIncomplete);

        components.forEach((comp) => {

            if (comp.isIncomplete) {

                DOMUtils.addClass(comp.component, 'error');

            } else {

                DOMUtils.removeClass(comp.component, 'error');

            }

        });

        return !isIncomplete;

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
    onAddComponentClick(event) {

        this.isAddingComponent = true;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCloseButtonClick(event) {

        this.isAddingComponent = false;

    }

}

export { LessonCreate };
