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
            :host([disabled]) > *{
                background-color: var(--app-color-black);
            }
            :host > * {
                align-items: center;
                background-color: var(--app-color-blue);
                cursor: pointer;
                display: inline-flex;
                flex-direction: row;
                height: 50px;
                min-width: 187px;
                padding-left: 15px;
                padding-right: 15px;
            }
            .label {
                color: var(--app-color-white);
                font-family: var(--app-font-body);
                font-size: 12px;
                font-weight: 500;
                letter-spacing: .33px;
                white-space: nowrap;
            }
            ::slotted([slot='icon']) {
                display: block;
                margin-left: 18px;
                height: 22px;
                stroke: var(--app-color-white);
                width: auto;
            }

            .btn-success {
                background-color: transparent !important;
                border: 2px solid #4DB54D;
                border-radius: 5px;
            }

            .btn-success .label {
                color: var(--app-color-black);
            }

            .btn-disabled {
                background-color: var(--app-color-black);
            }

            .text-green .label {
                color: #4DB54D;
            }
        `,
    ];

}

export { getStyles };
