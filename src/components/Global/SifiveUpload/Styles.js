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
                background-color: #F3F6FF;
                border: 2px solid var(--app-color-blue);
                cursor: pointer;
                display: inline-block;
                position: relative;
            }
            :host([highlighted]) {
                background-color: var(--app-color-blue);
            }
            :host([highlighted]) .label {
                color: var(--app-color-white);
            }
            :host([pending]) {
                animation-name: pulse;
                animation-duration: 1s;
                animation-iteration-count: infinite;
            }
            @keyframes pulse {
                from    {
                    background-color: var(--app-color-white);
                }
                50%     {
                    background-color: var(--app-color-blue-accent);
                }
                to      {
                    background-color: var(--app-color-white);
                }
            }
            input[type="file"] {
                cursor: pointer;
                display: block;
                height: 100%;
                opacity: 0;
                width: 100%;
            }
            .wrapper {
                height: 100%;
                position: relative;
                width: 100%;
            }
            .label {
                color: var(--app-color-blue);
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        `,
    ];

}

export { getStyles };
