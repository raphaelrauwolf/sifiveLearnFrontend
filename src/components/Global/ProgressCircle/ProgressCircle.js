
import {
    LitElement, html, customElement, property,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';
import { default as Resize, Events as ResizeEvents } from 'Utils/Resize';

import { getStyles } from './Styles';

/**
 * ProgressCircle LitElement
 * template
 */
@customElement('progress-circle')
class ProgressCircle extends LitElement {

    @property({ type: Number })
    percent = 0;

    @property({ type: Number })
    fontSize = 10;

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

        const style = `font-size:${this.fontSize}px;`;

        return html`
            <canvas></canvas>
            <div class="percent" style=${style}>
                ${Math.floor(this.percent)}%
            </div>`;

    }

    /**
     * Setup canvas
     * @param {Object}changedProps
     */
    firstUpdated(changedProps) {

        this.$canvas = DOMUtils.q('canvas', this.shadowRoot);
        this.ctx = this.$canvas.getContext('2d');

        Resize.addEventListener(ResizeEvents.RESIZE, () => this.draw());

    }

    /**
     * select elements
     * @param {Object}changedProps
     */
    updated(changedProps) {

        if (changedProps.has('percent')) {

            this.draw();

        }

    }

    /**
     * Update font-size depending on size
     */
    updateFontSize() {

        const { height } = this.getBoundingClientRect();

        this.fontSize = Math.floor(height * .2);

    }

    /**
     * Draw circle in canvas
     */
    draw() {

        this.updateFontSize();

        const { width, height } = this.getBoundingClientRect();
        const dpr = window.devicePixelRatio;
        const pxWidth = width * dpr;
        const pxHeight = height * dpr;
        const lineWidth = Math.round(Math.min(pxWidth, pxHeight) * .05);
        const radius = Math.min(pxWidth, pxHeight) / 2 - lineWidth * 2;

        this.$canvas.width = pxWidth;
        this.$canvas.height = pxHeight;
        this.$canvas.style.width = width + 'px';
        this.$canvas.style.height = height + 'px';

        this.ctx.clearRect(0, 0, pxWidth, pxHeight);

        // draw background ring
        this.ctx.strokeStyle = '#ECECEC';
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(pxWidth / 2, pxHeight / 2, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // draw percent ring
        const start = -Math.PI / 2;
        const end = start + Math.PI * 2 * (this.percent / 100);
        this.ctx.strokeStyle = this.getPercentRingColor();
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(pxWidth / 2, pxHeight / 2, radius, start, end);
        this.ctx.stroke();

    }

    /**
     * check what color to user for the ring
     * @return {String}
     */
    getPercentRingColor() {

        if (this.percent < 20) {

            return '#FE1A1A';

        } else if (this.percent < 50) {

            return '#FFBD0C';

        } else if (this.percent < 100) {

            return '#0033FF';

        } else {

            return '#33FF66';

        }

    }

}

export { ProgressCircle };
