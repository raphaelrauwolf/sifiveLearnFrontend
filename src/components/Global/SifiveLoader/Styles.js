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
                height: 10vw;
                position: relative;
                width: 10vw;
            }
            svg-icon {
                animation-name: pulse;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                display: block;
                height: 100%;
                width: 100%;
            }
            @keyframes pulse {
                from    {
                    opacity: 0;
                    transform: scale(.8);
                }
                50%     {
                    opacity: 1;
                    transform: scale(1);
                }
                to      {
                    opacity: 0;
                    transform: scale(1.2);
                }
            }
        `,
    ];

}

export { getStyles };
