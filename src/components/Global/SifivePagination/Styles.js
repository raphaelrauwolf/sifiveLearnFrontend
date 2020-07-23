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
            ::slotted(*) {
                display: none;
            }
            ::slotted(*.visible) {
                display: block;
            }
            .ui {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
            .pagination {
                display: flex;
            }
            .page {
                color: var(--app-color-blue);
                cursor: pointer;
                font-family: var(--app-font-body);
                font-size: 13px;
                font-weight: bold;
                padding-bottom: 10px;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 10px;
            }
            .page.active {
                color: var(--app-color-black);
                font-weight: 500;
            }
            .dots {
                font-family: var(--app-font-body);
                font-size: 13px;
                font-weight: bold;
                padding-bottom: 10px;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 10px;
            }
        `,
    ];

}

export { getStyles };
