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
                border-right: 1px solid #f2f2f2;
                display: block;
                height: 100vh;
                left: 0;
                overflow: hidden;
                position: fixed;
                top: 0;
                transition: width 300ms;
                width: var(--side-nav-width);
                will-change: width, transform;
                z-index: 999;
            }
            :host([open]) {
                width: var(--side-nav-width-expanded);
            }
            :host([visible]) {
                transform: translate(0, 0);
            }
            nav {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                width: auto;
            }
            .top-container, .bottom-container {
                padding-bottom: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 20px;
                width: var(--side-nav-width-expanded);
            }
        `,
    ];

}

export { getStyles };
