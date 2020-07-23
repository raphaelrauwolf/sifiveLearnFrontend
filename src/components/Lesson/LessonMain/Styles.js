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
                color: #23171B;
            }
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            :host > .grid-container {
                min-height: calc(100vh - 150px);
                padding-top: calc(5vh + var(--top-bar-height));
            }
            .top-bar-content {
                align-items: center;
                display: flex;
                height: 80px;
                justify-content: space-between;
            }
            .top-bar-content .back-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .top-bar-content .back-link svg-icon {
                border: 1px solid var(--app-color-blue);
                border-radius: 50%;
                display: inline-block;
                fill: var(--app-color-blue);
                float: left;
                height: auto;
                margin-right: 10px;
                width: 19px;
            }
            h1 {
                margin-bottom: 5vh;
                text-align: center;
            }
            .course-link {
                text-align: center;
                width: 100%;
            }
            .info-container {
                display: flex;
                align-items: flex-start;
                    margin-bottom: 5vh;
                width: 100%;
            }
            .description {
                align-self: flex-start;
                font-size: 13px;
                line-height: 24px;
                margin-bottom: 10vh;
                text-align: center;
            }
            .stats {
                margin: auto;
            }
            .stat-number {
                font-size: 60px;
                line-height: 60px;
            }
            .stat-text {
                font-size: 11px;
                line-height: 24px;
                vertical-align: top;
            }
            .estimate-time {
                font-size: 11px;
                line-height: 24px;
            }
            .estimate-time img {
                display: inline-block;
                height: 20px;
                margin-right: 9px;
                width: 20px;
            }

            .lesson-list h5 {
                margin-bottom: 40px;
            }
            .lesson {
                color: #0033FF;
            }

            footer {
                height: 150px;
            }
            footer .grid-container {
                align-items: center;
                display: flex;
                height: 100%;
                justify-content: space-between;
            }
            footer.submit {
                background-color: var(--app-color-blue);
                color: var(--app-color-white);
                cursor: pointer;
            }
            footer.submit .label {
                font-family: var(--app-font-headline);
                font-size: 24px;
                font-weight: 600;
            }
            footer.submit svg-icon {
                fill: var(--app-color-white);
                height: 50px;
                stroke: var(--app-color-white);
                width: 50px;
            }
            footer.result.perfect {
                background-color: var(--app-color-green-accent);
                color: var(--app-color-black);
            }
            footer.result.almost {
                background-color: var(--app-color-orange-accent);
                color: var(--app-color-black);
            }
            footer.result.ouch {
                background-color: var(--app-color-red-accent);
                color: var(--app-color-black);
            }
            footer.result .result-text {
                flex: 1 1 0;
                font-family: var(--app-font-headline);
                font-size: 24px;
                font-weight: 600;
                text-align: center;
            }
            footer.result .resolve {
                align-items: center;
                cursor: pointer;
                display: flex;
            }
            footer.result .resolve svg-icon {
                height: 50px;
                margin-right: 10px;
                width: 50px;
            }
            footer.result .submit {
                align-items: center;
                cursor: pointer;
                display: flex;
            }
            footer.result .submit svg-icon {
                height: 50px;
                margin-left: 10px;
                width: 50px;
            }
            footer.result .continue {
                align-items: center;
                cursor: pointer;
                display: flex;
            }
            footer.result .continue svg-icon {
                height: 50px;
                margin-left: 10px;
                width: 50px;
            }
            footer.continue {
                background-color: var(--app-color-blue-accent);
                cursor: pointer;
            }
            footer.continue > * {
                align-items: center;
                color: var(--app-color-black);
                display: flex;
                font-family: var(--app-font-headline);
                font-size: 24px;
                font-weight: 600;
                height: 100%;
                justify-content: space-between;
                width: 100%;
            }
            footer.continue svg-icon {
                fill: var(--app-color-black);
                height: 50px;
                stroke: var(--app-color-black);
                width: 50px;
            }
        `,
    ];

}

export { getStyles };
