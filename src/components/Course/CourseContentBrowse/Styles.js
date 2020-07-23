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
            :host {}
            :host > .grid-container {
                margin-top: var(--top-bar-height);
                padding-bottom: 30px;
                padding-top: 30px;
            }
            .content-container {
                margin-bottom: 5vh;
            }
            course-accordion {
                margin-bottom: 3vh;
            }
            sifive-round-button {
                display: block;
            }
        `,
    ];

}

export { getStyles };
