import {
    html,
} from 'lit-element';

import 'Components/Lesson/LessonAccordion';
import 'Components/Module/ModuleAccordion';
import 'Components/Course/CourseAccordion';
import 'Components/Global/SifiveButton';

export const moduleFactory = (module) => {

    const lessons = module.lessons.map(lesson =>
        html`<lesson-accordion .lesson=${lesson}></lesson-accordion>`);

    return html`
    <module-accordion
        ?open=${lessons.length > 0}
        .module=${module}>
        <div slot="content">${lessons}</div>
    </module-accordion>`;

};

export const courseListFactory = (assignableCourses = [], assignCourse) => {

    return assignableCourses.map((course) => {

        const onAssignCourseClick = () => {

            assignCourse(course.id);

        };

        const modules = course.modules.map(module => moduleFactory(module));

        const accordion = html`
            <course-accordion
                ?openable=${modules.length > 0}
                ?open=${modules.length > 0}
                .course=${course}>
                <div slot="content">${modules}</div>
            </course-accordion>`;

        return html`
            <div class="course">
                ${accordion}
                <div class="button-container">
                    <sifive-button label="Assign Course"
                        @click="${onAssignCourseClick}"></sifive-button>
                </div>
            </div>`;

    });

};
