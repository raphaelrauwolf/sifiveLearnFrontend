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
            section {
                min-height: 100vh;
                padding-bottom: 100px;
                padding-top: 100px;
            }
            h1 {
                margin-bottom: 50px;
            }
            h2 {
                margin-bottom: 30px;
            }
            h3 {
                margin-bottom: 20px;
            }
            li {
                color: var(--app-color-blue);
                cursor: pointer;
                font-weight: 700;
                padding-bottom: 10px;
                padding-top: 10px;
            }

            #colors .color-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            }
            #colors .color {
                position: relative;
            }
            #colors .color > * {
                height: 100%;
                padding-bottom: 100%;
                position: relative;
                width: 100%;
            }
            #colors .blue {
                background-color: var(--app-color-blue);
            }
            #colors .blue-accent {
                background-color: var(--app-color-blue-accent);
            }
            #colors .red {
                background-color: var(--app-color-red);
            }
            #colors .red-accent {
                background-color: var(--app-color-red-accent);
            }
            #colors .green {
                background-color: var(--app-color-green);
            }
            #colors .green-accent {
                background-color: var(--app-color-green-accent);
            }
            #colors .orange {
                background-color: var(--app-color-orange);
            }
            #colors .orange-accent {
                background-color: var(--app-color-orange-accent);
            }
            #colors .black {
                background-color: var(--app-color-black);
            }
            #colors .black-accent {
                background-color: var(--app-color-black-accent);
            }
            #colors .facebook {
                background-color: var(--app-color-facebook-blue);
            }
            #colors .google {
                background-color: var(--app-color-google-red);
            }

            #typo > * {
                margin-bottom: 30px;
                margin-top: 30px;
            }

            #elements > div {
                border-bottom: 1px solid var(--app-color-black);
                margin-bottom: 75px;
                padding-bottom: 75px;
                padding-top: 75px;
            }
            #elements sifive-button, #elements sifive-dropdown, #elements sifive-input,
            #elements sifive-radio, #elements sifive-checkbox, #elements rich-text-editor {
                margin-bottom: 30px;
            }
            #elements course-accordion, #elements course-summary-row {
                margin-bottom: 30px;
            }
            #elements rich-text-editor {
                min-height: 300px;
            }
            #elements .progress-circle-container {
                overflow: hidden;
            }
            #elements progress-circle {
                display: block;
                float: left;
                margin-right: 50px;
            }
            #elements progress-circle:first-of-type {
                height: 100px;
                width: 100px;
            }
            #elements progress-circle {
                height: 75px;
                width: 75px;
            }
            #elements progress-circle:last-child {
                height: 50px;
                width: 50px;
            }

        `,
    ];

}

export { getStyles };
