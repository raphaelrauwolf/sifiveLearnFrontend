
import {
    html,
} from 'lit-element';

import 'Components/Global/SVGIcon';

import { TYPE as RICH_TEXT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/RichTextLessonComponent';
import { TYPE as QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import { TYPE as MEDIA_FILES_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/MediaFilesLessonComponent';
import { TYPE as ASSESSMENT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/AssessmentLessonComponent';

export const contentFactory = (content, media, params) => {

    if (typeof content === 'string') {

        return html`<div class="content">${content}</div>`;

    }

    const contentComponents = content.map((component) => {

        switch (component.type) {

            case QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE:
                return html`<questions-answers-lesson-component .data=${component.data}></questions-answers-lesson-component>`;

            case MEDIA_FILES_LESSON_COMPONENT_TYPE:
                return html`<media-files-lesson-component .data=${component.data} .media=${media}></media-files-lesson-component>`;

            case ASSESSMENT_LESSON_COMPONENT_TYPE:
                return html`<assessment-lesson-component .data=${component.data} .params=${params}></assesment-lesson-component>`;

            case RICH_TEXT_LESSON_COMPONENT_TYPE:
            default:
                return html`<rich-text-lesson-component data="${component.data}"></rich-text-lesson-component>`;
        }

    });

    return html`<div class="content">${contentComponents}</div>`;

};
