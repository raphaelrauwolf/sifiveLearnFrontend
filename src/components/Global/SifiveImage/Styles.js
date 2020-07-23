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
                pointer-events: none;
            }
            :host([image-visible]) img {
                display: block;
            }
            img {
                display: none;
                height: auto;
                width: 100%;
            }
        `,
    ];

}

export { getStyles };
