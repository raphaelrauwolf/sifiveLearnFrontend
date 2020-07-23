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
            .wrapper {
                position: relative;
            }
            .field-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
            .field-container:first-child {
                padding-right: 12px;
            }
            .field-container:last-child {
                padding-left: 12px;
            }
            label {
                display: inline-block;
                font-size: 12px;
                font-weight: bold;
                line-height: 24px;
                margin-bottom: 4px;
            }
            sifive-field {
                width: 100%;
            }
            .error-message {
                color: #FE1A1A;
                font-size: 13px;
                line-height: 24px;
            }

            .info-container {
                margin-bottom: 10px;
            }

            .forgot-password-container {
                margin-bottom: 46px;
                text-align: right;
                width: 100%;
            }
            .forgot-password-container a {
                color: #2734fe;
                font-size: 13px;
                line-height: 24px;
                text-decoration: none;
            }

            .submit-container {
                align-items: center;
                display: flex;
                margin-bottom: 54px;
                width: 100%;
            }
            .submit-container .button {
                margin-right: 40px;
            }
            .submit-container .remember sifive-field {
                display: inline-block;
                margin-right: 8px;
                width: auto;
            }
        `,
    ];

}

export { getStyles };
