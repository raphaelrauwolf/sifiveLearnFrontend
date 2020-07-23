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
            :host([open]) .content {
                display: block;
            }
            .wrapper {
                align-items: center;
                background-color: #F8FAFF;
                border: 1px solid #E5E5E5;
                display: flex;
                justify-content: space-between;
                padding-bottom: 30px;
                padding-left: 25px;
                padding-right: 25px;
                padding-top: 30px;
                position: relative;
                width: 100%;
            }
            .content {
                display: none;
                position: relative;
                top: -1px;
            }
            .info {
                position: relative;
                width: 38%;
            }
            .info h5 svg-icon {
                display: inline-block;
                fill: var(--app-color-black);
                stroke: var(--app-color-black);
                height: 18px;
                margin-right: 5px;
                position: relative;
                top: 3px;
                width: auto;
            }
            .creator {
                font-size: 11px;
                line-height: 24px;
                margin-top: 2px;
            }
            .bar-content {
                display: flex;
                align-items: center;
            }
            .bar-content > * {
                margin-left: 25px;
            }
        `,
    ];

}

export { getStyles };
