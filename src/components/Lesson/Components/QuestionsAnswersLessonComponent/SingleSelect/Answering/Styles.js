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
            .wrong + .incorrect {
                display: block;
            }
            .answer {
                padding-bottom: 15px;
                padding-top: 15px;
            }
            sifive-radio {
                margin-right: 15px;
            }
            sifive-radio + * {
                display: inline-block;
            }
            .incorrect {
                background-color: #EFF2FF;
                display: none;
                padding-top: 20px;
                padding-bottom: 20px;
                text-align: center;
                width: 100%;
            }
        `,
    ];

}

export { getStyles };
