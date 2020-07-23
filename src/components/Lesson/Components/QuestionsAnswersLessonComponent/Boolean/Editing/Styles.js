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
            .wrapper {
            }
            .row {
                align-items: stretch;
                display: flex;
                margin-bottom: 30px;
            }
            .row-left {
                margin-right: 25px;
            }
            .row-right {
                flex: 1 1 70%;
            }
            .row-label {
                background-color: var(--app-color-green-accent);
                height: 50px;
                line-height: 50px;
                text-align: center;
                width: 205px;
            }

            /* Boolean */
            .boolean-settings .row-right {
                display: flex;
                align-items: center;
            }
            .boolean-settings .divider {
                background-color: #ECECEC;
                height: 16px;
                margin-left: 25px;
                margin-right: 25px;
                width: 1px;
            }
            .boolean-settings sifive-radio-group div {
                display: flex;
                align-items: center;
            }
        `,
    ];

}

export { getStyles };
