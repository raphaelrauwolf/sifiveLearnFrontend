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
            .wrapper {
                max-width: 1280px;
                margin: 100px auto 0;
                padding: 50px;
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
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .no-content {
                padding-top: 55px;
            }
            .component-title {
                font-size: 21px;
            }

            .assessment-view {
                text-align: center;
            }

            .assessment-top-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 70px;
                padding: 0 4rem;
            }

            .section-assessment {
                padding: 0px 4rem;
            }

            .highlight-red {
                background-color:red;
                color:white;
                padding:0 5px;
            }

            .big-number {
                line-height: 150px;
                font-family: monorama;
                font-size: 200px;
                margin-right: 60px;
            }

            .small-number {
                font-family: monorama;
                font-size: 60px;
            }

            .assessments-completed .small-number {
                margin-top: -22px;
                margin-right: 14px;
                display: inline-block;
                vertical-align: middle;
            }

            .rubric-numbers .small-number {
                line-height: 1.5;
            }

            .rubric-numbers .label, .multiple-teams .label {
                font-weight: bold;
            }

            .assessments-pending {
                font-size: 60px;
                line-height: 72px;
            }

            .assessment-instructions-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 80px;
                padding: 0 4rem;
            }

            .multiple-teams .small-number {

                margin-top: -22px;
                margin-right: 12px;
                display: inline-block;
                vertical-align: middle;

                line-height: 1.5;
            }

            /* Potentially move out to global */

            .flex-right-align {
                margin-left: auto;
            }

            .assessments-completed-box {
                background-color: #EDFFED;
                padding: 2.8rem 4rem 4rem;
            }

            .wrapper.multiple-teams {
                padding-top: 0;
            }

            .multiple-teams .assessments-completed-numbers {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }

            .multiple-teams .assessments-completed-numbers > div {
                margin-bottom: 1.5rem;
            }

            .grading-box {
                background-color: #EDFFED;
                padding: 2.8rem 4rem 4rem;
            }

            .grade-slider {
                width: 100%;
                background-color: black;
                -webkit-appearance: none;
                appearance: none;
                outline: none;
                transition: opacity .2s;
                -webkit-transition: .2s;
                opacity: .7;
                height:12px;

                z-index: 10; /* otherwise the big number makes it unselectable*/
                position: relative;
            }

            .grade-slider:hover {
                opacity: 1;
                z-index: 10;
            }

            .grade-slider::-webkit-slider-thumb {
              -webkit-appearance: none; /* Override default look */
              appearance: none;
              width: 65px; /* Set a specific slider handle width */
              height: 65px; /* Slider handle height */
              background: white; /* Green background */
              cursor: pointer; /* Cursor on hover */
              border-radius: 50%;
              -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.4); 
              box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.4);
            }

            .grade-slider::-moz-range-thumb {
              width: 65px; /* Set a specific slider handle width */
              height: 65px; /* Slider handle height */
              background: white; /* Green background */
              cursor: pointer; /* Cursor on hover */
              border-radius: 50%;
              -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.4);
              box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.4);
            }

            .grade-slider-section {
                position: relative;
                margin-bottom: 10rem;
            }

            .grade-slider-section .grade {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin-top: -2rem;
            }

            .grade-slider-instructions {
                margin-bottom: 10rem;
            }

            rich-text-editor {
                min-height: 300px;
            }

            .instructions {
                font-size: 16px;
                font-weight: 600;
                margin-left: 8rem;
                max-width: 800px;
            }

            .row-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 2rem;
            }

            .row-title {
                font-weight: bold;
            }

            .row-content {
                width: 75%;
            }

            .multiple-teams .header-title {
                padding-bottom: 5rem;
            }

            .header-title {
                border-bottom: 2px solid #E2E2E2;
                padding-bottom: 2.5rem;
                margin-bottom: 4rem;
            }

            .read-rubric-guidelines {
                font-weight: bold;
                margin-left: 1rem;
            }

            svg-icon {
                height: 20px;
            }

            .divider-bottom {
                padding-bottom: 3rem;
                margin-bottom: 3rem;
                border-bottom: 2px solid rgb(226, 226, 226);
            }

            .rubric-container {
                margin-top: 3rem;
            }

            .rubric-row {
                display: flex;
                justify-content: space-between;

                margin-bottom: 3.5rem;
            }

            .rubric-row > :first-child {
                width: 100%;
            }

            .btn-submit {
                margin-right: 20px;
            }

            .terms-checkbox {
                vertical-align: middle;
                margin-right: 6px;
            }

            .form-error.terms {
                position: absolute;
                top: 1.5rem;
            }

            .checkbox-label {
                margin-left: .6rem;
            }

            .checkbox-container {
                display: flex;
                position: relative;
            }

            .form-container {
                display: flex;
                align-items: baseline;
            }
        `,
    ];

}

export { getStyles };
