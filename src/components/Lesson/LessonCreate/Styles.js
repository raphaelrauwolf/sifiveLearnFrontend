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
            display: block;
            padding-bottom: 100px;
        }
        .name-container {
            padding-bottom: 52px;
            padding-top: 62px;
        }
        .description-container {
            border-bottom: 2px solid #F2F2F2;
            border-top: 2px solid #F2F2F2;
            padding-bottom: 22px;
            padding-top: 22px;
        }
        .description-container editable-h4 {
            min-height: 400px;
        }
        sifive-sortable:first-of-type {
            background: green;
        }
        sifive-sortable:first-of-type {
            background: green;
        }

        .dotted-line {
            border-bottom: 2px dashed #E2E2E2;
            position: absolute;
            width: 100%;
        }

        .component {
            padding-bottom: 55px;
            padding-top: 55px;
            position: relative;
        }
        .component .error:after{
            content: '';
            border: 2px solid var(--app-color-red-accent);
            height: calc(100% + 10px);
            left: 50%;
            pointer-events: none;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% + 10px);
        }
        .component .dotted-line{
            margin-top: 55px;
        }
        .component-container {
            position: relative;
        }
        .component-ui {
            position: absolute;
            right: -25px;
            top: 5px;
            transform: translate(100%, 0);
        }
        .component-ui sifive-round-button {
            display: block;
        }

        /* dragging */
        .component-dragging {
            align-items: center;
            background-color: #E3FFE1;
            border: 2px solid var(--app-color-green);
            border-radius: 5px;
            display: none;
            height: 50px;
            padding-left: 23px;
            padding-right: 23px;
        }
        .component-dragging sifive-round-button {
            margin-left: 20px;
        }
        .droppable .component-dragging {
            background-color: var(--app-color-red-accent);
            border: 2px solid var(--app-color-red);
        }
        .dragging .component {
            opacity: .3;
        }
        .dragging .dragging-clone {
            opacity: 1;
        }
        .dragging .component-ui {
            display: none;
        }
        .dragging-clone {
            padding: 0;
            width: auto;
        }
        .dragging-clone .component-container > * {
            display: none;
        }
        .dragging-clone.component.grid-container {
            width: auto;
            margin: 0;
        }
        .dragging-clone .component-dragging {
            display: flex;
        }
        .dragging-clone .dotted-line {
            display: none;
        }
        sifive-sortable:last-of-type.sorttarget-after:after {
            border-bottom: 2px dashed var(--app-color-green);
            content: '';
            position: absolute;
            width: 100%;
        }
        sifive-sortable:first-of-type.sorttarget-before:before {
            border-top: 2px dashed var(--app-color-green);
            content: '';
            position: absolute;
            width: 100%;
        }
        .sorttarget-after .component-container .dotted-line {
            border-bottom: 2px dashed var(--app-color-green);
        }


        /* component-select-container */
        .component-select-container {
            align-items: flex-start;
            cursor: pointer;
            display: flex;
            justify-content: space-evenly;
            padding-bottom: 61px;
            padding-top: 42px;
        }
        .component-card {
            border: 1px solid transparent;
            height: 175px;
            pointer: cursor;
            position: relative;
            text-align: center;
            width: 185px;
        }
        .component-card.disabled {
            cursor: not-allowed;
        }
        .component-logo {
            display: block;
            fill: var(--app-color-blue);
            height: calc(100% - 80px);
            left: 50%;
            position: absolute;
            stroke: var(--app-color-blue);
            top: 20px;
            transform: translate(-50%, 0);
        }
        .component-card-label {
            bottom: 20px;
            color: var(--app-color-blue);
            left: 50%;
            position: absolute;
            transform: translate(-50%, 0);
            width: calc(100% - 40px);
        }
        .component-card:hover {
            background-color: #EFF3FF;
            border: 1px solid var(--app-color-blue);
            position: relative;
        }
        .component-card.disabled:hover {
            background-color: var(--app-color-red-accent);
            border: 1px solid var(--app-color-red);
            position: relative;
        }
        .component-card:hover .component-logo {
            fill: var(--app-color-white);
        }
        .component-card.disabled:hover .component-logo {
            fill: var(--app-color-red);
            stroke: var(--app-color-red);
        }
        .component-card.disabled:hover .component-card-label {
            color: var(--app-color-red);
        }

        /* add-button */
        .add-button-container {
            align-items: center;
            display: flex;
            justify-content: center;
            margin-top: 70px;
            position: relative;
        }
        .add-button-container sifive-button {
            position: relative;
        }

        /* close-button */
        .close-button-container {
            align-items: center;
            display: flex;
            justify-content: center;
            position: relative;
        }
        .close-button-container svg-icon {
            stroke: var(--app-color-red);
            fill: var(--app-color-red);
        }

        `,
    ];

}

export { getStyles };
