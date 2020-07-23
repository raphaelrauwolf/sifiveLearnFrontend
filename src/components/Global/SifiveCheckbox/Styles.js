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
            :host([label]) input[type="checkbox"] {
                display: block;
                margin-right: 10px;
            }
            :host([green]) input[type="checkbox"] {
                border: 1px solid var(--app-color-green);
            }
            :host([red]) input[type="checkbox"] {
                border: 1px solid var(--app-color-red);
            }
            label {
                align-items: center;
                display: flex;
            }
            input[type="checkbox"] {
                -webkit-appearance: none;
                border: 1px solid rgba(var(--app-color-black-rgb), .3);
                display: block;
                height: 20px;
                position: relative;
                width: 20px;
            }
            input[type="checkbox"]:checked:after {
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
