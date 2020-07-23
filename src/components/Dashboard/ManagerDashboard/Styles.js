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
            .grid-container {
                min-height: 100vh;
                padding-bottom: 50px;
                padding-top: 110px;
            }

            .team-statistics {
                border-bottom: 1px solid #E2E2E2;
                margin-bottom: 80px;
                width: 100%;
            }
            .team-statistics-header {
                display: flex;
                margin-bottom: 100px;
            }
            .team-statistics-header-left {
                flex: 1;
                justify-content: flex-start;
                align-items: center;
            }
            .team-statistics-header-right {
                align-items: center;
                flex: 1;
                justify-content: flex-end;
            }
            .team-statistics-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            .team-stat {
                margin-bottom: 90px;
            }
            .team-stat-number {
                color: #23171B;
                font-size: 60px;
                line-height: 60px;
            }
            .team-stat-text {
                color: #23171B;
                font-size: 14px;
                line-height: 24px;
                vertical-align: top;
            }

            .activity-feed {
                border-bottom: 1px solid #E2E2E2;
                margin-bottom: 80px;
                padding-bottom: 60px;
                width: 100%;
            }
            .activity-feed-header {
                display: flex;
                margin-bottom:  35px;
            }
            .activity-feed-container {
                border-spacing: 0;
                width: 100%;
            }
            a {
                color: #0033FF;
            }
            tbody {
                width: 100%;
            }
            tr {
                border-radius: 5px;
                width: 100%;
            }
            tr:nth-child(even) {
                background-color: #F8FFF8;
            }
            tr.bad {
                background-color: #FEF3F3;
            }
            td {
                padding-bottom: 15px;
                padding-top: 15px;
            }
            .user {
                font-size: 13px;
                line-height: 24px;
                padding-left: 15px;
                width: 25%;
            }
            .team {
                font-size: 13px;
                line-height: 24px;
                width: 15%;
            }
            .activity {
                width: 30%;
            }
            .context {
                width: 30%;
            }

            .team-list {
                margin-bottom: 80px;
                padding-bottom: 60px;
                width: 100%;
            }
            .team-list-header {
                align-items: center;
                display: flex;
                justify-content: space-between;
                margin-bottom:  35px;
            }
            .list {
                border-spacing: 0;
                width: 100%;
            }
            .list .team {
                font-size: 13px;
                line-height: 24px;
                padding-left: 15px;
                width: 25%;
            }
            .list .course {
                font-size: 13px;
                line-height: 24px;
                padding-left: 15px;
                width: 25%;
            }
        `,
    ];

}

export { getStyles };
