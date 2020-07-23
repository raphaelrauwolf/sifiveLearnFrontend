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
                align-items: flex-start;
                display: flex;
                margin-right: 25px;
                width: 205px;
            }
            .row-right {
                flex: 1 1 70%;
            }
            .row-label {
                background-color: var(--app-color-green-accent);
                flex: 1 1 205px;
                height: 50px;
                line-height: 50px;
                text-align: center;
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

            /* Multi Select */
            .row-left sifive-round-button {
                margin-right: 25px;
            }
            .multi-select-answer-setting rich-text-editor {
                margin-bottom: 13px;

            }
            .multi-select-answer-setting .answer-controls{
                display: flex;
                width: 100%;
            }
            .multi-select-answer-setting .correct-radio {

            }

            /* Dragging */
            .multi-select-answer-dragging {
                display: none
            }
            .dragging .multi-select-answer-setting {
                opacity: .3;
            }
            .dragging .multi-select-answer-setting.dragging-clone {
                opacity: 1;
            }
            .dragging-clone {
                margin-bottom: 0;
            }
            .dragging-clone > * {
                display: none;
            }
            .dragging-clone > .multi-select-answer-dragging {
                align-items: center;
                background-color: #E3FFE1;
                border: 2px solid var(--app-color-green);
                border-radius: 5px;
                display: flex;
                height: 50px;
                padding-left: 23px;
                padding-right: 23px;
            }
            .dragging-clone > .multi-select-answer-dragging sifive-round-button {
                margin-right: 20px;
            }
            .sorttarget-after .multi-select-answer-setting {
                border-bottom: 2px solid var(--app-color-green);
            }
            .sorttarget-before .multi-select-answer-setting {
                border-top: 2px solid var(--app-color-green);
            }
        `,
    ];

}

export { getStyles };
