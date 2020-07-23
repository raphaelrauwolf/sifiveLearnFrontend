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
            }
            :host > .grid-container {
                min-height: 100vh;
            }
            .grid-container {
                position: relative;
            }

            .top-container {
                overflow: hidden;
                padding-bottom: 60px;
                padding-top: 150px;
                width: 100%;
            }

            .text-container {
                float: left;
                width: 50%;
            }
            .text-container h1 {
                color: #23171B;
                font-size: 70px;
                line-height: 78px;
                margin-bottom: 43px;
            }
            .text-container p {
                font-size: 13px;
                line-height: 24px;
            }

            .some-container {
                float: left;
                width: 50%;
            }
            .some-container p {
                margin-bottom: 38px;
            }
            .some-container .facebook-button {
                margin-right: 25px;
            }

            .form-container {
                padding-bottom: 60px;
                padding-top: 60px;
            }
            .top-bar-content {
                align-items: center;
                display: flex;
                height: 80px;
                justify-content: space-between;
            }
            .back-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .back-link svg-icon {
                display: inline-block;
                fill: var(--app-color-blue);
                float: left;
                height: auto;
                margin-right: 10px;
                width: 19px;
            }
        `,
    ];

}

export { getStyles };
