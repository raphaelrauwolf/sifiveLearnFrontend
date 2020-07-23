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
            .name-container {
                padding-bottom: 52px;
                padding-top: 62px;
            }
            .description-container {
                border-bottom: 2px solid #F2F2F2;
                border-top: 2px solid #F2F2F2;
                padding-bottom: 22px;
                padding-top: 22px;
            }
            .description-container editable-h4 {
                min-height: 400px;
            }
            .button-container {
                display: flex;
                justify-content: flex-end;
                padding-top: 22px;
            }
        `,
    ];

}

export { getStyles };
