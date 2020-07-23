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
            /* Header */
            section.invite-user {
                border-bottom: 2px solid #E2E2E2;
                display: block;
                padding-bottom: 50px;
                padding-top: 20px;
            }
            .invite-user-header {
                align-items: center;
                display: flex;
                width: 100%;
            }
            section.invite-user sifive-input,
            section.invite-user sifive-dropdown {
                margin-right: 25px;
            }
            .add-user-form {
                overflow: hidden;
                padding-top: 75px;
                position: relative;
            }
            .add-user-form sifive-round-button {
                height: 40px;
                position: absolute;
                right: 10px;
                top: 10px;
                width: 40px;
            }
            .add-user-form sifive-round-button svg-icon {
                fill: var(--app-color-red);
                stroke: var(--app-color-red);
            }
            .add-user-form .field-container {
                float: left;
                width: 33.3333%
            }
            /* Invite Codes */
            section.invite-codes {
                min-height: 20vw;
                padding-top: 50px;
                position: relative;
                width: 100%;
            }
            .invite-codes sifive-loader {
                height: 5vw;
                width: 5vw;
            }
            .invite-codes-header {
                align-items: center;
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
            }
            .invite-codes-actions {
                align-items: center;
                display: flex;
            }
            .create-code-link {
                color: var(--app-color-blue);
                cursor: pointer;
                margin-right: 20px;
            }
            .create-code-link svg-icon {
                fill: var(--app-color-blue);
                float: left;
                stroke: var(--app-color-blue);
                height: auto;
                margin-right: 10px;
                width: 20px;
            }
            .csv-import {
                border-bottom: 2px solid #E2E2E2;
                display: block;
                padding-bottom: 30px;
                padding-top: 30px;
                width: 100%;
            }
            .csv-import-header {
                align-items: center;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 30px;
            }
            .download-link {
                color: var(--app-color-blue);
                cursor: pointer;
                margin-left: 25px;
            }
            .download-link svg-icon {
                fill: var(--app-color-blue);
                height: 20px;
                margin-right: 5px;
                stroke: var(--app-color-blue);
                vertical-align: middle;
                width: auto;
            }
            .csv-import sifive-upload {
                height: 95px;
                margin-bottom: 25px;
                width: 100%;
            }
            .csv-import-list {
                display: block;
                margin-bottom: 20px;
                width: 100%;
            }
            .csv-import-list tbody {
                display: table;
                transform: translate(-23px, 0);
                width: calc(100% + 23px);
            }
            .csv-import-item.success,
            .csv-import-item:nth-child(even).success {
                background-color: var(--app-color-green-accent);
            }
            .csv-import-item.error,
            .csv-import-item:nth-child(even).error {
                background-color: var(--app-color-red-accent);
            }
            .csv-import-item td {
                height: 70px;
            }
            .csv-import-item td:first-of-type {
                padding-left: 23px;
            }
            .csv-import-item:nth-child(even) {
                background-color: #FBFBFB;
            }
            .csv-import-send-container {
                display: flex;
                justify-content: flex-end;
                width: 100%;
            }

            .invite-code-list {
                display: block;
                width: 100%;
            }
            .invite-code-list tbody {
                display: table;
                transform: translate(-23px, 0);
                width: calc(100% + 23px);
            }
            .invite-code-item {
            }
            .invite-code-item.used {
                background-color: var(--app-color-green-accent);
            }
            .invite-code-item.used:nth-child(even) {
                background-color: var(--app-color-green-accent);
            }
            .invite-code-item td {
                height: 70px;
            }
            .invite-code-item td:first-of-type {
                padding-left: 23px;
            }
            .invite-code-item:nth-child(even) {
                background-color: #FBFBFB;
            }
            .invite-code-item .email {
                padding-right: 23px;
                text-align: right;
            }
            .code-copy {
                color: var(--app-color-blue);
                cursor: pointer;
                display: inline-block;
            }
            .code-copy svg-icon {
                fill: var(--app-color-blue);
                float: right;
                stroke: var(--app-color-blue);
                height: auto;
                margin-left: 10px;
                width: 20px;
            }
            .created .date, .last-used .date {
                border: 1px solid var(--app-color-black);
                margin-left: 5px;
                padding-left: 4px;
                padding-right: 4px;
                padding-top: 4px;
            }
            .archive-toggle {
                color: var(--app-color-red);
                cursor: pointer;
                text-align: center;
            }
            .restore-toggle {
                color: var(--app-color-green);
                cursor: pointer;
                text-align: center;
            }
            .updating-toggle {
                text-align: center;
            }
        `,
    ];

}

export { getStyles };
