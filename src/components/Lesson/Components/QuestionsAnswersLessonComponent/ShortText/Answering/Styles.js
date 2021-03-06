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
            sifive-input {
                margin-bottom: 50px;
                margin-right: 20px;
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
