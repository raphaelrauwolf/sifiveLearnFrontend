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
                background-color: var(--app-color-white);
                display: none;
                min-height: 100vh;
            }
            :host([active]) {
                display: block;
            }
        `,
    ];

}

export { getStyles };
