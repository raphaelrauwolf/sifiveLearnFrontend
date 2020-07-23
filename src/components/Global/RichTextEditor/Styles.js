import { css, unsafeCSS } from 'lit-element';
import QuillThemeSnow from 'quill/dist/quill.snow.css';

/**
 * Generate styles for lit-element
 * @param {Function} data context for style creation
 * @return {String} styles
 */
function getStyles(data) {

    return [
        // SharedStyles,
        unsafeCSS(QuillThemeSnow),
        css`
            :host {
                display: flex;
                flex-direction: column;
                min-height: 80px;
                position: relative;
            }
            .editor {
                display: flex;
                flex: 1 1 50px;
                flex-direction: column;
                height: auto;
                position: relative;
            }
            .ql-editor {
                flex: 1 1 100%;
            }
            .ql-editor img, .ql-editor sifive-resource {
                line-height: 0;
                max-width: 100%;
            }
            input.ql-image[type=file] {
                display: none;
            }
        `,
    ];

}

export { getStyles };
