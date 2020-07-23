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
                /* COLORS */
                --app-color-blue: #0033ff;
                --app-color-blue-rgb: 0, 51, 255;
                --app-color-red: #fe1a1a;
                --app-color-red-rgb: 254, 26, 26;
                --app-color-green: #33ff66;
                --app-color-green-rgb: 51, 255, 102;
                --app-color-orange: #ffbd0c;
                --app-color-orange-rgb: 255, 189, 12;
                --app-color-black: #23171b;
                --app-color-black-rgb: 35, 23, 27;
                --app-color-white: #ffffff;
                --app-color-blue-accent: #eff2ff;
                --app-color-red-accent: #ffe9e9;
                --app-color-green-accent: #e6fce6;
                --app-color-orange-accent: #fff8e5;
                --app-color-black-accent: #f7f7f7;
                --app-color-facebook-blue: #4167b2;
                --app-color-google-red: #ef443d;

                --side-nav-width: 80px;
                --side-nav-width-expanded: 330px;

                --top-bar-height: 80px;

                color: var(--app-color-black);

                /* FONT */
                --app-font-data: 'Monorama', Helvetica Neue, Helvetica, Arial, sans-serif;
                --app-font-headline: 'Manifold CF', Helvetica Neue, Helvetica, Arial, sans-serif;
                --app-font-body: 'Aktiv Grotesk', Helvetica Neue, Helvetica, Arial, sans-serif;

                display: block;
                font-family: var(--app-font-body);
                font-size: 14px;
                letter-spacing: .2px;
                line-height: 24px;
            }
            :host([sidebar-expanded]) {
                overflow-x: hidden;
            }
            :host([sidebar-expanded]) main {
                transform: translate(var(--side-nav-width-expanded), 0);
            }
            main {
                transition: .2s transform;
            }

            main.sidebar-open {
                transform: translate(var(--side-nav-width-expanded), 0);
            }
        `,
    ];

}

export { getStyles };
