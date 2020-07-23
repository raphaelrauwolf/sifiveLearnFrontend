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
                overflow: hidden;
            }
            :host([open]) .media-details {
                display: flex;
            }
            :host([open]) .content {
                opacity: 1;
                visibility: visible;
            }
            :host([open]) .wrapper {
                height: auto;
            }
            .wrapper {
                align-items: flex-start;
                border: 2px solid #E5E5E5;
                display: flex;
                justify-content: flex-end;
                height: 67px;
                padding-bottom: 30px;
                padding-left: 20px;
                padding-right: 35px;
                position: relative;
                width: 100%;
            }
            .header {
                display: flex;
                align-items: center;
                height: 67px;
            }
            .content {
                margin-top: 10px;
                opacity: 0;
                transition: opacity 300ms;
                visibility: hidden;
            }
            .content > * {
                height: auto;
                max-width: 400px;
                max-height: 400px;
                width: 100%;
            }

            .info {
                flex: 1 1 0;
            }

            .details {
                margin-right: auto;
                width: 320px;
            }
            .details-toggle {
                cursor: pointer;
                font-weight: 500;
                font-size: 12px;
                letter-spacing: 0.3px;
                line-height: 24px;
            }
            .details-toggle .divider {
                background-color: #ECECEC;
                display: inline-block;
                height: 16px;
                margin-left: 15px;
                margin-right: 5px;
                position: relative;
                top: 2px;
                width: 1px;
            }
            .details-toggle svg-icon {
                position: relative;
                top: 4px;
            }
            .detail {
                margin-bottom: 9px;
            }
            .detail time-stamp {
                margin-left: 5px;
            }

            .courses {
                width: 220px;
            }
            .courses .counter {
                background-color: var(--app-color-blue);
                border-radius: 50%;
                display: inline-block;
                height: 30px;
                margin-right: 10px;
                width: 30px;

                color: var(--app-color-white);
                font-family: Manifold CF;
                font-style: normal;
                font-weight: bold;
                font-size: 11px;
                line-height: 30px;
                text-align: center;
            }
            .courses-headline {
                font-weight: 500;
                font-size: 12px;
                letter-spacing: 0.33;
            }
            .course-list li {
                font-weight: bold;
                font-size: 14px;
                line-height: 24px;
                letter-spacing: 0.2px;
            }

            .media-details {
                align-items: center;
                border: 2px solid #E5E5E5;
                border-top: none;
                display: none;
            }
            .actions {
                align-items: center;
                display: flex;
                height: 67px;
            }
        `,
    ];

}

export { getStyles };
