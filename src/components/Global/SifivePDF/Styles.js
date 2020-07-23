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
                position: relative;
            }
            iframe {
                display: block;
                height: 100%;
                width: 100%;
            }
        `,
    ];

}

export { getStyles };
