import {
    html,
} from 'lit-element';

import 'Components/Module/ModuleAccordion';
import 'Components/Lesson/LessonAccordion';
import 'Components/Global/ProgressCircle';

export const moduleListFactory = (modules) => {

    if (!modules || modules.length <= 0) {

        return '';

    }

    const moduleAccordions = modules.sort((a, b) => {

        return a.order - b.order;

    }).map((module) => {

        const lessons = module.lessons.sort((a, b) => {

            return a.order - b.order;

        }).map((lesson) => {

            return html`
                <lesson-accordion .lesson=${lesson}>
                    <div slot="bar-content">
                        <progress-circle .percent=${lesson.progress || 0} ></progress-circle>
                    </div>
                </lesson-accordion>`;

        });

        return html`
        <module-accordion
            ?open=${lessons.length > 0}
            .module=${module}>
            <div slot="content">${lessons}</div>
            <div slot="bar-content">
                <progress-circle .percent=${module.progress || 0} ></progress-circle>
            </div>
        </module-accordion>`;

    });

    return html`
        <div class="module-list">
            <h5>Lessons and Content:</h5>
            ${moduleAccordions}
        </div>`;

};
