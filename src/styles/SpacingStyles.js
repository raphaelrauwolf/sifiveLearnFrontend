
import { css, unsafeCSS } from 'lit-element';

import { MediaQueries } from './ResponsiveStyles';

const Properties = [
    'padding',
    'padding-left',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'margin',
    'margin-left',
    'margin-top',
    'margin-right',
    'margin-bottom',
];

const Spacings = {

    xl: {

        DesktopWide: 80,
        DesktopMid: 70,
        Desktop: 50,
        TabletWide: 30,
        Tablet: 15,
        Phone: 50,

    },
    l: {

        DesktopWide: 50,
        DesktopMid: 45,
        Desktop: 30,
        TabletWide: 15,
        Tablet: 10,
        Phone: 45,

    },
    m: {

        DesktopWide: 40,
        DesktopMid: 30,
        Desktop: 15,
        TabletWide: 10,
        Tablet: 7,
        Phone: 25,

    },
    s: {

        DesktopWide: 30,
        DesktopMid: 15,
        Desktop: 10,
        TabletWide: 7,
        Tablet: 5,
        Phone: 20,

    },
    xs: {

        DesktopWide: 20,
        DesktopMid: 7,
        Desktop: 5,
        TabletWide: 4,
        Tablet: 3,
        Phone: 15,

    },

};

const getSpacingCSS = () => {

    let cssString = '';

    Object.keys(MediaQueries).forEach((mqKey) => {

        cssString += `${(MediaQueries[mqKey])} {`;

        Properties.forEach((propKey) => {

            Object.keys(Spacings).forEach((spacingKey) => {

                cssString += `
                .${propKey}-${spacingKey} {

                    ${unsafeCSS(propKey)}: ${unsafeCSS(Spacings[spacingKey][mqKey] + 'px')};

                }
                `;

            });

        });

        cssString += `}`;

    });

    return unsafeCSS(cssString);

};

export const SpacingStyles = css`

    ${getSpacingCSS()}

`;
