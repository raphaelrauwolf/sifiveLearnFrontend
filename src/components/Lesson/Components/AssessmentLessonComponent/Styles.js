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
                border: 1px solid var(--app-color-light-grey);
                display: block;
            }
            .wrapper {
                padding: 50px;
            }

            .component-title {
                font-size: 21px;
            }

            .assessment-view {
                text-align: center;
            }

            .assessment-top-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 100px;
            }

            .big-number {
                line-height: 170px;
                font-family: monorama;
                font-size: 200px;
                margin-right: 60px;
            }

            .assessments-pending {
                font-size: 60px;
                line-height: 72px;
            }

            .assessment-instructions-section {
                display: flex;
                justify-content: space-between;
            }

            .assessments-completed-box {
                background-color: #EDFFED;
            }

            .flex-right-align {
                margin-left: auto;
            }

            /* https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ */
            input[type="file"] {
                width: 0.1px;
                height: 0.1px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                z-index: -1;
            }
        `,
    ];

}

export { getStyles };
