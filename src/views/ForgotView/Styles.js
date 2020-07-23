import { css } from 'lit-element';

/**
 * Generate styles for lit-element
 * @param {Function} data context for style creation
 * @return {String} styles
 */
function getStyles(data) {

    return [
        css`
            :host {
                display: block;
                min-height: 100vh;
            }
        `,
    ];

}

export { getStyles };
