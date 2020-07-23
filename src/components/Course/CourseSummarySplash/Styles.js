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
            .grid-container {
                height: 100vh;
                position: relative;
            }
            .grid-container > img {
                height: auto;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                width: 50%;
            }
            .content-container {
                display: flex;
                flex-direction: column;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 50%;
            }
            h5 {
                color: #434443;
                margin-bottom: 20px;
            }
            h1 {
                color: #0033fb;
                margin-bottom: 30px;
            }
            .description {
                margin-bottom: 30px;
                width: 50%;
            }
            .information {
                align-items: center;
                display: flex;
                position: relative;
                width: 100%;
            }
            .information svg-icon {
                display: inline-block;
                height: 20px;
                margin-right: 9px;
                width: 20px;
            }
            .start-date {
                display: flex;
                align-items: center;
            }
            .deadline {
                display: flex;
                align-items: center;
            }
            .estimate-time {
                display: flex;
                align-items: center;
            }
        `,
    ];

}

export { getStyles };
