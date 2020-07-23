
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

// Components
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Course/CourseAccordion'
import 'Components/Module/ModuleAccordion'
import 'Components/Lesson/LessonAccordion'
import 'Components/Global/SifiveRoundButton'
import 'Components/Global/SVGIcon'


import { getStyles } from './Styles';

/**
 * CourseContentBrowse LitElement
 * template
 */
@customElement('course-content-browse')
class CourseContentBrowse extends ConnectedComponent {

    @property({ type: Array })
    courses = [];

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

        const getAddButton = (callback) => {

            return html`
                <sifive-round-button @click="${callback}">
                    <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                </sifive-round-button>`;

        }

        const courses = this.courses.map((course) => {

            const modules = course.modules.map((module) => {

                const lessons = module.lessons.map((lesson) => {

                    return html`<lesson-accordion .lesson=${lesson}>
                        <div slot="bar-content">
                            ${getAddButton(() => ::this.addLesson(lesson))}
                        </div>
                    </lesson-accordion>`;

                });

                return html`
                    <module-accordion .module=${module} open ?openable=${true}>
                        <div slot="bar-content">
                            ${getAddButton(() => ::this.addModule(module))}
                        </div>
                        <div slot="content">
                            ${lessons}
                        </div>
                    </module-accordion>`;

            });

            return html`
            <course-accordion .course=${course} open>
                <div slot="content">
                    ${modules}
                </div>
            </course-accordion>`;

        });

        return html`
            <!-- CourseContentBrowse -->
            <div class="grid-container">
                <div class="content-container">
                    ${courses}
                </div>
                <div class="grid-container button-container">
                    <div class="button" @click=${this.onContinueClick}>Continue</div>
                </div>
            </div>`;

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.courses = Object.values(state.LearnMaterial.Courses.list)
            .filter(course => course.modules.length > 0);

    }

    addModule(module) {

        this.dispatchEvent(
            new CustomEvent('add-module', {
                detail: {
                    module
                },
                bubbles: true,
                composed: true,
            })
        );

    }

    addLesson(lesson) {

        this.dispatchEvent(
            new CustomEvent('add-lesson', {
                detail: {
                    lesson
                },
                bubbles: true,
                composed: true,
            })
        );

    }


    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onContinueClick(event) {

        this.dispatchEvent(
            new CustomEvent('continue', {
                detail: {
                    course: this.course,
                },
                bubbles: true,
                composed: true,
            })
        );

    }


}

export { CourseContentBrowse };
