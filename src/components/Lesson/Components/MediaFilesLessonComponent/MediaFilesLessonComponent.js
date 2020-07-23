
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import { store } from 'Root/store';
import MediaActions from 'Actions/Media';
import {
    getMediaList,
    isFetchingMediaList,
} from 'Selectors/Media';

import { hasArrayChanged } from 'Components/hasArrayChanged';
import { LessonComponent } from 'Components/Lesson/LessonComponent';

import { uploadFactory } from './Factories/upload';
import { editingFactory } from './Factories/editing';
import { outputFactory } from './Factories/output';

import { getStyles } from './Styles';

export const TYPE = 'LESSON_COMPONENT_TYPE.MEDIA_FILES';

/**
 * MediaFilesLessonComponent LitElement
 * template
 */
@customElement('media-files-lesson-component')
class MediaFilesLessonComponent extends LessonComponent {

    @property({ type: Boolean })
    editing = false;

    @property({ type: Boolean })
    uploading = false;

    @property({ type: Boolean })
    isFetching = false;

    @property({ type: Boolean })
    uploadPending = false;

    @property({ type: Object })
    data = {};

    @property({ type: Object })
    resource = {};

    @property({ type: Object })
    media = {};

    @property({ type: Array })
    selectedMedia = [];

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
     * Render function
     * @return {String}  html output
     */
    render() {

        const mediaList = Object.values(this.media);

        if (this.editing && this.uploading) {

            return uploadFactory(this);

        } else if (this.editing) {

            return editingFactory(this);

        } else if (mediaList.length > 0) {

            return outputFactory(this.data, mediaList);

        } else {

            return html`<!-- MediaFilesLessonComponent Component -->`;

        }

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        return true || changedProps.has('data') && typeof changedProps.get('data') === 'undefined';

    }

    /**
     * First update
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        if (!this.editing) {

            this.data.media.forEach((mediaID) => {

                const storeMedia = Object.values(this.media)
                    .find((storeMedia) => {

                        return mediaID === storeMedia.uuid;

                    });

                if (!storeMedia) {

                    store.dispatch(MediaActions.getMedia(mediaID));

                }


            });

        } else {

            this.selectedMedia = this.data.media;

        }

    }

    /**
     * Lifecycle update
     * @param  {Map} changedProps
     */
    updated(changedProps) {

        if (this.editing) {

            this.store.dispatch(MediaActions.getMediaListIfNeeded());

        }

        if (!this.editing && this.media) {

            const storeMediaList = Object.values(this.media);

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

        // auto select media
        if (this.editing && changedProps.has('uploaded')) {

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
     * @param  {Object} state
     */
    stateChanged(state) {

        this.isFetching = isFetchingMediaList(state);
        this.media = getMediaList(state);

    }

    /**
     * Return tag for DB
     * @return {String}
     */
    getSerialized() {

        const escapedData = JSON.stringify(this.data).replace(/"/g, '&quot;');

        return `<media-files-lesson-component data="${escapedData}"></media-files-lesson-component>`;

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
     * Check if component can be sent to server
     * @return {Boolean}
     */
    isIncomplete() {

        return !this.data.media || this.data.media.length <= 0;

    }

    /**
     *
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('data-change', {
            detail: {
                data: this.data,
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * Requests a single media that wasnt found in the media list
     * @param  {String} mediaID
     */
    requestSingleMedia(mediaID) {

        this.store.dispatch(MediaActions.getMediaIfNeeded(mediaID));

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
     * @param {Object} media
     */
    deselectMedia(media) {

        this.selectedMedia.splice(this.selectedMedia.indexOf(media.uuid), 1);

        this.data = {
            ...this.data,
            media: this.selectedMedia,
        };

        this.emitChange();

    }

    /**
     * Resort media files
     * @param  {Object} media
     * @param  {Number} startIndex
     * @param  {Number} targetIndex
     */
    sortMedia(media, startIndex, targetIndex) {

        this.selectedMedia.splice(
            targetIndex,
            0,
            this.selectedMedia.splice(startIndex, 1)[0]);

        this.data = {
            ...this.data,
            media: this.selectedMedia,
        };

        this.emitChange();

    }

    /**
     * @param {Array} files
     * @return {Promise}
     */
    uploadFiles(files) {

        this.uploadPending = true;

        const uploads = files.map((file) => {

            return store.dispatch(MediaActions.addMedia(file));

        });

        const uploadPromises = Promise.all(uploads);

        uploadPromises.then((data) => {

            this.uploaded = [
                ...this.uploaded,
                ...data.map(entry => entry.response.id),
            ];

            this.uploadPending = false;

        });

        return uploadPromises;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onTypeInput(event) {

        this.data = {
            ...this.data,
            type: event.detail.value,
            media: [],
        };

        this.emitChange();

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onUploadClick(event) {

        this.uploaded = [];
        this.uploading = true;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBackClick(event) {

        this.uploading = false;
        this.uploaded = [];

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onUploadUpdate(event) {

        this.uploadFiles([...event.detail.files]);

    }

}

export { MediaFilesLessonComponent };
