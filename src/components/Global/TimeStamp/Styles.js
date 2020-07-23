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
            }
            :host([urgent]) .border {
                background-color: var(--app-color-red);
                border: 1px solid var(--app-color-red);
                color: var(--app-color-white);
            }
            .border {
                border: 1px solid var(--app-color-black);
                color: var(--app-color-black);
                font-weight: 500;
                font-size: 10px;
                height: 16px;
                letter-spacing: 0.15px;
                line-height: 16px;
                padding-left: 3px;
                padding-right: 3px;
            }
        `,
    ];

}

export { getStyles };
