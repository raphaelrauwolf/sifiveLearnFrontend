
import {
    html,
} from 'lit-element';

import { TYPE as RICH_TEXT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/RichTextLessonComponent';
import { TYPE as QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import { TYPE as MEDIA_FILES_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/MediaFilesLessonComponent';


export const componentFactory = (context, component, index, needsSeperator) => {

    let componentHTML = '';
    let componentDraggingLabel = '';


    const changeCallback = event =>
        context.updateComponentData(index, component);

    switch (component.type) {

        case RICH_TEXT_LESSON_COMPONENT_TYPE:
            componentHTML = html`<rich-text-lesson-component
                .data=${component.data || ''}
                ?editing=${component.editing}
                @data-change=${changeCallback}></rich-text-lesson-component>`;
            componentDraggingLabel = 'Rich Text Component';
            break;

        case QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE:
            componentHTML = html`<questions-answers-lesson-component
                .data=${component.data || {}}
                ?editing=${component.editing}
                @data-change=${changeCallback}
                @add-question=${() => context.addComponent('questions-answers')}></questions-answers-lesson-component>`;
            componentDraggingLabel = 'Q&A Component';
            break;

        case MEDIA_FILES_LESSON_COMPONENT_TYPE:
            componentHTML = html`<media-files-lesson-component
                .data=${component.data || ''}
                .media=${context.media}
                ?editing=${component.editing}
                @data-change=${changeCallback}></media-files-lesson-component>`;
            componentDraggingLabel = 'Media Files Component';
            break;

        case 'assessment':
            componentHTML = html`<assessment-lesson-component ?editing="${component.editing}"
                @data-change=${context.onComponentChange}></assessment-lesson-component>`;
            componentDraggingLabel = 'Assessment Component';
            break;

    }

    let seperator = '';

    if (needsSeperator) {

        seperator = html`<div class="dotted-line"></div>`;

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

    return html`
        <sifive-sortable
            sortGroup="lesson-creation-component"
            handleSelector="sifive-round-button"
            @delete-drop="${event => context.deleteComponent(index, component)}"
            @sorted="${event => context.sortComponents(index, event.detail.sortedArray)}">
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
