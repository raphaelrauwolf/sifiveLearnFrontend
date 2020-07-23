
import { css } from 'lit-element';

import { MediaQueries } from './ResponsiveStyles';

export const GridStyles = css`
    .grid-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }

    /* Desktop Wide */
    ${MediaQueries.DesktopWide} {
        .grid-container {
            width: 1280px;
        }
    }

    /* Desktop Mid */
    @media only screen and (min-width: 1440px) and (max-width: 1919px) {
        .grid-container {
            width: 1280px;
        }
    }

    /* Desktop */
    @media only screen and (min-width: 1280px) and (max-width: 1439px) {
        .grid-container {
            width: 1024px;
        }
    }

    /* Tablet Wide */
    @media only screen and (min-width: 1024px) and (max-width: 1279px) {
        .grid-container {
            width: 960px;
        }
    }

    /* Tablet */
    @media only screen and (min-width: 768px) and (max-width: 1023px) {
        .grid-container {
            width: 750px;
        }
    }

    /* Phone */
    @media only screen and (max-width: 767px) {
        .grid-container {
            width: 320px;
        }
    }
`;
