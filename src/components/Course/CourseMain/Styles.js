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
                display: block;
                min-height: 100vh;
            }
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            :host > .grid-container {
                min-height: 100vh;
                padding-top: 120px;
            }

            .top-bar-content {
                align-items: center;
                display: flex;
                height: 80px;
                justify-content: space-between;
            }
            .edit-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .edit-link svg-icon {
                display: inline-block;
                fill: var(--app-color-blue);
                float: left;
                height: auto;
                margin-right: 10px;
                width: 19px;
            }

            h1 {
                margin-bottom: 75px;
                text-align: center;
            }
            .description {
                margin: 0 auto 35px;
                text-align: center;
                width: 50%;
            }
            course-progress-bar {
                margin: 0 auto 35px;
            }
            .info-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 60px;
            }
            .info-container > * {
                display: flex;
                margin-left: 25px;
                margin-right: 25px;
            }
            .info-container > * svg-icon {
                display: block;
                height: 20px;
                margin-right: 9px;
                width: 20px;
            }

            .module-list h5 {
                margin-bottom: 40px;
            }
            module-accordion {
                margin-bottom: 45px;
            }
            .start-button-container {
                display: flex;
                justify-content: center;
                margin-bottom: 60px;
            }
            .start-button svg-icon {
                fill: var(--app-color-white);
                stroke: var(--app-color-white);
            }
            progress-circle {
                display: block;
                height: 50px;
                width: 50px;
            }
        `,
    ];

}

export { getStyles };
