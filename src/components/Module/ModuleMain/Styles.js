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
                color: #23171B;
            }
            .grid-container {
                padding-bottom: 55px;
                padding-top: 86px;
            }
            h5 {
                font-size: 15px;
                font-weight: bold;
                line-height: 24px;
            }
            .info-container {
                display: flex;
                align-items: flex-start;
                margin-bottom: 50px;
                width: 100%;
            }
            .description {
                align-self: flex-start;
                font-size: 13px;
                line-height: 24px;
                width: 35%;
            }
            .stats {
                margin: auto;
            }
            .stat-number {
                font-size: 60px;
                line-height: 60px;
            }
            .stat-text {
                font-size: 11px;
                line-height: 24px;
                vertical-align: top;
            }
            .estimate-time {
                font-size: 11px;
                line-height: 24px;
            }
            .estimate-time img {
                display: inline-block;
                height: 20px;
                margin-right: 9px;
                width: 20px;
            }

            .lesson-list h5 {
                margin-bottom: 40px;
            }
            .lesson {
                color: #0033FF;
            }
        `,
    ];

}

export { getStyles };
