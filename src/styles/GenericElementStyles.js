
import { css } from 'lit-element';

export const GenericElementStyles = css`
    .bold {
        font-weight: bold;
    }

    h1, h2, h3, h4, h5, ul, ol, p {
        font-family: var(--app-font-headline);
        margin: 0;
        padding: 0;
    }
    h1 {
        font-size: 110px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 111px;
    }
    h2 {
        font-size: 75px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 79px;
    }
    h3 {
        font-size: 60px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 72px;
    }
    h4 {
        font-size: 40px;
        font-weight: 700;
        letter-spacing: 0;
        line-height: 48px;
    }
    h5 {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0;
        line-height: 22px;
    }
    a {
        color: var(--app-color-blue);
        text-decoration: none;
    }
    img {
        display: block;
    }
    ul, ol {
        list-style: none;
    }
    small {
        display: inline-block;
        font-family: var(--app-font-body);
        font-size: 11px;
        font-weight: 400;
        letter-spacing: .16px;
        line-height: 24px;
    }
    .small {
        font-family: var(--app-font-body);
        font-size: 11px;
        font-weight: 400;
        letter-spacing: .16px;
        line-height: 24px;
    }
    table {
        border-collapse: collapse;
    }
    .flex {
        flex: 1;
        flex-basis: .000000001px;
    }
    .eyebrow {
        font-family: var(--app-font-body);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: .16px;
        line-height: 24px;
    }
    .date {
        font-family: var(--app-font-body);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: .16px;
        line-height: 24px;
    }
    .error-text {
        color: var(--app-color-red);
        font-family: var(--app-font-body);
        font-size: 11px;
        font-weight: 400;
        letter-spacing: .2px;
        line-height: normal;
    }
    .large-data {
        font-family: var(--app-font-data);
        font-size: 200px;
        font-weight: 400;
        line-height: normal;
    }
    .large-data-support {
        font-family: var(--app-font-body);
        font-size: 14px;
        font-weight: 700;
        line-height: normal;
    }
    .large-data-sub {
        font-family: var(--app-font-data);
        font-size: 13px;
        font-weight: 400;
        letter-spacing: .19px;
        line-height: normal;
    }
    .mid-data {
        font-family: var(--app-font-data);
        font-size: 60px;
        font-weight: 400;
        letter-spacing: .86px;
        line-height: normal;
    }
    .small-data {
        font-family: var(--app-font-data);
        font-size: 25px;
        font-weight: 400;
        letter-spacing: .36px;
        line-height: normal;
    }
    .button {
        align-items: center;
        background-color: var(--app-color-blue);
        color: var(--app-color-white);
        cursor: pointer;
        display: inline-flex;
        flex-direction: row;
        font-family: var(--app-font-body);
        font-size: 12px;
        font-weight: 500;
        height: 50px;
        letter-spacing: .33px;
        line-height: 50px;
        min-width: 187px;
        padding-left: 15px;
        padding-right: 15px;
    }

















    /* OLD */
    input {
        background: transparent;
        border: none;
        border-image: none;
        font: inherit;
        margin: 0;
    }
    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
    }
    input:focus {
        outline: none;
    }





/*
    .button {
        background-color: #0033FF;
        border-radius: 5px;
        color: #ffffff;
        cursor: pointer;
        display: inline-block;
        font-size: 11px;
        font-weight: 700;
        height: 50px;
        line-height: 50px;
        min-width: 155px;
        padding-left: 15px;
        padding-right: 15px;
        text-decoration: none;
    }
    .button.disabled {
        pointer-events: none;
    }

    .round-button {
        background-color: #ffffff;
        border: 2px solid #e5e5e5;
        border-radius: 50%;
        cursor: pointer;
        display: inline-block;
        height: 40px;
        position: relative;
        width: 40px;
    }
    .round-button > * {
        left: 50%;
        max-height: 20px;
        max-width: 20px;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
*/

    .facebook-button {
        background-color: var(--app-color-facebook-blue);
        border-radius: 3px;
        color:  var(--app-color-white);
        cursor: pointer;
        display: inline-block;
        font-weight: 700;
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
    }

    .google-button {
        background-color: var(--app-color-white);
        border: 1px solid var(--app-color-black);
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        font-weight: 700;
        height: 42px;
        line-height: 42px;
        padding: 0 15px;
    }
`;
