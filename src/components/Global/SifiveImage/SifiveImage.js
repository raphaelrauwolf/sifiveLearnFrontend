
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import Cache from 'Utils/Cache';

import { getStyles } from './Styles';

/**
 * SifiveImage LitElement
 * template
 */
@customElement('sifive-image')
class SifiveImage extends LitElement {

    @property({ type: String })
    src = '';

    @property({ type: String })
    alt = '';

    @property({ type: Boolean })
    loaded = false;

    @property({ type: Boolean, attribute: 'image-visible', reflect: true })
    imageVisible = false;

    @property({ type: Boolean, reflect: true })
    portrait = false;

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

        return html`
            <!-- SifiveImage Component -->
            ${this.loaded ?
                html`<img src="${this.src}" alt="${this.alt}" @load=${this.onImageLoad} />`:
                ''}
        `;

    }

    /**
     * Check if src changed
     * @param {Map} changedProps
     */
    updated(changedProps) {

        if (changedProps.has('src')) {

            this.loaded = false;
            this.loadIfNeeded();

        }

    }

    /**
     * Check if loaded and if in cache before load
     */
    loadIfNeeded() {

        if (!this.loaded && this.src.length > 0) {

            if (!Cache.isInCache(this.src)) {

                this.loadImage();

            }

            Cache.add(this.src, (content) => {

                this.loaded = content instanceof Image;

            });

        }

    }

    /**
     * Load the image
     */
    loadImage() {

        const img = new Image();
        this._image = img;
        img.onload = () => {

            this.portrait = img.naturalWidth <= img.naturalHeight;
            Cache.finish(this.src, img);

        };
        img.onerror = () => Cache.finish(this.src, '');
        img.src = this.src;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onImageLoad(event) {

        this.imageVisible = true;

        this.dispatchEvent(new CustomEvent('load', {
            detail: {
                image: this,
            },
            bubbles: false,
            composed: true,
        }));

    }


}

export { SifiveImage };
