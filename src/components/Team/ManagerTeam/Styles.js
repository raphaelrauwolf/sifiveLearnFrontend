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
            sifive-loader {
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            team-invite {
                margin-bottom: 100px;
            }
            .back-link {
                align-items: center;
                color: var(--app-color-blue);
                cursor: pointer;
                display: flex;
            }
            .back-link svg-icon {
                fill: var(--app-color-blue);
                height: 20px;
                margin-right: 5px;
                stroke: var(--app-color-blue);
                width: auto;
            }
            :host > .grid-container {
                padding-top: 70px;
            }
            section {
                border-bottom: 2px solid #E2E2E2;
            }
            .pending {
                align-items: center;
                display: flex;
                justify-content: space-between;
                overflow: hidden;
                padding-bottom: 50px;
            }
            .pending .divider {
                background-color: #ECECEC;
                height: 100px;
                position: relative;
                width: 1px;
            }
            .pending-summary {
                float: left;
                overflow: hidden;
            }
            .pending-summary .large-data {
                float: left;
            }
            .pending-summary h3 {
                float: left;
                margin-top: 90px;
            }
            .pending-assessors {

            }
            .pending-other {
                align-items: baseline;
                display: flex;
                margin-bottom: 30px;
            }
            .pending-other .small-data {
                margin-right: 10px;
            }
            .pending-assessments {
                margin-bottom: 10px;
            }
            .pending-assessments svg-icon {
                height: 15px;
                margin-right: 5px;
                vertical-align: middle;
                width: auto;
            }

            .course {
                margin-bottom: 40px;
            }
            .course:last-of-type {
                margin-bottom: 0;
            }
            .course-stats {
                padding-bottom: 70px;
                padding-top: 70px;
            }
            .course-stats h5 {
                margin-bottom: 25px;
            }
            .course-header {}
            .course-data {
                display: flex;
            }
            .course-data-card {
                width: 33.3333%;
            }
            .course-data-card > * {
                display: inline-block;
            }
            .course-actions {
                display: flex;
                justify-content: flex-end;
            }
            .members {
                border: none;
                padding-bottom: 80px;
                padding-top: 80px;
            }
            .members-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            .members-header .filters {
                align-items: center;
                display: flex;
            }
            .members-header .filters > *{
                margin-left: 15px;
            }
            .member-list {
                margin-bottom: 40px;
            }
            sifive-pagination {
                width: 100%;
            }
            .members-footer {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
            .members-controls {
                align-items: center;
                display: flex;
            }
            .members-controls > * {
                margin-right: 25px;
            }
        `,
    ];

}

export { getStyles };
