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
            :host([green]) input[type="radio"] {
                border: 1px solid rgba(var(--app-color-green-rgb), .3);
            }
            :host([green]) input[type="radio"]:checked:after {
                color: var(--app-color-green);
            }
            :host([red]) input[type="radio"] {
                border: 1px solid rgba(var(--app-color-red-rgb), .3);
            }
            :host([red]) input[type="radio"]:checked:after {
                color: var(--app-color-red);
            }
            label {
                display: inline-block;
                line-height: 20px;
            }
            input[type="radio"] {
                -webkit-appearance: none;
                border: 1px solid rgba(var(--app-color-black-rgb), .3);
                border-radius: 50%;
                display: inline-block;
                height: 20px;
                margin-right: 10px;
                position: relative;
                top: 4px;
                width: 20px;
            }
            input[type="radio"]:checked:after {
                border-radius: 50%;
                content: '✔';
                display: block;
                font-size: 10px;
                height: 10px;
                left: 50%;
                line-height: 10px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: auto;
            }
        `,
    ];

}

export { getStyles };
