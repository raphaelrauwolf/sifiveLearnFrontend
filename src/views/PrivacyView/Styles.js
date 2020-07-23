import { css } from 'lit-element';

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
                min-height: 100vh;
            }
            header {
                padding-top: 60px;
                margin-bottom: 60px;
            }
            section {
                margin-bottom: 60px;
            }
            h5 {
                margin-bottom: 20px;
            }
            ul {
                list-style: disc;
                padding-inline-start: 20px;
            }
        `,
    ];

}

export { getStyles };
