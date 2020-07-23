import { css } from 'lit-element';

import { MediaQueries } from 'Styles/ResponsiveStyles';


/**
 * Generate styles for lit-element
 * @param {Function} data context for style creation
 * @return {String} styles
 */
function getStyles(data) {

    return [
        css`
            :host {
                display: block;
            }
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
            }
            .grid-container {
                min-height: 100vh;
                position: relative;
            }
            .wrapper {
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                width: 50%;
            }
            .button-container {
                align-items: center;
                display: flex;
            }
            .accept {
                margin-right: 20px;
            }
            .decline {
                color: var(--app-color-red);
                cursor: pointer;
            }

            h1 {
                margin-bottom: 15px;
            }
            h5 {
                margin-bottom: 40px;
            }

            ${MediaQueries.DesktopWide} {}

            ${MediaQueries.DesktopMid} {}

            ${MediaQueries.Desktop} {}

            ${MediaQueries.TabletWide} {
                .wrapper {
                    width: 100%;
                }
            }

            ${MediaQueries.Tablet} {
                .wrapper {
                    width: 100%;
                }
            }

            ${MediaQueries.Phone} {
                .wrapper {
                    width: 100%;
                }
            }
        `,
    ];

}

export { getStyles };
