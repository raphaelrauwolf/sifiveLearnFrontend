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
                display: block
            }
            :host([open][expanded]) .course-list {
                display: block;
            }
            :host([expanded]) side-nav-button:after {
                border-width: 0 5px 5px 5px;
                border-color: transparent transparent var(--app-color-black) transparent;
            }
            side-nav-button:after {
                border-style: solid;
                border-width: 5px 5px 0 5px;
                border-color: var(--app-color-black) transparent transparent transparent;
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
            }
            .course-list {
                display: none;
                max-height: 275px;
                overflow-y: auto;
                padding-bottom: 20px;
            }
            .course {
                color: var(--app-color-blue);
                font-size: 15px;
                line-height: 50px;
                overflow: hidden;
                padding-left: 50px;
                text-overflow: ellipsis;
                white-space:nowrap;
            }
        `,
    ];

}

export { getStyles };
