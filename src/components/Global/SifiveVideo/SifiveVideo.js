
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * SifiveVideo LitElement
 * template
 */
@customElement('sifive-video')
class SifiveVideo extends LitElement {

    @property({ type: String })
    src = '';

    @property({ type: String })
    poster = '';

    @property({ type: Boolean })
    autoplay = false;

    @property({ type: Boolean, reflect: true })
    muted = false;

    @property({ type: Boolean })
    loop = false;

    @property({ type: Boolean, reflect: true })
    playing = false;

    @property({ type: Number })
    volume = 1;

    @property({ type: Number })
    progress = 0;

    @property({ type: Number })
    duration = 0;

    @property({ type: Number })
    speed = 1;

    availableSpeeds = [
        .5, .7, 1, 1.3, 1.5, 1.7, 2.,
    ];

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

        const durationMin = Math.floor(this.duration / 60);
        const durationSec = Math.floor(this.duration - durationMin * 60);
        const durationString = `${(durationMin + '').padStart(2, '0')}:${(durationSec + '').padStart(2, '0')}`;

        const current = this.progress * this.duration;
        const currentMin = Math.floor(current / 60);
        const currentSec = Math.floor(current - currentMin * 60);
        const currentString = `${(currentMin + '').padStart(2, '0')}:${(currentSec + '').padStart(2, '0')}`;

        return html`
            <!-- SifiveVideo Component -->
            <video src="${this.src}" poster="${this.poster}"
                ?autoplay="${this.autoplay}"
                ?muted="${this.muted}"
                ?loop="${this.loop}"
                @click="${this.onVideoClick}"
                @timeupdate="${this.onTimeupdate}"
                @canplay="${this.onCanPlay}"
                preload="auto" playsinline></video>
            <div class="ui">
                <div class="controls">
                    <div class="play-pause" @click="${this.onPlayPauseClick}">
                        <svg-icon class="play" src="assets/images/icons/play.svg"></svg-icon>
                        <svg-icon class="pause" src="assets/images/icons/pause.svg"></svg-icon>
                    </div>
                    <div class="divider"></div>
                    <div class="jump-back" @click="${this.onJumpBackClick}">
                        <svg-icon src="assets/images/icons/jump_15_back.svg"></svg-icon>
                    </div>
                    <div class="divider"></div>
                    <div class="speed" @click="${this.onSpeedClick}">
                        <div class="border">
                            ${this.getSpeedString(this.speed)}x
                        </div>
                        <div class="speed-list">
                            ${this.availableSpeeds.map((speed) => {

                                let classString = '';
                                if (speed === this.speed) {

                                    classString = 'active';

                                }

                                return html`
                                <div
                                    class="speed-setting ${classString}"
                                    @click=${() => this.setSpeed(speed)}>
                                    ${this.getSpeedString(speed)}x
                                </div>`;

                            })}
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="progress-bar">
                        <div class="progress-bar-container" @click="${this.onProgressBarClick}">
                            <div class="progress-bar-background"></div>
                            <div class="progress-bar-bar" style="transform: translate(0, -50%) scale(${this.progress}, 1)"></div>
                        </div>
                        <div class="progress-time">${currentString}/${durationString}</div>
                    </div>
                    <div class="divider"></div>
                    <div class="fullscreen" @click="${this.onFullscreenClick}">
                        <svg-icon src="assets/images/icons/fullscreen.svg"></svg-icon>
                    </div>
                    <div class="divider"></div>
                    <div class="volume">
                        <svg-icon src="assets/images/icons/speaker.svg" @click="${this.onMuteClick}"></svg-icon>
                        <div class="volume-bar-container" @click="${this.onVolumeBarClick}">
                            <div class="volume-bar"></div>
                            <div class="volume-bar-bar" style="width:${this.volume * 100 + '%'}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    }

    /**
     * Setup
     * @param {Object}changedProps
     */
    firstUpdated(changedProps) {

        this.$video = DOMUtils.q('video', this.shadowRoot);
        this.$progressBar = DOMUtils.q('.progress-bar-container', this.shadowRoot);
        this.$volumeBar = DOMUtils.q('.volume-bar-container', this.shadowRoot);
        this.$speedList = DOMUtils.q('.speed-list', this.shadowRoot);

        DOMUtils.on(this.$speedList, 'mouseenter', () => {

            window.clearTimeout(this.speedListLeave);

        });

        DOMUtils.on(this.$speedList, 'mouseleave', () => {

            this.speedListLeave = window.setTimeout(() => {

                this.hideSpeedList();

            }, 3000);

        });

    }

    /**
     * Check if can continue
     * @param {Object} changedProps
     */
    updated(changedProps) {

        this.$video.volume = this.muted ? 0 : this.volume;

    }

    /**
     *
     */
    checkMeta() {

        this.duration = this.$video.duration;

    }

    /**
     *
     */
    togglePlay() {

        this.playing = !this.playing;

        if (this.playing) {

            this.$video.play();

        } else {

            this.$video.pause();

        }

    }

    /**
     *
     */
    toggleMute() {

        this.muted = !this.muted;

    }

    /**
     * @param {Number} percent
     */
    setProgress(percent) {

        this.progress = percent;

        if (this.$video.duration &&
            this.$video.currentTime !== this.$video.duration * this.progress) {

            this.$video.currentTime = this.$video.duration * this.progress;

        }

    }

    /**
     * @param {Number} percent
     */
    setVolume(percent) {

        this.volume = percent;

    }

    /**
     * Set playback speed
     * @param {number} speed
     */
    setSpeed(speed) {

        this.speed = speed;
        this.$video.playbackRate = speed;

    }

    /**
     * Build string for speed button
     * @param {Number} number
     * @return {String}
     */
    getSpeedString(number) {

        return parseFloat(Math.round(number * 100) / 100).toFixed(1);

    }

    /**
     * Show speed setting
     */
    showSpeedList() {

        DOMUtils.addClass(this.$speedList, 'active');

    }

    /**
     * Hide speed setting
     */
    hideSpeedList() {

        DOMUtils.removeClass(this.$speedList, 'active');

    }

    /**
     * Enter video fullscreen
     */
    enterFullscreen() {

        if (this.requestFullscreen) {

            this.requestFullscreen();

        } else if (this.mozRequestFullScreen) {

            this.mozRequestFullScreen();

        } else if (this.webkitRequestFullscreen) {

            this.webkitRequestFullscreen();

        } else if (this.msRequestFullscreen) {

            this.msRequestFullscreen();

        }

    }
    /**
     * Exit video fullscreen
     */
    exitFullscreen() {

        if (document.exitFullscreen) {

            document.exitFullscreen();

        } else if (document.mozExitFullscreen) {

            document.mozExitFullscreen();

        } else if (document.webkitFullscreen) {

            document.webkitFullscreen();

        } else if (document.msExitFullscreen) {

            document.msExitFullscreen();

        }

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onVideoClick(event) {

        this.togglePlay();

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onTimeupdate(event) {

        this.progress = this.$video.currentTime / this.$video.duration;

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onPlayPauseClick(event) {

        this.togglePlay();

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onJumpBackClick(event) {

        this.$video.currentTime = Math.max(0, this.$video.currentTime - 15);

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onFullscreenClick(event) {

        if (document.fullscreenElement) {

            this.exitFullscreen();

        } else {

            this.enterFullscreen();

        }

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSpeedClick(event) {

        if (DOMUtils.hasClass(this.$speedList, 'active')) {

            this.hideSpeedList();

        } else {

            this.showSpeedList();

        }

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onMuteClick(event) {

        this.toggleMute();

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onProgressBarClick(event) {

        const { width, x } = this.$progressBar.getBoundingClientRect();

        const percent = (event.clientX - x) / width;

        this.setProgress(percent);

        event.stopPropagation();

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onVolumeBarClick(event) {

        const { width, x } = this.$volumeBar.getBoundingClientRect();

        const percent = (event.clientX - x) / width;

        this.setVolume(percent);

        event.stopPropagation();

    }

    /**
     * DragEnd handler
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onCanPlay(event) {

        this.checkMeta();

    }

}

export { SifiveVideo };
