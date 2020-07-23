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
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .form-container {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                max-width: 50%;
            }
            h3 {
                margin-bottom: 45px;
            }
            p {
                margin-bottom: 50px;
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
