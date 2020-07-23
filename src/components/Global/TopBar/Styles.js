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
                background-color: var(--app-color-white);
                border-bottom: 1px solid #f2f2f2;
                height: var(--top-bar-height);
                left: 0;
                overflow: hidden;
                position: fixed;
                top: 0;
                transform: translate(0, -100%);
                transition: width 200ms, transform 200ms;
                width: 100%;
                will-change: width, transform;
                z-index: 998;
            }
            :host([open]) {
                width: 336px;
            }
            :host([visible]) {
                transform: translate(0, 0);
            }
            nav {
                height: auto;
                position: relative;
                width: 100%;
            }
        `,
    ];

}

export { getStyles };
