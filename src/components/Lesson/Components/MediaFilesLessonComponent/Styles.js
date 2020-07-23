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
                border: 1px solid var(--app-color-light-grey);
                display: block;
            }
            .wrapper {
            }


            .top-container {
                display: flex;
                margin-bottom: 40px;
            }
            .search-container {
                margin-right: auto;
            }
            .search-container sifive-field {
                width: 367px;
            }
            .button-container sifive-button {
                margin-right: 15px;
            }

            .header {
                display: flex;
                margin-bottom: 40px;
            }
            .header h5 {
                margin-right: auto;
            }
            .select-link {
                color: var(--app-color-blue);
                cursor: pointer;
                display: inline-block;
                margin-left: 15px;
            }

            .file-list {
                margin-bottom: 40px;
            }
            .file-list > sifive-pagination {
                width: 100%;
            }
            .file-list > sifive-loader {
                height: 30px;
                margin-bottom: 20px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 20px;
                width: 30px;
            }

            .footer {
                display: flex;
                justify-content: space-between;
            }
            .upload-link {
                color: var(--app-color-blue);
                cursor: pointer;
                display: inline-block;
                margin-left: 15px;
            }
            .upload-link svg-icon {
                fill: var(--app-color-blue);
                height: 20px;
                margin-right: 5px;
                position: relative;
                stroke: var(--app-color-blue);
                top: 5px;
                width: auto;
            }
            .pagination {

            }
            .page {
                cursor: pointer;
                display: inline-block;
                margin-left: 15px;
                margin-right: 15px;
            }
            .page.active {
                font-weight: 500;
            }
            .page:last-of-type {
                margin-right: 0;
            }

            .back-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .back-link svg-icon {
                fill: var(--app-color-blue);
                height: 20px;
                margin-right: 5px;
                position: relative;
                stroke: var(--app-color-blue);
                top: 5px;
                width: auto;
            }

            sifive-upload {
                height: 95px;
                margin-bottom: 25px;
                width: 100%;
            }
            .uploaded-list {
                margin-bottom: 60px;
            }
            .uploaded-list sifive-button {
                margin-top: 20px;
            }
            .uploading h5 {
                margin-bottom: 30px;
            }

            .wrapper.video, .wrapper.pdf, .wrapper.slideshow {
                padding-bottom: 5vh;
                padding-top: 5vh;
            }
            .wrapper.video sifive-video {
                display: block;
                width: 100%;
            }
            .wrapper.pdf sifive-pdf {
                display: block;
                height: 70vh;
                width: 100%;
            }

            .slideshow-selection {
                margin-bottom: 40px;
                max-height: 50vh;
                overflow: auto;
            }
            .slideshow-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            .slideshow-item {
                overflow: hidden;
                padding-bottom: 100%;
                position: relative;
            }
            .slideshow-item > img {
                left: 50%;
                display: block;
                width: auto;
                height: auto;
                max-height: 80%;
                max-width: 90%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                -webkit-user-drag: none;
            }
            .slideshow-item-name {
                bottom: 0;
                position: absolute;
                text-align: center;
                width: 100%;
            }
            .sorttarget-before .slideshow-item::after {
                background-color: var(--app-color-green);
                content: '';
                display: block;
                height: 50%;
                left: 0;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 4px;
            }
            .sorttarget-after .slideshow-item::after {
                background-color: var(--app-color-green);
                content: '';
                display: block;
                height: 50%;
                right: 0;
                position: absolute;
                top: 50%;
                transform: translate(50%, -50%);
                width: 4px;
            }

            .dragging .slideshow-item {
                opacity: .3;
            }
            .dragging .dragging-clone {
                opactiy: 1;
            }
            .slide-dragging {
                background-color: #E3FFE1;
                border: 2px solid var(--app-color-green);
                display: none;
                height: 50px;
                position: relative;
                width: 50px;
            }
            .slide-dragging svg-icon {
                display: block;
                fill: var(--app-color-green);
                stroke: var(--app-color-green);
                height: 25px;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: auto;
            }
            .dragging-clone {
                padding: 0;
                width: auto;
            }
            .dragging-clone .slideshow-item {
                display: none;
            }
            .dragging-clone .slide-dragging {
                display: block;
            }
        `,
    ];

}

export { getStyles };
