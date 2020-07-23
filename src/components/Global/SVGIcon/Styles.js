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
                display: inline-block;
                height: auto;
                pointer-events: none;
                width: 24px;
            }
            svg {
                display: block;
                height: 100%;
                margin: 0 auto;
                width: auto;
            }
        `,
    ];

}

export { getStyles };
