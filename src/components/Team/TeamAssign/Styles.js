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
                padding-top: 86px;
            }
            h3 {
                font-size: 40px;
                line-height: 54px;
                margin-bottom: 18px;
            }
            .header {
                display: flex;
                margin-bottom: 40px;
            }
            .header p {
                margin-right: auto;
                width: 35%;
            }
            .header .button-container {

            }
            .list-header {
                display: flex;
                margin-bottom: 35px;
            }
            h5 {
                font-size: 15px;
                font-weight: bold;
                line-height: 24px;
                margin-right: auto;
            }
            .list-controls {

            }
            .list-controls > * {
                color: #0033FF;
                cursor: pointer;
                display: inline-block;
                font-weight: bold;
                font-size: 13px;
                line-height: 24px;
            }
            .course-list .course {
                padding-bottom: 50px;
            }
            course-accordion {
                margin-bottom: 20px;
            }
            .course .button-container {
                display: flex;
                justify-content: flex-end;
                width: 100%;
            }
        `,
    ];

}

export { getStyles };
