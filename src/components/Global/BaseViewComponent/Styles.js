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
                background-color: #ffffff;
                display: block;
                min-height: 100vh;
                overflow: hidden;
            }
        `,
    ];

}

export { getStyles };
