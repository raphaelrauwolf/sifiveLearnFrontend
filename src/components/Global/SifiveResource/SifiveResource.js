
import {
    customElement, property,
} from 'lit-element';

import { addMedia, getMedia } from 'Actions/Media';
import { getMediaByUUID, isFetchingMedia } from 'Selectors/Media';
import { isLoggedIn } from 'Selectors/User';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';

import { imageFactory } from './Factories/image';

import { getStyles } from './Styles';

/**
 * SifiveResource LitElement
 * template
 */
@customElement('sifive-resource')
class SifiveResource extends ConnectedComponent {

    @property({ type: String, reflect: true })
    uuid = '';

    @property({ type: String })
    src = '';

    @property({ type: String })
    name = '';

    @property({ type: Boolean, attribute: 'need-upload' })
    needUpload = false;

    @property({ type: Boolean })
    isUploading = false;

    @property({ type: Boolean })
    loggedIn = false;

    @property({ type: String })
    type = '';

    @property({ type: Object })
    file = {};

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

        const content = '';

        if (!this.type || !this.loggedIn) {

            return '';

        }

        if (this.type && this.type.indexOf('image') === 0) {

            return imageFactory(this.src);

        }

        return content;

    }

    /**
     * Check if upload or fetch is needed
     * @param  {Map} changedProps
     */
    firstUpdated(changedProps) {

        const debug = [];
        changedProps.forEach((oldValue, propName) => {

            debug.push(`${propName}: ${oldValue} => ${this[propName]}`);

        });

        if (this.loggedIn && this.needUpload && !this.isUploading) {

            this.upload();

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.loggedIn = isLoggedIn(state);

        if (this.loggedIn &&
            !this.needUpload &&
            !this.isUploading &&
            this.uuid && this.uuid !== '') {

            this.media = getMediaByUUID(state, this.uuid);

            if (!this.media && !isFetchingMedia(state)) {

                this.store.dispatch(getMedia(this.uuid));

            } else if (this.media) {

                this.src = this.media.signedPath;
                this.type = this.media.contentType;

            }

        }

    }

    /**
     * Upload the given file
     */
    upload() {

        this.isUploading = true;

        this.store.dispatch(addMedia(this.file)).then((action) => {

            this.uuid = action.response.uuid;

            this.isUploading = false;
            this.needUpload = false;

            this.dispatchEvent(new CustomEvent('upload', {
                detail: {
                    uuid: this.uuid,
                },
                bubbles: false,
                composed: true,
            }));

        });

    }

}

export { SifiveResource };
