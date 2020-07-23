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
                padding-top: 133px;
            }
            .top-container {
                display: flex;
            }
            .search-container {
                margin-right: auto;
            }
            .search-container sifive-field {
                width: 367px;
            }
            .content-container {
                padding-top: 47px;
            }
            .content-container h5 {
                margin-bottom: 39px;
            }
            .content-container module-accordion {
                margin-bottom: 45px;
            }
        `,
    ];

}

export { getStyles };
