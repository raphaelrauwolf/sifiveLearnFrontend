
import { css } from 'lit-element';

export const MediaQueries = {

    DesktopWide: css`@media only screen and (min-width: 1920px)`,
    DesktopMid: css`@media only screen and (min-width: 1440px) and (max-width: 1919px)`,
    Desktop: css`@media only screen and (min-width: 1280px) and (max-width: 1439px)`,
    TabletWide: css`@media only screen and (min-width: 1024px) and (max-width: 1279px)`,
    Tablet: css`@media only screen and (min-width: 768px) and (max-width: 1023px)`,
    Phone: css`@media only screen and (max-width: 767px)`,

};
