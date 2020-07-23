
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

// Load required components
import { LessonComponent } from 'Components/Lesson/LessonComponent';
import { hasArrayChanged } from 'Components/hasArrayChanged';

import DOMUtils from 'Utils/DOMUtils';
import { getStyles } from './Styles';

import { getRole } from 'Selectors/User';
import { ROLES } from 'Constants/User';

import { getMediaList } from 'Selectors/Media';

const assessmentContentId = 'assessment-content';
const gradingContentId = 'grading-content';

export const TYPE = 'LESSON_COMPONENT_TYPE.ASSESSMENT';

/**
 * AssessmentLessonComponentEdit LitElement
 * template
 */
@customElement('assessment-lesson-component-edit')
class AssessmentLessonComponentEdit extends LessonComponent {

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
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- AssessmentLessonComponentEdit Component -->
            <div class="wrapper editing">
                <h3 class="component-title">Assessment Instructions</h3>
                <p>This is the text the learner sees on the Assessment page. Add instructions for the learner here.</p>
                <p>Note that we add file upload by default.</p>
                <rich-text-editor
                    id="${assessmentContentId}"
                    content="${this.data.assessmentContent || ''}"
                    @change="${this.onEditorChange}"
                ></rich-text-editor>
                <h3 class="component-title">Grading Instructions</h3>
                <p>This is only visible to Assessors when they are reviewing learner submissions for this Assessment 
                If you want the learner to be aware of the grading scale used then you should also add this to the instructions above.</p>
                <rich-text-editor
                    id="${gradingContentId}"
                    content="${this.data.gradingContent || ''}"
                    @change="${this.onEditorChange}"
                ></rich-text-editor>
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

        // auto select media
        if (changedProps.has('uploaded')) {

            const uploadedMedia =
                (this.uploaded.map(mediaID => this.media[mediaID]))
                    .reverse(); // reverse to find the last uploaded

            if (this.data.type === 'PDF') {

                const lastUpload = uploadedMedia.find(media =>
                    media.contentType.indexOf('application/pdf') === 0);

                if (lastUpload) {

                    this.selectMedia(lastUpload);

                }

            } else if (this.data.type === 'Video') {

                const lastUpload = uploadedMedia.find(media =>
                    media.contentType.indexOf('video') === 0);

                if (lastUpload) {

                    this.selectMedia(lastUpload);

                }

            } else if (this.data.type === 'Slideshow') {

                const images = uploadedMedia.filter(media =>
                    media.contentType.indexOf('image') === 0);

                images.forEach(image => this.selectMedia(image));

            }

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

}

export { AssessmentLessonComponentEdit };
