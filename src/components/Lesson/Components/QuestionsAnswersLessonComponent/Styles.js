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
            .question {

            }
            .question rich-text-editor {
                min-height: 130px;
                width: 100%;
            }

            /* Short Text */
            .short-text-settings sifive-input {
                width: 100%;
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

            /* Single Select */
            .single-select-answer-setting rich-text-editor {
                margin-bottom: 13px;

            }
            .single-select-answer-setting .answer-controls{
                display: flex;
                width: 100%;
            }
            sifive-radio-group.single-select-answers {
                width: 100%;
            }

            /* Multi Select */
            .multi-select-answer-setting rich-text-editor {
                margin-bottom: 13px;

            }
            .multi-select-answer-setting .answer-controls{
                display: flex;
                width: 100%;
            }
            .multi-select-answer-setting .correct-radio {

            }

            .add-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .add-link svg-icon {
                border-radius: 50%;
                display: inline-block;
                fill: var(--app-color-blue);
                stroke: var(--app-color-blue);
                height: auto;
                margin-right: 10px;
                width: 19px;
            }

            /* ANSWERING */
            .answering {
                padding-bottom: 5vh;
                padding-top: 5vh;
            }
            .answering h2 {
                margin-bottom: 2vh;
            }
        `,
    ];

}

export { getStyles };
