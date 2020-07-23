
import {
    html, customElement, eventOptions,
} from 'lit-element';
import DOMUtils from 'Utils/DOMUtils';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveRoundButton';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveRadio';
import 'Components/Global/SifiveRadioGroup';
import 'Components/Global/SifiveCheckbox';
import 'Components/Global/SifiveVideo';
import 'Components/Global/SifiveSlideshow';
import 'Components/Global/SifiveResource';
import 'Components/Global/RichTextEditor';
import 'Components/Global/SifiveSortable';
import 'Components/Global/ProgressCircle';

import 'Components/Course/CourseAccordion';
import 'Components/Course/CourseSummaryRow';

import 'Components/Module/ModuleAccordion';

import 'Components/Lesson/LessonAccordion';
import 'Components/Lesson/Components/RichTextLessonComponent';
import 'Components/Lesson/Components/QuestionsAnswersLessonComponent';

import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * TeamView LitElement
 * template for /profile
 */
@customElement('design-view')
class DesignView extends BaseViewComponent {

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        const creator = {
            id: 41,
            firstname: 'Will',
            lastname: 'Smith',
        };

        const lesson = {
            id: 34,
            name: 'This is a lesson',
            description: 'Lesson description',
            order: null,
            creator,
            course: 1,
            module: 2,
        };

        const module = {
            id: 21,
            name: 'This is a module',
            description: 'Module description',
            order: 0,
            lessons: [
                lesson,
            ],
            creator,
            course: 37,
        };

        const course = {
            id: 5,
            name: 'This is a course',
            description: 'Course description',
            modules: [
                module,
            ],
            creator,
        };

        const dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

        return html`
            <!-- DesignView Component -->
            <div class="grid-container">

                <section id="overview">
                    <h1>Design Overview</h1>
                    <ul>
                        <li @click=${event => this.onAnchorClick(event, 'colors')}>Colors</li>
                        <li @click=${event => this.onAnchorClick(event, 'typo')}>Typography</li>
                        <li @click=${event => this.onAnchorClick(event, 'elements')}>Elements</li>
                    </ul>
                </section>

                <section id="colors">
                    <h2>Colors</h2>
                    <div class="color-container">
                        <div class="color">
                            <div class="blue">Blue</div>
                            <div class="blue-accent">Blue Accent</div>
                        </div>
                        <div class="color">
                            <div class="red">Red</div>
                            <div class="red-accent">Red Accent</div>
                        </div>
                        <div class="color">
                            <div class="green">Green</div>
                            <div class="green-accent">Green Accent</div>
                        </div>
                        <div class="color">
                            <div class="orange">Orange</div>
                            <div class="orange-accent">Orange Accent</div>
                        </div>
                        <div class="color">
                            <div class="black">Black</div>
                            <div class="black-accent">Black Accent</div>
                        </div>
                        <div class="color">
                            <div class="facebook">Facebook</div>
                            <div class="google">Google</div>
                        </div>
                    </div>
                </section>

                <section id="typo">
                    <h2>Typography</h2>
                    <div class="large-data">300</div>
                    <div class="large-data-support">Large Data Support</div>
                    <div class="large-data-sub">Large Data Sub</div>
                    <div class="mid-data">300</div>
                    <div class="small-data">300</div>
                    <h1>Headline H1</h1>
                    <h2>Headline H2</h2>
                    <h3>Headline H3</h3>
                    <h4>Headline H4</h4>
                    <h5>Headline H6</h5>
                    <small>Text Small</small>
                    <div class="eyebrow">Text Eyebrow</div>
                    <div class="date">Text Date</div>
                    <div class="error-text">Error</div>
                </section>

                <section id="elements">
                    <h2>Elements</h2>
                    <div class="button-container element-container">
                        <h3>Button</h3>
                        <h4><pre>sifive-button</pre></h4>
                        <sifive-button label="Label Text"></sifive-button><br>
                        <sifive-button label="Label w/ Icon">
                            <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                        </sifive-button>
                    </div>
                    <div class="round-button-container element-container">
                        <h3>Round Button</h3>
                        <h4><pre>sifive-round-button</pre></h4>
                        <sifive-round-button>
                            <svg-icon slot="icon" src="assets/images/icons/edit.svg"></svg-icon>
                        </sifive-round-button>
                    </div>
                    <div class="dropdown-container element-container">
                        <h3>Dropdown</h3>
                        <h4><pre>sifive-dropdown</pre></h4>
                        <sifive-dropdown
                            label="Label Text"
                            .items=${dropdownOptions}>
                        </sifive-dropdown><br>
                        <sifive-dropdown
                            label-selectable
                            label="Label w/ Icon"
                            .items=${dropdownOptions}>
                            <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                        </sifive-dropdown>
                    </div>
                    <div class="input-container element-container">
                        <h3>Input</h3>
                        <h4><pre>sifive-input</pre></h4>
                        <sifive-input type="text"
                            placeholder="Placeholder Text"></sifive-input><br>
                        <sifive-input type="text"
                            strong-placeholder
                            placeholder="Input w/ Icon &amp; Strong Placeholder">
                            <svg-icon slot="icon" src="assets/images/icons/search.svg"></svg-icon>
                        </sifive-input><br>
                        <sifive-input type="text" small
                            placeholder="Small Input"></sifive-input><br>
                        <sifive-input type="tel"
                            placeholder="Phone Nr. Input"></sifive-input><br>
                        <sifive-input type="email"
                            placeholder="Email Input Text"></sifive-input><br>
                        <sifive-input type="password"
                            placeholder="Password Input Text"></sifive-input><br>

                        <h4><pre>sifive-radio</pre></h4>
                        <sifive-radio-group>
                            <div>
                                <sifive-radio label="Radio Button" value="true"></sifive-radio>
                                <div class="divider"></div>
                                <sifive-radio checked label="Checked Radio Button" value="false"></sifive-radio>
                            </div>
                        </sifive-radio-group>

                        <h4><pre>sifive-checkbox</pre></h4>
                        <sifive-checkbox label="Checkbox"></sifive-checkbox><br />
                        <sifive-checkbox checked label="Checkbox"></sifive-checkbox><br />
                    </div>
                    <div class="progress-circle-container element-container">
                        <h3>Progress Circle</h3>
                        <h4><pre>progress-circle</pre></h4>
                        <progress-circle .percent=${Math.random() * 100}></progress-circle>
                        <progress-circle .percent=${Math.random() * 100}></progress-circle>
                        <progress-circle .percent=${Math.random() * 100}></progress-circle>
                    </div>
                    <div class="rich-text-container element-container">
                        <h3>Rich Text Editor</h3>
                        <h4><pre>rich-text-editor</pre></h4>
                        <rich-text-editor placeholder="This is a placeholder"></rich-text-editor>
                        <sifive-sortable
                            sortGroup="lesson-creation-component"
                            handleSelector="sifive-round-button">
                            <div class="component">
                                <rich-text-editor content="&lt;h1 class=&quot;test-class&quot;&gt;H1 Headline&lt;/h1&gt;&lt;h3&gt;H3 Headline&lt;/h3&gt;&lt;p&gt;Paragraph&lt;/p&gt;"></rich-text-editor>
                            </div>
                        </sifive-sortable>
                    </div>
                    <div class="course-container element-container">
                        <h3>Course</h3>
                        <h4><pre>course-accordion</pre></h4>
                        <course-accordion openable .course=${course}>
                            <module-accordion slot="content" open .module=${module}>
                                <lesson-accordion slot="bar-content" .lesson=${lesson}></lesson-accordion>
                                <sifive-round-button slot="actions">
                                    <svg-icon slot="icon" src="assets/images/icons/edit.svg" alt="Edit"></svg-icon>
                                </sifive-round-button>
                            </module-accordion>
                            <sifive-round-button slot="actions">
                                <svg-icon slot="icon" src="assets/images/icons/edit.svg" alt="Edit"></svg-icon>
                            </sifive-round-button>
                        </course-accordion>
                        <h4><pre>course-summary-row</pre></h4>
                        <course-summary-row .course=${course}></course-summary-row>
                    </div>
                    <div class="module-container element-container">
                        <h3>Module</h3>
                        <h4><pre>module-accordion</pre></h4>
                        <module-accordion openable .module=${module}>
                            <lesson-accordion slot="bar-content" .lesson=${lesson}></lesson-accordion>
                            <sifive-round-button slot="actions">
                                <svg-icon slot="icon" src="assets/images/icons/edit.svg" alt="Edit"></svg-icon>
                            </sifive-round-button>
                        </module-accordion>
                    </div>
                    <div class="lesson-container element-container">
                        <h3>Lesson</h3>
                        <h4><pre>lesson-accordion</pre></h4>
                        <lesson-accordion .lesson=${lesson}></lesson-accordion>
                        <h4><pre>rich-text-lesson-component</pre></h4>
                        <rich-text-lesson-component
                            data="&lt;sifive-resource uuid=&quot;db860ce1-0cf2-4ed1-a71f-065353d0fdd9&quot; &gt;&lt;/sifive-resource&gt;&lt;h3&gt;This is a Rich-text-lesson-component being edited!&lt;/h3&gt;"
                            editing></rich-text-lesson-component>
                        <h4><pre>questions-answers-lesson-component</pre></h4>
                        <questions-answers-lesson-component editing></questions-answers-lesson-component>
                    </div>
                    <div class="video-container element-container">
                        <h3>Video</h3>
                        <h4><pre>sifive-video</pre></h4>
                        <sifive-video
                            src="https://media.w3.org/2010/05/sintel/trailer.mp4"
                            poster="https://media.w3.org/2010/05/sintel/poster.png"></sifive-video>
                    </div>
                    <div class="slideshow-container element-container">
                        <h3>Slideshow</h3>
                        <h4><pre>sifive-slideshow</pre></h4>
                        <sifive-slideshow
                            .media=${[
                                {
                                    signedPath: 'https://picsum.photos/1024/786/?r=1',
                                    originalFilename: 'blabla',
                                },
                                {
                                    signedPath: 'https://picsum.photos/1024/786/?r=2',
                                    originalFilename: 'blabla',
                                },
                                {
                                    signedPath: 'https://picsum.photos/1024/786/?r=3',
                                    originalFilename: 'blabla',
                                },
                                {
                                    signedPath: 'https://picsum.photos/1024/786/?r=4',
                                    originalFilename: 'blabla',
                                },
                                {
                                    signedPath: 'https://picsum.photos/1024/786/?r=5',
                                    originalFilename: 'blabla',
                                },
                            ]}></sifive-slideshow>
                    </div>
                </section>
            </div>
        `;

    }

    /**
     * Click Callback
     * @param {Object} event
     * @param {String} id
     */
    @eventOptions({ passive: true })
    onAnchorClick(event, id) {

        const $container = DOMUtils.q(`section#${id}`, this.shadowRoot);

        $container.scrollIntoView({
            behavior: 'smooth',
        });

    }

}

export { DesignView };
