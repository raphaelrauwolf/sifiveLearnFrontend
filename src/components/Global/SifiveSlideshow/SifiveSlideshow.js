
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import 'Components/Global/SifiveImage';

import { getStyles } from './Styles';

/**
 * SifiveSlideshow LitElement
 * template
 */
@customElement('sifive-slideshow')
class SifiveSlideshow extends LitElement {

    @property({ type: Boolean, reflect: true })
    loaded = false;

    @property({ type: Number })
    activeIndex = 0;

    @property({ type: Array })
    media = [];

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

        const slides = this.media.map((media) => {

            return html`
                <div class="slide">
                    <sifive-image src="${media.signedPath}" alt="${media.originalFilename}" @load=${this.onImageLoad}></sifive-image>
                </div>`;

        });

        const pages = this.media.map((media, index) => {

            const onClick = () => {

                this.goto(index);

            };

            return html`
                <div class="page ${index === this.activeIndex ? 'active' : ''}"
                    @click=${onClick}>
                    <div class="page-inner"></div>
                </div>`;

        });

        return html`
            <!-- SifiveSlideshow Component -->
            <div class="wrapper" @keydown=${this.onKeyDown} tabindex="0">
                <div class="slide-container" style="${`transform: translate(-${this.width * this.activeIndex}px, 0)`}">
                    ${slides}
                </div>
            </div>
            <div class="ui">
                <div class="pagination">
                    ${pages}
                </div>
            </div>
        `;

    }

    /**
     * Check and set width
     */
    updated() {

        this.width = this.shadowRoot.host.getBoundingClientRect().width;
        const slides = DOMUtils.a('.slide', this.shadowRoot);

        slides.forEach(slide => slide.style.width = this.width + 'px');

    }

    /**
     * @param {Number} index
     */
    goto(index) {

        this.activeIndex = index;

    }

    /**
     */
    next() {

        this.activeIndex = this.activeIndex + 1;

        if (this.activeIndex > this.media.length - 1) {

            this.activeIndex = 0;

        }

    }

    /**
     */
    prev() {

        this.activeIndex = this.activeIndex - 1;

        if (this.activeIndex < 0) {

            this.activeIndex = this.media.length - 1;

        }

    }

    /**
     */
    first() {

        this.activeIndex = 0;

    }

    /**
     */
    last() {

        this.activeIndex = this.media.length - 1;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({})
    onKeyDown(event) {

        switch (event.key) {

            case 'ArrowRight':
            case 'd':
                this.next();
                event.preventDefault();
                break;
            case 'ArrowLeft':
            case 'a':
                this.prev();
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'w':
                this.first();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'ArrowDown':
            case 's':
                this.last();
                event.preventDefault();
                event.stopPropagation();
                break;
            default:

        }

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onImageLoad(event) {

        console.log('imgload');

        const $images = DOMUtils.a('sifive-image', this.shadowRoot);
        const missing = $images.find($img => !$img.imageVisible);

        if (!missing) {

            this.loaded = true;

        }

    }


}

export { SifiveSlideshow };
