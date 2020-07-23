
import {
    html, customElement, property,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';
import Router from 'Utils/Router';

// Redux Selectors
import {
    getLessonID,
    getLessonModuleID,
    getLessonCourseID,
    getLesson,
    shouldGetLesson,
    isFetchingLesson,
    isShowingLesson,
} from 'Selectors/Lesson';
import { getModule } from 'Selectors/Module';
import { getCourse, isFetchingList } from 'Selectors/Course';
import { getMediaList } from 'Selectors/Media';

// Redux Actions
import LessonActions from 'Actions/Lesson';
import CourseActions from 'Actions/Course';
import NotificationActions from 'Actions/Notification';

// component dependencies
import { hasArrayChanged } from 'Components/hasArrayChanged';
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Lesson/Components/RichTextLessonComponent';
import 'Components/Lesson/Components/QuestionsAnswersLessonComponent';
import 'Components/Lesson/Components/MediaFilesLessonComponent';
import 'Components/Lesson/Components/AssessmentLessonComponent';
import 'Components/Global/SifiveLoader';
import 'Components/Global/SVGIcon';
import 'Components/Global/TopBar';

import { contentFactory } from './Factories/content';
import { footerFactory } from './Factories/footer';

import { getStyles } from './Styles';

/**
 * LessonMain LitElement
 * template
 */
@customElement('lesson-main')
class LessonMain extends ConnectedComponent {

    @property({ type: Boolean })
    ready = false;

    @property({ type: Object })
    course = {};

    @property({ type: Object })
    module = {};

    @property({ type: Object })
    lesson = {};

    @property({ type: Object })
    media = {};

    @property({ type: Boolean })
    checked = false;

    @property({ type: Object })
    content = false;

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    results = [];

    @property({ type: Number })
    questionCount = 0;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        if (!this.ready) {

            return html`<sifive-loader></sifive-loader>`;

        }

        let courseLink;
        let topBar;

        if (this.lesson && this.course) {

            courseLink = html`
            <div class="course-link">
                <a href="/course/${this.course.id}"><small>${this.course.name}</small></a>
            </div>`;

            topBar = html`
            <top-bar visible>
                <div slot="content" class="top-bar-content grid-container">
                    <a href="/course/${this.course.id}" class="back-link">
                        <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Courses / ${this.course.name}
                    </a>
                </div>
            </top-bar>`;

        }

        const totalCount = this.results.length;
        const correctCount = this.results.reduce((n, value) =>
            n + (value === true), 0);

        return html`
            <!-- LessonMain -->
            ${topBar}
            <div class="grid-container">
                ${courseLink}
                <h1>${this.lesson.name}</h1>
                <div class="description">${this.lesson.description}</div>
                ${contentFactory(this.content, this.media, { lesson: this.lesson, course: this.course })}
            </div>
            ${footerFactory(
                this, this.checked, this.questionCount,
                totalCount, correctCount,
                `/course/${this.lesson.course}`)}`;

    }

    /**
     * Lifecycle shouldUpdate check
     * @return {Boolean}
     */
    shouldUpdate() {

        return this.active;

    }

    /**
     *
     */
    updated() {

        if (this.courseID && this.moduleID && this.lessonID) {

            this.store.dispatch(
                LessonActions.getLessonIfNeeded(
                    this.courseID, this.moduleID, this.lessonID));

        }

        const $content = DOMUtils.q('.content', this.shadowRoot);
        const $questionsAnswers = DOMUtils.a('questions-answers-lesson-component', $content);
        const $mediaFiles = DOMUtils.a('media-files-lesson-component', $content);

        this.questionCount = $questionsAnswers.length;

        $mediaFiles.forEach(($media) => {

            $media.media = this.media;

        });

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.active = isShowingLesson(state);
        this.lessonID = getLessonID(state);

        const _isFetchingList = isFetchingList(state);

        if (this.active && this.lessonID && !_isFetchingList) {

            this.moduleID = getLessonModuleID(state, this.lessonID);
            this.courseID = getLessonCourseID(state, this.lessonID);

            const _hasLesson = this.moduleID && this.courseID;

            // if we cant find the lesson in the course list, redirect
            if (!_hasLesson) {

                Router.replace('/');
                this.store.dispatch(
                    NotificationActions.showError('Cant find the requested Lesson!'));

                return;

            }

            this.lesson = getLesson(state, this.lessonID);
            this.module = getModule(state, this.moduleID);
            this.course = getCourse(state, this.courseID);

            // check if lesson content is available
            const _shouldFetchLesson = shouldGetLesson(state, this.lessonID);
            const _isFetchingLesson = isFetchingLesson(state, this.lessonID);
            this.ready = !_shouldFetchLesson && !_isFetchingLesson;

            // parse content
            if (this.lesson && typeof this.lesson.content !== 'undefined') {

                try {

                    this.content = JSON.parse(this.lesson.content);

                } catch (e) {

                    this.content = this.lesson.content;

                }

            }

            this.media = getMediaList(state);

        } else if (!this.active) {

            this.lesson = undefined;
            this.content = undefined;

        }

    }

    /**
     * Check all the given answers
     */
    checkAnswers() {

        this.checked = true;

        const $content = DOMUtils.q('.content', this.shadowRoot);
        const $questionsAnswers = DOMUtils.a('questions-answers-lesson-component', $content);

        this.results = $questionsAnswers.map(($qna) => {

            $qna.checkAnswer();

            return $qna.getResult();

        });

        const totalCount = this.results.length;
        const correctCount = this.results.reduce((n, value) =>
            n + (value === true), 0);

        const progress = (correctCount / totalCount) * 100;

        this.store.dispatch(
            LessonActions.updateLessonProgress(
                { progress }, this.courseID, this.moduleID, this.lessonID)

        ).then(() => {

            this.store.dispatch(CourseActions.getCourse(this.courseID));

        });

    }

    /**
     * Scroll to first wrong answer
     */
    scrollToWrongAnswer() {

        const $content = DOMUtils.q('.content', this.shadowRoot);
        const $questionsAnswers = DOMUtils.a('questions-answers-lesson-component', $content);

        this.results.find((result, index) => {

            if (!result) {

                $questionsAnswers[0].scrollIntoView({
                    behavior: 'smooth',
                });

            }

        });

    }

    /**
     * Goto the next lesson
     */
    gotoNextLesson() {

        let lessonIndex;
        this.module.lessons
            .find((lesson, index) => {

                const isLesson = lesson.id == this.lessonID;

                if (isLesson) {

                    lessonIndex = index;

                }

                return isLesson;

            });

        const nextLesson = this.module.lessons[lessonIndex + 1];

        if (this.questionCount <= 0) {

            this.store.dispatch(
                LessonActions.updateLessonProgress(
                    { progress: 100 },
                    this.courseID, this.moduleID, this.lessonID)
            );

            if (nextLesson) {

                Router.push(`/lesson/${nextLesson.id}`);

            } else {

                Router.push(`/course/${this.courseID}`);

            }

        } else {

            if (!this.results.find(result => !result)) {

                if (nextLesson) {

                    Router.push(`/lesson/${nextLesson.id}`);

                } else {

                    Router.push(`/course/${this.courseID}`);

                }

            }

        }

    }

}

export { LessonMain };
