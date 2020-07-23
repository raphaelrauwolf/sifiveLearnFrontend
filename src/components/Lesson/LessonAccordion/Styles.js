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
            :host([open]) .lesson-list {
                display: block;
            }
            .wrapper {
                align-items: center;
                background-color: #ffffff;
                border: 1px solid #E5E5E5;
                display: flex;
                justify-content: space-between;
                min-height: 65px;
                padding-bottom: 15px;
                padding-left: 55px;
                padding-right: 25px;
                padding-top: 15px;
                width: 100%;
            }
            .info {
                position: relative;
                width: 38%;
            }
            .info h5 svg-icon {
                display: inline-block;
                fill: var(--app-color-blue);
                height: 18px;
                margin-right: 5px;
                position: relative;
                stroke: var(--app-color-blue);
                top: 3px;
                width: auto;
            }
            .bar-content {
                display: flex;
                align-items: center;
            }
        `,
    ];

}

export { getStyles };
