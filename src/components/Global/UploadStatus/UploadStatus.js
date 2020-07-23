
import {
    html, customElement, property, eventOptions,
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

import { getMediaList } from 'Selectors/Media';
import { isLoggedIn } from 'Selectors/User';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { getStyles } from './Styles';

/**
 * UploadStatus LitElement
 * template
 */
@customElement('upload-status')
class UploadStatus extends ConnectedComponent {

    @property({ type: Boolean, reflect: true })
    open = false;

    @property({ type: Array })
    uploadingMedia = [];

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

        const uploadItems = this.uploadingMedia.map((uploadingMedia) => {

            return html`
            <div class="uploading">
                <div class="name-background">${uploadingMedia.originalFilename}</div>
                <div class="progress-bar" style=${styleMap({ width: (uploadingMedia.progress * 100) + '%' })}>
                    <div class="name">${uploadingMedia.originalFilename}</div>
                </div>
            </div>`;

        });

        return html`
            <div class="wrapper">
                ${uploadItems}
            </div>`;

    }

    /**
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        window.addEventListener('beforeunload', this.onBeforeUnload);

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.loggedIn = isLoggedIn(state);

        if (this.loggedIn) {

            this.media = getMediaList(state);

            this.uploadingMedia = Object.values(this.media)
                .filter(media => media.progress && media.progress < 1);

            if (this.uploadingMedia.length > 0) {

                this.open = true;

            } else {

                this.open = false;

            }

        }

    }

    /**
     * @param {Object} event
     * @return {Boolean}
     */
    @eventOptions({ passive: true })
    onBeforeUnload(event) {

        if (this.uploadingMedia && this.uploadingMedia.length > 0) {

            event.preventDefault();
            event.returnValue = 'Sure?';

            return false;

        }

    }

}

export { UploadStatus };
