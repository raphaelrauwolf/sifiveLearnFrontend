
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import _debounce from 'lodash.debounce';

import DOMUtils from 'Utils/DOMUtils';

// Redux Actions
import LessonActions from 'Actions/Lesson';

// Redux Selectors
import { isFetchingLesson } from 'Selectors/Lesson';

// Components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SifiveLoader';

// Factories
import { namingFactory } from './Factories/naming';
import { componentsFactory } from './Factories/components';
import { addComponentFactory } from './Factories/addComponent';

import { getStyles } from './Styles';

// Action states
const OVERVIEW = 'ACTION.OVERVIEW';
const ADDING_COMPONENT = 'ACTION.ADDING_COMPONENT';

/**
 * LessonComposing LitElement
 * template
 */
@customElement('lesson-composing')
class LessonComposing extends ConnectedComponent {

    @property({ type: Object })
    lesson = {
        incomplete: true,
        name: '',
        description: '',
        content: '',
    };

    @property({ type: Array })
    components = [];

    @property({ type: String })
    action = OVERVIEW;

    @property({ type: Boolean })
    isFetching = false;

    _isEditing = false;
    _didCreateLesson = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * @return {String}  html output
     */
    render() {

        if (this.isFetching) {

            return html`<sifive-loader></sifive-loader>`;

        }

        return html`
            <!-- LessonComposing Component -->
            ${namingFactory(
                this.lesson.name,
                this.lesson.description,
                this.onNameInput,
                this.onDescriptionInput,
            )}
            ${componentsFactory(
                this.components,
                ::this.updateComponent,
                ::this.addComponent,
                ::this.sortComponent,
                ::this.deleteComponent,
            )}
            ${addComponentFactory(
                this.action === ADDING_COMPONENT,
                ::this.addComponent,
                this.onAddComponentClick,
                this.onAddComponentCloseButtonClick,
                this.components
            )}`;

    }

    /**
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        this._isEditing = !!this.lesson.id;

        if (!this._isEditing) {

            this.createLesson();

        } else {

            this._didCreateLesson = true;
            this._needLessonUpdate = true;

            this.store.dispatch(
                LessonActions.getLessonIfNeeded(
                    this.course.id, this.module.id, this.lesson.id)
            );

        }

    }

    /**
     * @param  {Map} changedProps
     */
    updated(changedProps) {

        if (this._isEditing) {

            if (
                this.components.length <= 0 &&
                typeof this.lesson.content !== 'undefined') {

                let components = [];

                try {

                    components = JSON.parse(this.lesson.content);

                } catch (e) {

                    // do nothing?

                }

                if (components.length > 0) {

                    this.components = components.map((component) => {

                        return {
                            editing: true,
                            dragging: false,
                            ...component,
                        };

                    });

                }

            }

        }

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        if (this._isEditing) {

            this.isFetching = isFetchingLesson(state, this.lesson.id);

        }

    }

    /**
     * Replace an empty name with 'Unnamed Lesson'
     * @return {Object} lesson
     */
    getSanitizedLesson() {

        const name = this.lesson.name.length <= 0 ?
            'Unnamed Lesson' :
            this.lesson.name;

        const { description, order } = this.lesson;

        const content = this.getContent();

        return {
            name, description, content, order,
        };

    }

    /**
     * Create the lesson
     */
    createLesson() {

        if (this._didCreateLesson) {

            return;

        }

        this._didCreateLesson = true;

        this.store.dispatch(
            LessonActions.createLesson(
                this.getSanitizedLesson(),
                this.course.id,
                this.module.id,
            )
        ).then((data) => {

            this._didCreateLesson = true;

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

            this._didCreateLesson = false;

        });

    }

    /**
     * Instanly update the lesson
     */
    forceUpdateLesson() {

        if (!this._didCreateLesson) {

            this.createLesson();

            return;

        }

        if (this._isUpdating) {

            return;

        }

        this._isUpdating = true;

        this.store.dispatch(
            LessonActions.updateLesson(
                this.getSanitizedLesson(),
                this.course.id,
                this.module.id,
                this.lesson.id,
            )
        ).then((data) => {

            this._isUpdating = false;

            this.lesson = {
                ...this.lesson,
                ...data.response,
            };

            this.dispatchEvent(
                new CustomEvent('lesson-updated', {
                    detail: {
                        updates: data.response,
                        lesson: this.lesson,
                    },
                    bubbles: true,
                    composed: true,
                })
            );

        }).catch((error) => {

            this._isUpdating = false;

        });

    }

    /**
     * Update the lesson with debounce
     */
    updateLesson = _debounce(() => {

        this.forceUpdateLesson();

    }, 3000);

    /**
     * Compose the content JSON
     * @return {String}
     */
    getContent() {

        const componentContent = DOMUtils.a([
            '.component rich-text-lesson-component',
            '.component questions-answers-lesson-component',
            '.component media-files-lesson-component',
            '.component assessment-lesson-component',
        ].join(','), this.shadowRoot)
            .map($component => $component.getContent());

        return JSON.stringify(componentContent);

    }

    /**
     * Add a new component
     * @param {String} type
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

        this.updateLesson();

        this.action = OVERVIEW;

    }

    /**
     * Resort components
     * @param  {Array} sortedIndexArray new order
     */
    sortComponent(sortedIndexArray) {

        this.components = sortedIndexArray.map(index => this.components[index]);

        this.updateLesson();

    }

    /**
     * Delete component
     * @param  {Number} index
     */
    deleteComponent(index) {

        const components = [...this.components];
        components.splice(index, 1);

        this.components = components;

        this.updateLesson();

    }

    /**
     * Update component
     * @param  {Number} index
     * @param  {Object} componentData
     */
    updateComponent(index, componentData) {
        
        const components = [
            ...this.components,
        ];
        components[index].data = componentData;

        this.components = components;

        this.updateLesson();

    }

    /**
     * Check if components are different
     * @param  {Array} components
     * @return {Boolean}
     */
    areComponentsDifferent(components) {

        return true;

    }

    /**
     * Name input
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onNameInput(event) {

        this.lesson = {
            ...this.lesson,
            name: event.currentTarget.value,
        };

        this.updateLesson();

    }

    /**
     * Description input
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDescriptionInput(event) {

        this.lesson = {
            ...this.lesson,
            description: event.currentTarget.value,
        };

        this.updateLesson();

    }

    /**
     * AddComponent click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAddComponentClick(event) {

        this.action = ADDING_COMPONENT;

    }

    /**
     * AddComponentCloseButton click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAddComponentCloseButtonClick(event) {

        this.action = OVERVIEW;

    }

}

export { LessonComposing };
