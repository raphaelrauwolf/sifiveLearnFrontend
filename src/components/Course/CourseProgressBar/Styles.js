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
            }
            :host([failing]) .bar {
                background-color: var(--app-color-red);
            }
            .wrapper {
                align-items: center;
                display: flex;
                justify-content: space-between;
                position: relative;
            }
            .small-data {
                margin-right: 5px;
            }
            .bar-container {
                flex: 1 1 0%;
                position: relative;
            }
            .bar {
                background-color: var(--app-color-green);
                height: 5px;
                position: relative;
                z-index: 1;
            }
            .finish-line {
                float: left;
                height: 23px;
                margin-right: 10px;
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translate(0, -50%);
                width: 5px;
            }
            .complete-label {
                margin-left: 5px;
            }
        `,
    ];

}

export { getStyles };
