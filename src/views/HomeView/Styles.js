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
            .wrapper {
                height: 100%;
            }
            select {
                left: 50%;
                position: absolute;
                top: 10px;
            }
            .grid-container {
                padding-top: 55px;
            }
        `,
    ];

}

export { getStyles };
