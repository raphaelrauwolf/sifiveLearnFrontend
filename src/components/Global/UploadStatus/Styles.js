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
                background: white;
                border-bottom: 1px solid #f2f2f2;
                border-top: 1px solid #f2f2f2;
                border-left: 1px solid #f2f2f2;
                display: block;
                padding-bottom: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 20px;
                position: fixed;
                right: 0;
                top: 50%;
                transition: 300ms transform;
                transform: translate(100%, -50%);
                z-index: 100;
            }
            :host([open]) {
                transform: translate(0, -50%);
            }
            .wrapper {
                min-width: 200px;
                max-width: 40vw;
            }
            .uploading {
                height: 30px;
                margin-bottom: 10px;
                width: 100%;
            }
            .uploading:last-of-type {
                margin-bottom: 0;
            }
            .name, .name-background {
                font-size: 11px;
                height: 100%;
                line-height: 30px;
                padding-left: 10px;
                white-space: nowrap;
            }
            .name-background {
                color: var(--app-color-blue);
                position: absolute;
                width: 100%;
                z-index: 1;
            }
            .progress-bar {
                background-color: var(--app-color-blue);
                height: 100%;
                overflow: hidden;
                position: relative;
                width: 100%;
                z-index: 10;
            }
            .name {
                color: var(--app-color-white);
            }

        `,
    ];

}

export { getStyles };
