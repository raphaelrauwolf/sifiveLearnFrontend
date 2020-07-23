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
                display: inline-block;
                position: relative;
                --app-element-border-color: #e5e5e5;
            }
            :host([open]) .arrow {
                transform: translate(-50%, -50%) rotate(180deg);
            }
            :host([open]) .menu {
                display: block;
            }
            .dropdown {
                align-items: center;
                border: 1px solid var(--app-element-border-color);
                cursor: pointer;
                display: inline-flex;
                flex-direction: row;
                height: 50px;
                min-width: 205px;
                padding-left: 15px;
                position: relative;
            }
            .label {
                font-family: var(--app-font-body);
                font-size: 12px;
                font-weight: 500;
                letter-spacing: .33px;
                white-space: nowrap;
            }
            .dropdown ::slotted([slot='icon']) {
                display: block;
                height: 22px;
                padding-right: 10px;
                stroke: var(--app-color-black);
                width: auto;
            }
            .divider {
                background-color: #ECECEC;
                height: 16px;
                position: absolute;
                right: 37px;
                top: 50%;
                transform: translate(0, -50%);
                width: 1px;
            }
            .arrow {
                border-width: 3px 2.5px 0 2.5px;
                border-color: #000000 transparent transparent transparent;
                border-style: solid;
                height: 0;
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 0;
            }
            .menu {
                background-color: var(--app-color-white);
                border-bottom: 1px solid var(--app-element-border-color);
                border-left: 1px solid var(--app-element-border-color);
                border-right: 1px solid var(--app-element-border-color);
                display: none;
                font-family: var(--app-font-body);
                font-size: 12px;
                font-weight: 500;
                letter-spacing: .33px;
                position: absolute;
                top: 50px;
                width: 100%;
                z-index: 1;
            }
            .item {
                font-size: 11px;
                line-height: 50px;
                padding-left: 15px;
            }
            .item:hover {
                background-color: var(--app-element-border-color);
                cursor: pointer;
            }
        `,
    ];

}

export { getStyles };
