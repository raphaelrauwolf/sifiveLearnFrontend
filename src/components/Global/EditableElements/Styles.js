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
                height: inherit;
                min-height: inherit;
            }
            :host > * {
                display: block;
                height: inherit;
                min-height: inherit;
            }
            :host > *:focus {
                outline: none;
            }
        `,
    ];

}

export { getStyles };
