import {
    html,
} from 'lit-element';

import 'Components/Lesson/LessonAccordion';

export const lessonListFactory = (lessons) => {

    if (!lessons || lessons.length <= 0) {

        return '';

    }

    const lessonAccordions = lessons.map(lesson =>
        html`<lesson-accordion .lesson=${lesson}></lesson-accordion>`);

    return html`
    <div class="lesson-list">
        <h5>Lessons:</h5>
        ${lessonAccordions}
    </div>`;

};
