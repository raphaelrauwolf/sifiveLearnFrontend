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
            .grid-container {
                min-height: 100vh;
                position: relative;
            }
            .content-container {
                left: 0;
                padding-left: 180px;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 50%;
            }

            .text-container h1 {
                color: #23171B;
                font-size: 70px;
                line-height: 78px;
                margin-bottom: 31px;
            }
            .text-container p {
                color: #23171B;
                font-size: 13px;
                line-height: 24px;
                max-width: 470px;
            }

            hr {
                margin-bottom: 67px;
                margin-top: 67px;
            }

            .resend-container h5 {
                color: #23171B;
                font-size: 18px;
                line-height: 22px;
                margin-bottom: 34px;
            }

            .resend-container .button {
                margin-right: 30px;
            }


        `,
    ];

}

export { getStyles };
