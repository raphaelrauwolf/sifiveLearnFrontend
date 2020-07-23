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
                background-color:  #fff;
                border: 2px solid black;
                color: black;
                left: 50%;
                position: fixed;
                top: 50px;
                transform: translate(-50%, calc(-100% - 50px));
                transition: transform 300ms;
                will-change: transform;
                z-index: 999;
            }
            :host([visible]) {
                transform: translate(-50%, 0);
            }
            :host([mode=success]) {
                background-color:  #e2ffe1;
                border: 2px solid green;
                color: green;
            }
            :host([mode=error]) {
                background-color:  #fff5f4;
                border: 2px solid red;
                color: red;
            }
            .wrapper {
                max-width: 90vw;
                padding: 15px;
                text-align: center;
            }
        `,
    ];

}

export { getStyles };
