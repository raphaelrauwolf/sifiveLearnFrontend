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
            .wrapper .content {
                padding-bottom: 5vh;
                padding-top: 5vh;
            }
            .wrapper .editor, .wrapper .content {
                display: block;
            }
            .wrapper .editor rich-text-editor {
                min-height: 300px;
            }
            .content ol, .content ul {
                padding-inline-start: 40px;
            }
            .content ol {
                list-style: decimal;
            }
            .content ul {
                list-style: disc;
            }
            .content blockquote {
                border-left: 4px solid #ccc;
                margin-bottom: 5px;
                margin-top: 5px;
                padding-left: 16px;
            }
            code, .ql-code-block-container {
                background-color: #f0f0f0;
                border-radius: 3px;
            }
            .ql-code-block-container {
                margin-bottom: 5px;
                margin-top: 5px;
                padding: 5px 10px;
            }
            code {
                font-size: 85%;
                padding: 2px 4px;
            }
            .ql-code-block-container {
                background-color: #23241f;
                color: #f8f8f2;
                overflow: visible;
            }
            .ql-indent-1 { padding-left: 3em; }
            .ql-indent-2 { padding-left: 6em; }
            .ql-indent-3 { padding-left: 9em; }
            .ql-indent-4 { padding-left: 12em; }
            .ql-indent-5 { padding-left: 15em; }
            .ql-indent-6 { padding-left: 18em; }
            .ql-indent-7 { padding-left: 21em; }
            .ql-indent-8 { padding-left: 24em; }
            .ql-indent-9 { padding-left: 27em; }

            .ql-font-monospace {
                font-family: monospace;
            }

            img {
                max-width: 100%
            }
        `,
    ];

}

export { getStyles };
