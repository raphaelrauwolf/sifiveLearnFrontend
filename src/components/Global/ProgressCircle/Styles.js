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
            canvas {
                display: block;
            }
            .percent {
                font-weight: 500;
                left: 50%;
                padding-left: .2em;
                padding-top: .2em;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        `,
    ];

}

export { getStyles };
