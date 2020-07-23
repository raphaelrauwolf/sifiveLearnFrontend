
import {
    html,
} from 'lit-element';

import { TYPE as RICH_TEXT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/RichTextLessonComponent';
import { TYPE as QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import { TYPE as MEDIA_FILES_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/MediaFilesLessonComponent';
import { TYPE as ASSESSMENT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/AssessmentLessonComponent';

import 'Components/Lesson/Components/RichTextLessonComponent';
import 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import 'Components/Lesson/Components/MediaFilesLessonComponent';
import 'Components/Lesson/Components/AssessmentLessonComponent';

export const componentFactory =
    (
            index, component, needSeperator,
            updateComponent, addComponent,
            sortComponent, deleteComponent,
    ) => {

        let componentHTML = '';
        let componentDraggingLabel = '';

        const onDataChange = (event) => {

            updateComponent(index, event.detail.data);

        };

        switch (component.type) {

            case RICH_TEXT_LESSON_COMPONENT_TYPE:
                componentHTML = html`<rich-text-lesson-component
                    .data=${component.data || ''}
                    ?editing=${component.editing}
                    @data-change=${onDataChange}></rich-text-lesson-component>`;

                componentDraggingLabel = 'Rich Text Component';
                break;

            case QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE: {

                const onAddQuestion = () =>
                    addComponent(QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE);

                componentHTML = html`<questions-answers-lesson-component
                    .data=${component.data || {}}
                    ?editing=${component.editing}
                    @data-change=${onDataChange}
                    @add-question=${onAddQuestion}></questions-answers-lesson-component>`;

                componentDraggingLabel = 'Questions & Answers Component';

                break;

            }

            case MEDIA_FILES_LESSON_COMPONENT_TYPE:
                componentHTML = html`<media-files-lesson-component
                    .data=${component.data || ''}
                    ?editing=${component.editing}
                    @data-change=${onDataChange}></media-files-lesson-component>`;

                componentDraggingLabel = 'Media Files Component';

                break;

            case ASSESSMENT_LESSON_COMPONENT_TYPE:
                componentHTML = html`<assessment-lesson-component
                    .data=${component.data || {}}
                    ?editing=${component.editing}
                    @data-change=${onDataChange}></assessment-lesson-component>`;
                break;

        }

        const componentUi = html`
            <div class="component-ui">
                <sifive-round-button>
                    <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                </sifive-round-button>
            </div>`;

        const componentDragging = html`
            <div class="component-dragging">
                <div>${componentDraggingLabel}</div>
                <sifive-round-button>
                    <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                </sifive-round-button>
            </div>`;

        let seperator = '';

        if (needSeperator) {

            seperator = html`<div class="dotted-line"></div>`;

        }

        const onDeleteDrop = (event) => {

            deleteComponent(index);

        };

        const onSorted = (event) => {

            sortComponent(event.detail.sortedArray);

        };

        return html`
            <sifive-sortable
                sortGroup="lesson-creation-component"
                handleSelector="sifive-round-button"
                @delete-drop=${onDeleteDrop}
                @sorted=${onSorted}>
                <div class="component">
                    ${componentDragging}
                    <div class="component-container">
                        <div class="grid-container">
                            ${componentHTML}
                            ${componentUi}
                            ${seperator}
                        </div>
                    </div>
                </div>
            </sifive-sortable>`;

    };

export const componentsFactory =
    (
            components, updateComponent, addComponent,
            sortComponent, deleteComponent
    ) => {

        if (Array.isArray(components)) {

            return components.map((component, index) => {

                return componentFactory(
                    index,
                    component,
                    index < components.length - 1, // needSeperator
                    updateComponent,
                    addComponent,
                    sortComponent,
                    deleteComponent,
                );

            });

        } else {

            return '';

        }

    };
