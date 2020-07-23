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
                padding-bottom: 30px;
                padding-left: 25px;
                padding-right: 25px;
                padding-top: 30px;
                position: relative;
                width: 100%;
            }
            .content {
                display: none;
                transform: translate(0, -1px);
            }
            .info {
                position: relative;
                margin-right: auto;
            }
            .info h5 svg-icon {
                display: inline-block;
                fill: var(--app-color-blue);
                height: 22px;
                margin-right: 5px;
                position: relative;
                stroke: var(--app-color-blue);
                top: 3px;
                width: auto;
            }
            .creator {
                font-size: 11px;
                line-height: 24px;
                margin-top: 2px;
            }
            .actions {
                display: flex;
                align-items: center;
            }
            .actions > * {
                margin-left: 25px;
            }
        `,
    ];

}

export { getStyles };
