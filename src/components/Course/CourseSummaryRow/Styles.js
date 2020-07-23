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
            .wrapper {}
            h5 {
                color: #23171B;
                font-size: 11px;
                line-height: 24px;
            }
            h2 {
                color: #0033FF;
                font-size: 75px;
                line-height: 90px;
                margin-bottom: 30px;
            }
            .progress {
                margin-bottom: 30px;
                position: relative;
            }
            .progress-text {
                color: #23171B;
                font-size: 25px;
                line-height: 25px;
            }
            .progress-bar {
                background-color: #33ff67;
                height: 5px;
                margin-bottom: 4px;
                position: relative;
            }
            .information {
                display: flex;
                font-size: 11px;
                line-height: 24px;
                height: 50px;
                margin-top: 20px;
                position: relative;
                width: 100%;
            }
            .information > * > img {
                display: inline-block;
                height: 20px;
                margin-right: 9px;
                width: 20px;
            }
            .start-date {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .deadline {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .estimate-time {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        `,
    ];

}

export { getStyles };
