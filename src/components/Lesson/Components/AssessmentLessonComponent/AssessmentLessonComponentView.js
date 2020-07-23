
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { store } from 'Root/store';
import AssessmentActions from 'Actions/Assessment';

// Load required components
import { LessonComponent } from 'Components/Lesson/LessonComponent';
import { hasArrayChanged } from 'Components/hasArrayChanged';

import DOMUtils from 'Utils/DOMUtils';
import { getStyles } from './Styles';

import { getRole } from 'Selectors/User';
import { ROLES } from 'Constants/User';

import { getMediaList } from 'Selectors/Media';

import { TERMS_PATH } from 'Constants/Paths';
const assessmentContentId = 'assessment-content';
const gradingContentId = 'grading-content';
const UPLOAD_SUCCESSFUL = 'UPLOAD_SUCCESSFUL';
const UPLOAD_PENDING = 'UPLOAD_PENDING';

export const TYPE = 'LESSON_COMPONENT_TYPE.ASSESSMENT';

/**
 * AssessmentLessonComponentView LitElement
 * template
 */
@customElement('assessment-lesson-component-view')
class AssessmentLessonComponentView extends LessonComponent {

    @property({ type: Object })
    params = {};

    @property({ type: Object })
    media = {};

    @property({ type: Object, reflect: true })
    data = {
        assessmentContent: '',
        gradingContent: '',
        media: [],
    };

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    uploaded = [];

    @property({ type: String })
    uploadStatus = ''

    @property({ type: Array })
    files = []

    // Terms checkbox
    @property({ type: Boolean })
    termsAgreed = false

    // used only for displaying form error
    @property({ type: Boolean })
    submitAttempt = false;
    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Return content for DB
     * @return {String}
     */
    getContent() {

        return {
            type: TYPE,
            data: this.data,
        };

    }

    /**
     * Handle pressing "Upload Assessment" button (note: doesn't actually submit)
     * @param {Object} event
     */
    handleUploadFileBtn(event) {
        this.files = [...event.target.files]

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
     * Handle submitting file to upload
     * @param {Object} event
     */
    handleSubmitClick(event) {

        this.submitAttempt = true

        if (this.files.length <= 0 ||
            !this.termsAgreed) {

            return

        }

        this.uploadFiles(this.files);
    }

    formIsValid() {
        return this.termsAgreed && this.files.length >= 0
    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        let uploadComponent;

        if (this.files.length > 0) {
            uploadComponent = html`
                <label for="input-upload-assessment">
                    <sifive-button label="Upload Successful" propagation="true" class="btn-success">
                        <svg-icon slot="icon" src="assets/images/icons/upload.svg" style="stroke: #4DB54D"></svg-icon>
                    </sifive-button>
                </label>
                <input id="input-upload-assessment" type="file" @change=${this.handleUploadFileBtn} />
            `
        } else {
            uploadComponent = html`
                <label for="input-upload-assessment">
                    <sifive-button label="Upload Assessment" propagation="true">
                        <svg-icon slot="icon" src="assets/images/icons/upload.svg"></svg-icon>
                    </sifive-button>
                </label>
                <input id="input-upload-assessment" type="file" @change=${this.handleUploadFileBtn} />
            `
        }

        let submitButton

        if (this.uploadStatus === UPLOAD_PENDING) {
            submitButton = html`
            <sifive-button label="Submitting" @click=${this.handleSubmitClick}
                class="btn-disabled" disabled="true"></sifive-button>
            `
        } else if (this.uploadStatus === UPLOAD_SUCCESSFUL) {
            submitButton = html`
            <sifive-button label="Submitted!" @click=${this.handleSubmitClick}
                class="btn-success" disabled="true"></sifive-button>
            `
        } else {
            submitButton = html`
            <sifive-button label="Submit" @click=${this.handleSubmitClick}
                class="${!this.formIsValid() ? 'btn-disabled' : ''}"></sifive-button>
            `
        }

        return html`
            <!-- AssessmentLessonComponentView Component -->
            <div class="wrapper">
                <section class="assessment-view">
                    <div class="content" style="margin: 0 auto 50px;max-width:800px;">
                        ${unsafeHTML(this.data.assessmentContent)}
                    </div>
                    <div style="margin-bottom:40px;">
                        ${uploadComponent}
                        <div class="form-error small">${this.submitAttempt && this.files.length <= 0 ? 'Must upload assessment' : ''}</div>
                    </div>
                    <div class="mb-3">
                        <sifive-checkbox id="terms-checkbox" required="true" value=${this.termsAgreed}
                            @input=${this.handleTermsCheckbox} ></sifive-checkbox>
                        <label>By submitting you agree to the <a href="${TERMS_PATH}" target="_blank">Terms & Conditions</a> and the Honor Code</label>
                        <div class="form-error small">${this.submitAttempt && !this.termsAgreed ? 'Must accept terms' : ''}</div>
                    </div>
                    ${submitButton}
                </section>
            </div>
        `;

    }

    /**
     * Return tag for DB
     * @return {String}
     */
    getSerialized() {

        const data = {};
        data.assessmentContent = JSON.stringify(this.data.assessmentContent).replace(/"/g, '&quot;');
        data.gradingContent = JSON.stringify(this.data.gradingContent).replace(/"/g, '&quot;');

        return `<assessment-lesson-component data="${data}"></assessment-lesson-component>`;

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        return !this.$editorAssessment || !this.$editorGrading ||
            this.data.assessmentContent !== this.$editorAssessment.getHTML() ||
            this.data.gradingContent !== this.$editorGrading.getHTML();

    }

    /**
     * Setup editor
     * @param {Object}changedProperties
     */
    firstUpdated(changedProperties) {

        this.$editorAssessment = DOMUtils.q(`rich-text-editor.${assessmentContentId}`, this.shadowRoot);
        this.$editorGrading = DOMUtils.q(`rich-text-editor.${gradingContentId}`, this.shadowRoot);

    }

    /**
     * Lifecycle update
     * @param  {Map} changedProps
     */
    updated(changedProps) {

        if (this.media) {

            const storeMediaList = Object.values(this.media);

            if (this.data.media == null) {

                this.data.media = []

            }

            this.data.media.forEach((media, index) => {

                const storeMedia = storeMediaList.find(storeMedia =>
                    storeMedia.uuid === media);

                if (
                    typeof media !== 'object' &&
                    storeMedia
                ) {

                    this.data.media[index] = storeMedia;
                    this.data = {
                        ...this.data,
                    };

                }

            });

        }

    }

    /**
     * @param {Object} media
     */
    selectMedia(media) {

        // only allow one media file if video or pdf
        if (this.data.type === 'Video' || this.data.type === 'PDF') {

            this.selectedMedia = [media.uuid];

            this.data = {
                ...this.data,
                media: [media.uuid],
            };

        } else if (this.data.media.indexOf(media.uuid) < 0) {

            this.selectedMedia.push(media.uuid);

            this.data = {
                ...this.data,
                media: this.selectedMedia,
            };

        }

        this.emitChange();

    }

    /**
     * @param  {Object} state
     */
    stateChanged(state) {

        this.media = getMediaList(state);

        this.userRole = ROLES[getRole(state)];
        this.requestUpdate();

    }

    /**
     * Editable blur callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onEditorChange(event) {

        const { id } = event.currentTarget;

        if (id === assessmentContentId) {

            this.data.assessmentContent = event.detail.html;

        } else if (id === gradingContentId) {

            this.data.gradingContent = event.detail.html;

        }

        event.stopPropagation();

        this.dispatchEvent(new CustomEvent('data-change', {
            detail: {
                data: this.data,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * @param {Array} files
     * @return {Promise}
     */
    uploadFiles(files) {

        this.uploadPending = true;
        this.uploadStatus = UPLOAD_PENDING;

        const uploads = files.map((file) => {

            return store.dispatch(AssessmentActions.addAssessment(file, this.params));

        });

        return Promise.all(uploads).then((data) => {

            this.uploaded = [
                ...this.uploaded,
                ...data.map(entry => entry.response.id),
            ];

            this.uploadPending = false;

            this.uploadStatus = UPLOAD_SUCCESSFUL;

        });

    }

}

export { AssessmentLessonComponentView };
