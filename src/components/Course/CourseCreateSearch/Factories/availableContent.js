
import {
    html,
} from 'lit-element';


export const availableContentFactory =
    (courses, courseID, onAddClick) => {

        let content = '';

        if (courses.length > 0) {

            content = [];

            courses
                .filter(course => course.id !== course.id)
                .forEach((course) => {

                    course.modules.forEach((module) => {

                        content.push(
                            html`
                                <module-accordion open addable
                                    .module="${module}"
                                    @add-click="${onAddClick}"></module-accordion>`
                        );

                    });

                });

        }

        return content;

    };
