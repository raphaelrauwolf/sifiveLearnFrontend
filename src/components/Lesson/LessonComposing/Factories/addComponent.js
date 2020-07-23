
import {
    html,
} from 'lit-element';

import 'Components/Global/SifiveButton';
import 'Components/Global/SVGIcon';

import { TYPE as RICH_TEXT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/RichTextLessonComponent';
import { TYPE as QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import { TYPE as MEDIA_FILES_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/MediaFilesLessonComponent';
import { TYPE as ASSESSMENT_LESSON_COMPONENT_TYPE } from 'Components/Lesson/Components/AssessmentLessonComponent';

const voidFunc = function() {}

export const addComponentFactory =
    (
            isAddingComponent,
            addComponent,
            onAddComponentClick,
            onCloseButtonClick,
            components
    ) => {

        if (isAddingComponent) {

            const QADisabled = components.some(component => component.type === ASSESSMENT_LESSON_COMPONENT_TYPE)
            const assessmentDisabled = components.some((component) => {
                return component.type === ASSESSMENT_LESSON_COMPONENT_TYPE ||
                    component.type === QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE
            })

            return html`
                <div class="grid-container component-select-container">
                    <div class="component-card"
                        @click="${() => addComponent(RICH_TEXT_LESSON_COMPONENT_TYPE)}">
                        <svg-icon src="assets/images/icons/rich_text.svg" alt="Rich Text" class="component-logo"></svg-icon>
                        <div class="component-card-label eyebrow">Rich Text</div>
                    </div>
                    <div class="component-card${QADisabled ? ' disabled' : ''}"
                        @click="${QADisabled ? voidFunc : () => addComponent(QUESTIONS_ANSWERS_LESSON_COMPONENT_TYPE)}"
                        disabled=${QADisabled}>
                        <svg-icon src="assets/images/icons/questions_answers.svg" alt="Rich Text" class="component-logo"></svg-icon>
                        <div class="component-card-label eyebrow">Question & Answers</div>
                    </div>
                    <div class="component-card"
                        @click="${() => addComponent(MEDIA_FILES_LESSON_COMPONENT_TYPE)}">
                        <svg-icon src="assets/images/icons/media_files.svg" alt="Rich Text" class="component-logo"></svg-icon>
                        <div class="component-card-label eyebrow">Media Files</div>
                    </div>
                    <div class="component-card${assessmentDisabled ? ' disabled' : ''}"
                        @click="${assessmentDisabled ? voidFunc : () => addComponent(ASSESSMENT_LESSON_COMPONENT_TYPE)}">
                        <svg-icon src="assets/images/icons/assessment.svg" alt="Rich Text" class="component-logo"></svg-icon>
                        <div class="component-card-label eyebrow">Assessments</div>
                    </div>
                </div>
                <div class="grid-container close-button-container">
                    <div class="dotted-line"></div>
                    <sifive-round-button red @click="${onCloseButtonClick}">
                        <svg-icon slot="icon" src="assets/images/icons/close.svg"></svg-icon>
                    </sifive-round-button>
                </div>`;

        } else {

            return html`
                <div class="grid-container add-button-container">
                    <div class="dotted-line"></div>
                    <sifive-button label="Add Component" @click="${onAddComponentClick}">
                        <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                    </sifive-button>
                </div>`;

        }

    };
