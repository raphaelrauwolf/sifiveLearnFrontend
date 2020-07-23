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
                z-index: 1;
            }
            :host([label-hidden]) .label{
                opacity: 0;
            }
            ::slotted([slot='icon']) {
                height: auto;
                width: 100%;
            }
            .wrapper {
                display: flex;
                overflow: hidden;
                padding: 10px 0;
            }
            .icon {
                height: 40px;
                width: 40px;
            }
            .label {
                font-weight: 700;
                flex: 1 1 0%;
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
            .arrow {
                display: block;
                width: 0;
                height: 0;
                right: 10px;
                top: 50%;
                position: absolute;
                border-style: solid;
                border-width: 5px 5px 0 5px;
                border-color: var(--app-color-black) transparent transparent transparent;
            }
            .dropdown-list {
                display: none;
                flex: 1 1 0%;
                left: 0;
                line-height: 40px;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: 99;
            }
            .dropdown-list.open {
                display: block;
            }
            .dropdown-list ul {
                background-color: var(--app-color-white);
                border: 1px solid var(--app-color-black-accent);
                list-style: none;
                padding: 10px;
            }
            .dropdown-list li {
                font-weight: 700;
                line-height: 40px;
            }
            .dropdown-list li:hover {
                background-color: var(--app-color-grey);
            }

        `,
    ];

}

export { getStyles };
