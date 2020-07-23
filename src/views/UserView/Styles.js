import { css } from 'lit-element';

/**
 * Generate styles for lit-element
 * @param {Function} data context for style creation
 * @return {String} styles
 */
function getStyles(data) {

    return [
        css`
            :host {
                display: block;
                min-height: 100vh;
            }
            .grid-container {
                min-height: 100vh;
                padding-top: 90px;
            }

            .top-container {
                overflow: hidden;
                padding-bottom: 46px;
                width: 100%;
            }
            .top-container .left-container {
                float: left;
            }
            .top-container .left-container h1 {
                color: #23171B;
                font-size: 75px;
                line-height: 90px;
            }
            .top-container .left-container .available {
                color: #23171B;
                font-size: 13px;
                line-height: 24px;
                padding-left: 20px;
                position: relative;
            }
            .top-container .left-container .available:after {
                background-color: #33FF66;
                border-radius: 50%;
                content: '';
                display: block;
                height: 10px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 10px;
            }

            .top-container .right-container {
                float: right;
            }
            .top-container .right-container .certified {
                color: #23171B;
                display: inline-block;
                font-size: 13px;
                line-height: 24px;
                margin-right: 50px;
                padding-left: 37px;
                position: relative;
            }
            .top-container .right-container .certified:after {
                background-color: #0033FF;
                border-radius: 50%;
                content: '';
                display: block;
                height: 20px;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 20px;
            }
            .top-container .right-container a {
                color: #0033FF;
                display: inline-block;
                font-weight: bold;
                font-size: 13px;
                line-height: 24px;
                text-decoration: none;
            }

            .summary-container {
                padding-top: 62px;
            }
            .summary-line {
                padding-bottom: 46px;
                width: 100%;
            }
            .summary-label {
                color: #23171B;
                display: inline-block;
                font-weight: 500;
                font-size: 11px;
                line-height: 24px;
                width: 230px;
            }
            .summary-content {
                display: inline-block;
                font-size: 13px;
                line-height: 24px;
            }

            h5 {
                color: #23171B;
                font-size: 18px;
                line-height: 22px;
                padding-bottom: 62px;
                padding-top: 62px;
            }

            .experience-container {

            }
            .experience-line {
                padding-bottom: 46px;
                width: 100%;
            }
            .experience-label {
                color: #23171B;
                display: inline-block;
                font-weight: 500;
                font-size: 11px;
                line-height: 24px;
                width: 440px;
            }
            .experience-content {
                display: inline-block;
                font-size: 13px;
                height: 127px;
                line-height: 24px;
            }
        `,
    ];

}

export { getStyles };
