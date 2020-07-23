import {
    html,
} from 'lit-element';

import { TYPE as RICH_TEXT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/RichTextLessonComponent';
import { TYPE as QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import { TYPE as MEDIA_FILES_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/MediaFilesLessonComponent';

export const selectComponentFactory = (context) => {

    if (context.isAddingComponent) {

        return html`
        <div class="grid-container component-select-container">
            <div class="component-card" @click="${() => context.addComponent(RICH_TEXT_LESSON_COMPONENT_TYPE)}">
                <svg-icon src="assets/images/icons/rich_text.svg" alt="Rich Text" class="component-logo"></svg-icon>
                <div class="component-card-label eyebrow">Rich Text</div>
            </div>
            <div class="component-card" @click="${() => context.addComponent(QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE)}">
                <svg-icon src="assets/images/icons/questions_answers.svg" alt="Rich Text" class="component-logo"></svg-icon>
                <div class="component-card-label eyebrow">Question & Answers</div>
            </div>
            <div class="component-card" @click="${() => context.addComponent(MEDIA_FILES_LESSON_COMPONENT_TYPE)}}">
                <svg-icon src="assets/images/icons/media_files.svg" alt="Rich Text" class="component-logo"></svg-icon>
                <div class="component-card-label eyebrow">Media Files</div>
            </div>
            <div class="component-card disabled" @click="${() => {/* context.addComponent('assessment') */}}">
                <svg-icon src="assets/images/icons/assessment.svg" alt="Rich Text" class="component-logo"></svg-icon>
                <div class="component-card-label eyebrow">Assessments</div>
            </div>
        </div>
        <div class="grid-container close-button-container">
            <div class="dotted-line"></div>
            <sifive-round-button red @click="${context.onCloseButtonClick}">
                <svg-icon slot="icon" src="assets/images/icons/close.svg"></svg-icon>
            </sifive-round-button>
        </div>`;

    }

    return '';

};
