import { css } from 'lit-element';
import { SharedStyles } from 'Styles/SharedStyles';

/**
 * Generate styles for lit-element
 * @param {Function} data context for style creation
 * @return {String} styles
 */
function getStyles(data) {

    return [
        SharedStyles,
        css`
            :host {
                display: inline-block;
                position: relative;
            }
            video {
                cursor: pointer;
                display: block;
                height: auto;
                max-height: 100%;
                width: 100%;
            }
            .ui {
                height: 100%;
                left: 0;
                pointer-events: none;
                position: absolute;
                top: 0;
                width: 100%;
            }
            .controls {
                align-items: center;
                background-color: var(--app-color-white);
                bottom: 0;
                display: flex;
                height: 50px;
                left: 50%;
                padding-left: 10px;
                padding-right: 10px;
                pointer-events: auto;
                position: absolute;
                transform: translate(-50%, 0);
                width: calc(100% - 24px);
            }

            .controls .divider {
                background-color: rgba(var(--app-color-black-rgb), .1);
                height: 16px;
                width: 1px;
            }

            .play-pause {
                cursor: pointer;
                height: 100%;
                position: relative;
                width: 44px;
            }
            .play-pause svg-icon {
                display: none;
                fill: var(--app-color-blue);
                height: 15px;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 15px;
            }
            .play-pause .play {
                display: block;
            }
            :host([playing]) .play-pause .play {
                display: none;
            }
            :host([playing]) .play-pause .pause {
                display: block;
            }

            .jump-back {
                cursor: pointer;
                height: 100%;
                position: relative;
                width: 44px;
            }
            .jump-back svg-icon {
                display: block;
                fill: var(--app-color-black);
                height: 25px;
                left: 50%;
                position: absolute;
                stroke: var(--app-color-black);
                top: 50%;
                transform: translate(-50%, -50%);
                width: 25px;
            }

            .fullscreen {
                cursor: pointer;
                height: 100%;
                position: relative;
                width: 44px;
            }
            .fullscreen svg-icon {
                display: block;
                fill: var(--app-color-black);
                height: 22px;
                left: 50%;
                position: absolute;
                stroke: var(--app-color-black);
                top: 50%;
                transform: translate(-50%, -50%);
                width: 22px;
            }

            .speed {
                cursor: pointer;
                height: 100%;
                position: relative;
                width: 44px;
            }
            .speed .border {
                border: 1px solid rgba(var(--app-color-black-rgb), .2);
                border-radius: 11px;
                display: block;
                font-size: 11px;
                left: 50%;
                line-height: 11px;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                padding-top: 5px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .speed-list {
                background-color: var(--app-color-white);
                border-radius: 11px;
                display: none;
                flex-direction: row;
                left: 50%;
                padding: 10px;
                position: absolute;
                top: 0;
                transform: translate(-50%, calc(-100% - 5px));
            }
            .speed-list.active {
                display: flex;
            }
            .speed-setting {
                border: 1px solid rgba(var(--app-color-black-rgb), .2);
                border-radius: 11px;
                font-size: 11px;
                line-height: 11px;
                margin-left: 2px;
                margin-right: 2px;
                padding-bottom: 5px;
                padding-left: 5px;
                padding-right: 5px;
                padding-top: 5px;
            }
            .speed-setting.active {
                background-color: var(--app-color-blue-accent);
                color: var(--app-color-blue);
            }

            .progress-bar {
                align-items: center;
                display: flex;
                height: 100%;
                flex: 1 1 0%;
                padding-left: 9px;
                padding-right: 9px;
            }
            .progress-bar-container {
                cursor: pointer;
                height: 100%;
                position: relative;
                width: 100%;
            }
            .progress-bar-background {
                background-color: rgba(var(--app-color-black-rgb), .1);
                height: 5px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 100%;
            }
            .progress-bar-bar {
                background-color: var(--app-color-blue);
                height: 5px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                transform-origin: 0 50%;
                transition: 300ms transform;
                width: 100%;
            }
            .progress-time {
                font-family: var(--app-font-headline);
                font-size: 11px;
                font-weight: bold;
                margin-left: 12px;
            }

            .volume {
                align-items: center;
                cursor: pointer;
                display: flex;
                height: 100%;
                padding-left: 9px;
                padding-right: 9px;
                position: relative;
                width: 72px;
            }
            .volume svg-icon {
                display: block;
                fill: var(--app-color-black);
                height: 10px;
                margin-right: 4px;
                pointer-events: auto;
                width: 10px;
            }
            .volume-bar-container {
                flex: 1 1 0%;
                height: 100%;
                position: relative;
            }
            .volume-bar {
                background-color: rgba(var(--app-color-black-rgb), .1);
                height: 4px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 100%;
            }
            .volume-bar-bar {
                background-color: var(--app-color-black);
                height: 4px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
            }
            :host([muted]) .volume-bar-bar {
                display: none;
            }
            :host([muted]) .volume svg-icon {
                fill: rgba(var(--app-color-black-rgb), .1);
            }
        `,
    ];

}

export { getStyles };
