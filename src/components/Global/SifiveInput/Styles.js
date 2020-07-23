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
                --app-element-border-color: #e5e5e5;
                --app-element-focus-border-color: #e5daa5;
                --app-element-focus-background-color: #fffef9;

                align-items: center;
                background-color: var(--app-color-white);
                border: 1px solid var(--app-element-border-color);
                display: inline-flex;
                flex-direction: row;
                height: 50px;
                min-width: 365px;
                padding-left: 15px;
                padding-right: 15px;
            }
            :host([small]) {
                min-width: 240px;
            }
            :host([strong-placeholder]) input::placeholder {
                color: rgba(var(--app-color-black-rgb), 1);
            }
            :host([focus]) {
                background-color: var(--app-element-focus-background-color);
                border: 1px solid var(--app-element-focus-border-color);
            }
            :host([green]) {
                border: 1px solid var(--app-color-green);
            }
            :host([red]) {
                border: 1px solid var(--app-color-red);
            }
            input {
                flex: 1;
                font-size: 12px;
                height: 50px;
                line-height: 24px;
                letter-spacing: 0.1743px;
                width: auto;
            }

            input::placeholder {
                color: rgba(var(--app-color-black-rgb), .3);
            }
            ::slotted([slot='icon']) {
                display: block;
                margin-right: 13px;
                height: 20px;
                stroke: var(--app-color-black);
                width: auto;
            }
        `,
    ];

}

export { getStyles };
