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

            input[type="text"],
            input[type="email"],
            input[type="phone"],
            input[type="password"] {
                border: 1px solid #E5E5E5;
                border-radius: 5px;
                display: block;
                height: 60px;
                line-height: 60px;
                padding-left: 16px;
                width: 100%;
            }
            input[type="text"]:focus,
            input[type="email"]:focus,
            input[type="phone"]:focus,
            input[type="password"]:focus {
                background-color: #FFF8E3;
            }

            input[type="checkbox"] {
                border: 1px solid #d3d1d1;
                border-radius: 50%;
                cursor: pointer;
                height: 20px;
                position: relative;
                width: 20px;
            }
            input[type="checkbox"]:checked:after {
                background-color: var(--app-color-black);
                border-radius: 50%;
                content: '';
                height: 8px;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 8px;

            }

            /* Invalid styles */
            :host([invalid]) input[type="text"],
            :host([invalid]) input[type="email"],
            :host([invalid]) input[type="phone"],
            :host([invalid]) input[type="password"] {
                background-color: #FFEAEA;
                border-color: red;
            }
            :host([invalid]) input[type="checkbox"] {
                border-bottom-color: var(--app-color-grey);
            }
        `,
    ];

}

export { getStyles };
