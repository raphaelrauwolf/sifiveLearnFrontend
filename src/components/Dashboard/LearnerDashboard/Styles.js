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
                display: block;
            }
            .grid-container {
                min-height: 100vh;
            }
            .course-list {
                padding-bottom: 50px;
                padding-top: 110px;
            }
            course-summary-row {
                border-bottom: 1px solid #E2E2E2;
                padding-bottom: 45px;
                padding-top: 50px;
            }
            course-summary-row:last-of-type {
                border-bottom: none;
            }
            .no-content {
                padding-top: 55px;
            }
        `,
    ];

}

export { getStyles };
