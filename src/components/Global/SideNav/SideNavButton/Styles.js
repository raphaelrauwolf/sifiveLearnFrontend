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
                cursor: pointer;
                display: block;
                position: relative;
            }
            :host([label-hidden]) .label{
                opacity: 0;
            }
            ::slotted([slot='icon']) {
                height: 100%;
                width: 100%;
            }
            .wrapper {
                display: block;
                overflow: hidden;
                padding: 10px 0;
            }
            .icon {
                float: left;
                height: 40px;
                width: 40px;
            }
            .label {
                color: var(--app-color-black);
                font-weight: 700;
                float: left;
                line-height: 40px;
                opacity: 1;
                padding-left: 10px;
                position: relative;
                transition: opacity 300ms;
                will-change: opacity;
            }
            .eyebrow {
                color: #979797;
                font-size: 9px;
                line-height: 11px;
                position: absolute;
                top: 0;
                transform: translate(0, -100%);
            }

        `,
    ];

}

export { getStyles };
