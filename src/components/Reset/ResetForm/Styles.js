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
            .field-container {
                margin-right: 25px;
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
            .info-container {
                margin-bottom: 50px;
            }
            .error-message {
                color: #FE1A1A;
                font-size: 13px;
                line-height: 24px;
            }
        `,
    ];

}

export { getStyles };
