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
                display: none;
                position: relative;
                width: 100%;
            }
            :host([loaded]) {
                display: inline-block;
            }
            .wrapper {
                overflow: hidden;
                width: 100%;
            }
            .slide-container {
                align-items: center;
                display: flex;
                transition: transform 300ms;
                width: 9999999px;
            }
            .slide {
                float: left;
            }
            .slide sifive-image {
                height: auto;
                width: 100%;
            }
            .ui {
                width: 100%;
            }
            .pagination {
                align-items: center;
                display: flex;
                justify-content: center;
                width: 100%;
            }
            .page {
                cursor: pointer;
                margin-left: 7px;
                margin-right: 7px;
                padding-bottom: 25px;
                padding-top: 25px;
                width: 100px;
            }
            .page-inner {
                background-color: #eaeaea;
                height: 2px;
            }
            .page.active .page-inner {
                background-color: var(--app-color-blue);
                height: 4px;
            }
        `,
    ];

}

export { getStyles };
