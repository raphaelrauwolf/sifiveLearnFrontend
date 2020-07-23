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
                grid-template-columns: 1fr 1fr 1fr 1fr;
                padding-bottom: 30px;
            }
            .field-container {
                padding-left: 12px;
                padding-right: 12px;
            }
            .field-container:first-child {
                padding-left: 0;
                padding-right: 12px;
            }
            .field-container:last-child {
                padding-left: 12px;
                padding-right: 0;
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

            .invite-container {
                overflow: hidden;
                margin-bottom: 40px;
            }
            .invite-container sifive-field {
                width: 50%;
            }
            .invite-container .text-container {
                float: left;
                width: 50%;
            }
            .invite-container .text-container h5 {
                color: #23171B;
                font-size: 18px;
                line-height: 22px;
                margin-bottom: 37px;
            }
            .invite-container .text-container p {
                font-size: 13px;
                line-height: 24px;
                max-width: 390px;
            }
            .terms-container {
                margin-bottom: 20px;
            }
            .terms-container sifive-field {
                display: block;
                float: left;
                margin-right: 5px;
                width: auto;
            }


        `,
    ];

}

export { getStyles };
