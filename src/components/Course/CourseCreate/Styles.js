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
                color: #23171B;
            }
            :host > .grid-container {
                margin-top: var(--top-bar-height);
                padding-bottom: 30px;
                padding-top: 30px;
            }
            h3 {
                font-size: 40px;
                line-height: 54px;
                margin-bottom: 18px;
            }
            .top-bar-content {
                align-items: center;
                display: flex;
                height: 80px;
                justify-content: space-between;
            }
            .back-link {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .back-link svg-icon {
                display: inline-block;
                fill: var(--app-color-blue);
                float: left;
                height: auto;
                margin-right: 10px;
                width: 19px;
            }
            .remove-drop {
                display: flex;
                align-items: center;
            }
            .remove-drop sifive-round-button {
                margin-left: 15px;
            }
            .header-container {
                display: flex;
                justify-content: space-between;
            }
            .info-container {
                margin-bottom: 40px;
            }
            .header {
                display: flex;
            }
            .header p {
                margin-bottom: 15px;
                margin-right: auto;
                max-width: 35%;
            }
            .header .button-container {

            }
            .list-header {
                display: flex;
                margin-bottom: 35px;
            }
            .unsorted-lesson-container {
                margin-bottom: 80px;
            }
            h5 {
                font-size: 15px;
                font-weight: bold;
                line-height: 24px;
                margin-right: auto;
            }
            .list-controls {

            }
            .list-controls > * {
                color: #0033FF;
                cursor: pointer;
                display: inline-block;
                font-weight: bold;
                font-size: 13px;
                line-height: 24px;
            }
            module-accordion {
                margin-bottom: 10px;
            }
            sifive-sortable + div {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 45px;
            }
            .add-lesson {
                color: var(--app-color-blue);
                cursor: pointer;
            }
            .add-lesson svg-icon {
                display: block;
                fill: var(--app-color-blue);
                float: left;
                height: auto;
                margin-right: 14px;
                stroke: var(--app-color-blue);
                width: 20px;
            }
            .content-container h5 {
                margin-bottom: 40px;
            }
            .content-container p {
                margin-bottom: 45px;
            }
            .content-container sifive-button {
                stroke: var(--app-color-white);
                fill: transparent;
                margin-right: 20px;
            }
            .content-container module-accordion div[slot="bar-content"] > *,
            .content-container lesson-accordion div[slot="bar-content"] > * {
                display: block;
                float: left;
            }

            module-naming, lesson-composing {
                margin-top: var(--top-bar-height);
            }

            /* DRAG & DROP styles */

            .lesson-dragging, .module-dragging {
                align-items: center;
                background-color: #E3FFE1;
                border: 2px solid var(--app-color-green);
                display: none;
                min-height: 50px;
                padding-bottom: 8px;
                padding-left: 23px;
                padding-right: 23px;
                padding-top: 8px;
            }
            .lesson-dragging svg-icon, .module-dragging svg-icon {
                height: auto;
                margin-right: 7px;
                width: 30px;
            }
            .droppable .lesson-dragging, .droppable .module-dragging {
                background-color: var(--app-color-red-accent);
                border: 2px solid var(--app-color-red);
            }
            .droppable-module .lesson-dragging, {
                background-color: var(--app-color-green-accent);
                border: 2px solid var(--app-color-green);
            }
            .dragging lesson-accordion, .dragging module-accordion {
                opacity: .3;
            }
            .dragging module-accordion lesson-accordion {
                opacity: 1;
            }
            .dragging .dragging-clone {
                opacity: 1;
            }
            .dragging-clone {
                padding: 0;
                width: auto;
            }
            .dragging-clone lesson-accordion, .dragging-clone module-accordion {
                display: none;
            }
            .dragging-clone .lesson-dragging {
                display: flex;
            }
            .dragging-clone .module-dragging {
                display: block;
            }
            .module-dragging .module-info {
                align-items: center;
                display: flex;
                min-height: 50px;
                width: 100%;
            }
            .module-dragging .module-lessons {
                align-items: center;
                display: flex;
                height: 30px;
            }
            .module-dragging .module-lessons svg-icon {
                height: auto;
                margin-left: 5px;
                margin-right: 5px;
                width: 15px;
            }

            lesson-accordion div[slot="bar-content"] > * {
                margin-left: 25px;
            }
            lesson-accordion .reorder {
                cursor: grab;
            }

            module-accordion div[slot="bar-content"] > * {
                margin-left: 25px;
            }
            module-accordion .reorder {
                cursor: grab;
            }

            sifive-sortable {
                display: block;
                position: relative;
            }
            sifive-sortable.sorttarget-after::after {
                background-color: var(--app-color-green);
                bottom: 0;
                content: '';
                display: block;
                height: 2px;
                left: 0;
                position: absolute;
                transform: translate(0, 50%);
                width: 100%;
                z-index: 99;
            }
            sifive-sortable.sorttarget-before::after {
                background-color: var(--app-color-green);
                content: '';
                display: block;
                height: 2px;
                left: 0;
                position: absolute;
                transform: translate(0, -50%);
                top: 0;
                width: 100%;
                z-index: 99;
            }

            sifive-dropzone.module-drop.drop-target::after {
                border: 2px solid var(--app-color-green);
                content: '';
                display: block;
                height: calc(100% - 2px);
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: calc(100% - 2px);
                z-index: 99;
            }

        `,
    ];

}

export { getStyles };
