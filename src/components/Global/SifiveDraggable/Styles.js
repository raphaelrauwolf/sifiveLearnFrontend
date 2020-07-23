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
                cursor: grab!important;
            }
            ::slotted(*) [draggable] {
                -moz-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                user-select: none;

                -khtml-user-drag: element;
                -webkit-user-drag: element;
            }
        `,
    ];

}

export { getStyles };
