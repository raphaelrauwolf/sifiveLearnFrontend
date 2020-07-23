
import {
    html, customElement, property, eventOptions
} from 'lit-element';

// redux dependencies
// TODO: add assessment selectors

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Course/CourseSummaryRow';
import 'Components/Course/CourseSummarySplash';
import 'Components/Global/SifiveLoader';
import 'Components/Global/SifiveButton';

import 'Components/Global/RichTextEditor';

import 'Components/Global/SVGIcon';

import { store } from 'Root/store';
import AssessmentActions from 'Actions/Assessment';

import { getStyles } from './Styles';
import { getPendingAssessments as getPendingAssessmentsFromState,
    getPendingAssessmentsStatus as getPendingAssessmentsStatusFromState } from 'Selectors/Assessment'
import { getTeams } from 'Selectors/User'

const DOWNLOAD_STATUS = {
    DOWNLOADING: 'DOWNLOADING',
    DOWNLOADED: 'DOWNLOADED'
}

/**
 * AssessmentEvaluation LitElement
 * template
 */
@customElement('assessment-evaluation')
class AssessmentEvaluation extends ConnectedComponent {

    @property({ type: Object })
    courses = {};

    @property({ type: Boolean })
    multipleTeams = false

    @property({ type: String })
    downloadStatus = ''

    @property({ type: String })
    downloadUrl = ''

    // Rich text editor assessment feedback content to be submitted
    @property({ type: String, reflect: true })
    assessmentContent = ''

    @property({ type: Boolean })
    showRubricGuidelines = false

    @property({ type: Number })
    gradeValue = 80

    // Pending assessments array returned from API
    @property({ type: Array })
    pendingAssessments = getPendingAssessmentsFromState(this.store.getState()) || []

    @property({ type: Array })
    userTeams = getTeams(this.store.getState()) || []

    // Terms checkbox
    @property({ type: Boolean })
    termsAgreed = false

    // Terms checkbox
    @property({ type: Boolean })
    submitAttempt = false

    // Terms checkbox
    @property({ type: Function })
    onSubmit = () => {}

    @property({ type: String })
    pendingAssessmentsStatus = getPendingAssessmentsStatusFromState(this.store.getState())

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Handle Download Assessment button click
     */
    handleGetAssessmentBtn() {

        this.downloadStatus = DOWNLOAD_STATUS.DOWNLOADING

        const assessment = this.pendingAssessments[0]
        const assessmentId = assessment.id
        const lessonId = assessment.lesson.id
        const courseId = assessment.lesson.module.courseId
        const moduleId = assessment.lesson.module.id

        store.dispatch(AssessmentActions.getAssessment(assessmentId, { lessonId, courseId, moduleId }))
            .then((res) => {
                const { response } = res
                const { signedPath } = response
                this.downloadUrl = signedPath
                window.open(signedPath)
                this.downloadStatus = DOWNLOAD_STATUS.DOWNLOADED
            })

    }

    handleGradeSliderChange(event) {
        this.gradeValue = event.target.value
    }

    submitEvaluationBtn(event) {
        if (!this.termsAgreed || isAssessmentContentEmpty(this.assessmentContent)) {
            this.submitAttempt = true
            return
        }

        const assessment = this.pendingAssessments[0]
        const assessmentId = assessment.id
        const userTeam = this.userTeams[0]
        const teamId = userTeam.id

        const data = {
            content: this.assessmentContent,
            grade: this.gradeValue
        }
        const params = {
            assessmentId,
            teamId,
        }
        this.store.dispatch(AssessmentActions.createAssessmentEvaluation(data, params))
            .then((res) => {
                if (res.type === "ASSESSMENT.CREATE_ASSESSMENT_EVALUATION_SUCCESS") {
                    this.onSubmit && this.onSubmit()
                }
            })
    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {
        this.pendingAssessmentsStatus = getPendingAssessmentsStatusFromState(this.store.getState())
        this.pendingAssessments = getPendingAssessmentsFromState(state)
        this.userTeams = getTeams(this.store.getState()) || []

    }

    /**
     * Editable blur callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onEditorChange(event) {

        this.assessmentContent = event.detail.html;

        event.stopPropagation();

    }

    /**
     * Handle clicking checkbox
     * @param {Object} event
     */
    handleTermsCheckbox(event) {
        this.termsAgreed = event.target.checked
        this.submitAttempt = false
    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        if (this.pendingAssessments == null && this.pendingAssessmentsStatus === 'PENDING') {
            return html`<sifive-loader></sifive-loader>`
        }

        const userTeam = this.userTeams[0]
        const userTeamName = userTeam.name
        // const userTeamID = userTeam.id

        const assessment = this.pendingAssessments[0]
        const { createdAt, lesson, creator } = assessment
        const { firstname, lastname } = creator
        const fullName = firstname + ' ' + lastname

        const { course } = lesson.module

        const createDate = new Date(createdAt);
        const day = createDate.getDate().toString().padStart(2, '0');
        const month = createDate.toLocaleString('default', { month: 'long' });
        const year = createDate.getFullYear();
        const submissionDate = `${day} ${month}, ${year}`;

        console.log('this.submitAttempt', this.submitAttempt)
        console.log('this.assessmentContent', this.assessmentContent, !this.assessmentContent)

        const assessmentInfoHTML = html`
            <div class="row-item">
                <div class="row-title">
                    Course
                </div>
                <div class="row-content">
                    <a href=${`/course/${course.id}`}>${course.name}</a>
                </div>
            </div>
            <div class="row-item">
                <div class="row-title">
                    Lesson
                </div>
                <div class="row-content">
                    <a href=${`/lesson/${lesson.id}`}>${lesson.name}</a>
                </div>
            </div>
            <div class="row-item">
                <div class="row-title">
                    Student
                </div>
                <div class="row-content">
                    <a href="${`/user/${creator.id}`}">${fullName}</a>
                </div>
            </div>
            <div class="row-item">
                <div class="row-title">
                    Team
                </div>
                <div class="row-content">
                    ${userTeamName}
                </div>
            </div>
            <div class="row-item">
                <div class="row-title">
                    Submission Date
                </div>
                <div class="row-content" style="display:flex;">
                    <time style="width: 25%">${submissionDate}</time>
                    <div>
                        <svg-icon src="assets/images/icons/start_time.svg" alt="Estimated Time Icon"></svg-icon>
                        Above average review time
                    </div>
                </div>
            </div>
        `
        return html`
            <div class="wrapper">
                <header class="header-title">
                    <div class="flex-display">
                        <h3>Assessment</h3>
                        <div>
                            <span class="estimate-time">
                                <svg-icon src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon"></svg-icon>
                                Est. Time &vert;
                            </span>
                            <span>15 M</span>
                        </div>
                    </div>
                </header>

                <section class="divider-bottom">
                    ${assessmentInfoHTML}

                    ${this.downloadStatus !== DOWNLOAD_STATUS.DOWNLOADED ?
                        html`
                            <sifive-button label="Download Assessment" @click=${this.handleGetAssessmentBtn}>
                                <svg-icon src="assets/images/icons/download.svg"></svg-icon>
                            </sifive-button>
                        ` :
                        html`
                            <sifive-button label="Downloaded" disabled="true" class="btn-success text-green">
                                <svg-icon slot="icon" src="assets/images/icons/upload.svg" style="stroke: #4DB54D"></svg-icon>
                            </sifive-button>
                            <a href=${this.downloadUrl} target="_blank"><svg-icon src="assets/images/icons/download.svg"></svg-icon>Download Assessment Again</a>
                        `
                    }
                </section>

                <section class="divider-bottom">
                    <h5 class="mb-1-5">Rubric & Guidelines For Review</h5>
                    <div>
                        <a href="/"><svg-icon src="assets/images/icons/download.svg"></svg-icon>
                        Download as PDF
                        </a>
                        ${(this.downloadStatus === DOWNLOAD_STATUS.DOWNLOADED) ?
                            html`
                                <span class="read-rubric-guidelines"><a href="/" @click=${() => this.showRubricGuidelines = !this.showRubricGuidelines}>${`${this.showRubricGuidelines ? `Hide` : `Read`} Rubric Guidelines`}</a></span>
                            ` : ''}
                    </div>

                    ${(this.downloadStatus !== DOWNLOAD_STATUS.DOWNLOADED || this.showRubricGuidelines) ?
                        html`
                            <div class="rubric-container">
                                <div class="rubric-row">
                                    <div>A rubric is a scoring guide used to assess performance against a set criteria. At a minimum, it is a list of the components you are looking for when you evaluate. A rubric is a scoring guide used to assess performance against a set criteria. At a minimum, it is a list of the components you are looking for when you evaluate. </div>
                                </div>
                                <div class="flex-display rubric-numbers">
                                    <div>
                                        <div class="small-number">30%</div>
                                        <div class="label">Inadequate</div>
                                    </div>
                                    <div>
                                        <div class="small-number">45%</div>
                                        <div class="label">Marginal</div>
                                    </div>
                                    <div>
                                        <div class="small-number">60%</div>
                                        <div class="label">Fair</div>
                                    </div>
                                    <div>
                                        <div class="small-number">80%</div>
                                        <div class="label">Good</div>
                                    </div>
                                    <div>
                                        <div class="small-number">100%</div>
                                        <div class="label">Excellent</div>
                                    </div>
                                </div>
                            </div>
                        ` : ''
                    }
                </section>

                ${this.downloadStatus === DOWNLOAD_STATUS.DOWNLOADED ?
                    html`
                    <section class="divider-bottom">
                        <h5 class="mb-1-5">Write Feedback</h5>
                        <rich-text-editor class="mb-1-5" @change="${this.onEditorChange}"></rich-text-editor>
                        <p class="bold">Write an overall descriptive feedback on how the student did on their assessment.</p>
                    </section>
                    ` :
                    html`
                        <a href="/" @click=${this.handleGetAssessmentBtn}>Done Reading Guidelines? Download Assessment</a>
                    `}
                ${this.downloadStatus === DOWNLOAD_STATUS.DOWNLOADED ?
                    html`
                    <section class="grading-box mb-3">
                        <div class="flex-display grade-slider-instructions">
                            <h5>Required Passing Score</h5>
                            <p class="bold">Drag the green circle in the middle to define the required score</p>
                        </div>
                        <div class="grade-slider-section">
                          <input class="grade-slider" type="range" min="1" max="100"
                              value=${this.gradeValue} @input=${this.handleGradeSliderChange}>
                          <div class="big-number grade">${this.gradeValue}%</div>
                        </div>
                    </section>
                    <div class="form-container">
                        <div>
                            <sifive-button label="Submit" class="btn-submit" @click=${this.submitEvaluationBtn}>
                                <svg-icon src="assets/images/icons/download.svg"></svg-icon>
                            </sifive-button>
                            <div class="form-error small">${this.submitAttempt && isAssessmentContentEmpty(this.assessmentContent) ? 'Must write feedback.' : ''}</div>
                        </div>
                        <div class="checkbox-container">
                            <sifive-checkbox id="terms-checkbox" required="true" value=${this.termsAgreed}
                                @input=${this.handleTermsCheckbox}></sifive-checkbox>
                            <label class="checkbox-label">I acknowledge the terms and conditions</label>
                            <div class="form-error terms small">${this.submitAttempt && !this.termsAgreed ? 'Must accept terms' : ''}</div>
                        </div>
                    </div>
                ` : ''}

            </div>
        `
    }

}

export { AssessmentEvaluation };

/*********************************/

function isAssessmentContentEmpty (assessmentContent) {
    return !assessmentContent || assessmentContent === '<p><br></p>'
}