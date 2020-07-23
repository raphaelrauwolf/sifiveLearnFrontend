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
                --app-element-border-color: #e5e5e5;
            }
            :host([red]) a, :host([red]) div {
                border: 2px solid var(--app-color-red);
            }
            :host([draggable]) div {
                cursor: inherit;
            }
            a, div {
                background-color: var(--app-color-white);
                border: 2px solid var(--app-element-border-color);
                border-radius: 50%;
                cursor: pointer;
                display: block;
                height: 40px;
                position: relative;
                width: 40px;
            }
            ::slotted([slot='icon']) {
                display: block;
                fill: var(--app-color-black);
                height: auto;
                left: 50%;
                position: absolute;
                stroke: var(--app-color-black);
                top: 50%;
                transform: translate(-50%, -50%);
                width: 22px;
            }
        `,
    ];

}

export { getStyles };
