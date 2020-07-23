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
                padding-bottom: 20px;
                padding-top: 20px;
            }
            :host:nth-child(even) .member-background {
                background: pink;
            }
            .member {
                align-items: flex-start;
                display: flex;
                position: relative;
                width: 100%;
            }
            .member > * {
                position: relative;
            }
            .member-info {
                width: 340px;
            }
            .member-progress {
                flex: 1 1 0%;
                height: 60px;
                overflow: hidden;
                position: relative
            }
            :host([open]) .member-progress {
                height: auto;
            }
            .course-entry {
                padding-bottom: 20px;
            }
            .course-entry:last-child {
                border-bottom: 1px solid #e5e5e5;
            }
            .course-progress {
                height: 60px;
                width: 100%;
            }
            .expand {
                float: left;
                display: block;
                line-height: 0;
                padding-left: 20px;
            }
            .member-actions {
                flex-basis: 200px;
                margin-left: auto;
                padding-left: 40px;
            }
            ::slotted([slot='actions']) {
                flex-basis: 200px;
                margin-left: auto;
                padding-left: 40px;
            }
        `,
    ];

}

export { getStyles };
