import { css } from 'lit-element';

import { GenericElementStyles } from './GenericElementStyles';
import { GridStyles } from './GridStyles';
import { SpacingStyles } from './SpacingStyles';
import { GenericClasses } from './GenericClasses';

export const SharedStyles = css`
    * {
        box-sizing: border-box;
    }
    ${GenericElementStyles}
    ${GridStyles}
    ${SpacingStyles}
    ${GenericClasses}
`;
