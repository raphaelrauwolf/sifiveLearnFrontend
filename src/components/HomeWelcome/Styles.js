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
            }
            .wrapper {
                display: grid;
                grid-template-columns: 56vw 1fr;
                overflow: hidden;
                position: relative;
            }

            .login-container, .signup-container {
                float: left;
                height: 100vh;
                position: relative;
            }
            .login-container {
                padding-left: 6vw;
                padding-right: 6vw;
                padding-top: 15vh;
                width: 56vw;
            }
            .login-container h1 {
                color: #23171B;
                font-size: 70px;
                line-height: 78px;
                margin-bottom: 43px;
            }
            .login-container hr {
                margin-bottom: 80px;
            }
            .some-container {
                text-align: center;
            }
            .some-container p {
                margin-bottom: 38px;
            }
            .some-container .facebook-button {
                margin-right: 25px;
            }

            .signup-container {
                background-color: #23171B;
                display: flex;
                flex-direction: column;
                width: 44vw;
            }
            .signup-container .text-container {
                height: calc(50% - 60px);
                position: relative;
            }
            .signup-container .text-container .inner-container {
                color: #ffffff;
                font-size: 13px;
                left: 50%;
                line-height: 24px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 60%;
            }
            .signup-container .text-container .inner-container h1 {
                color: #ffffff;
                font-size: 70px;
                line-height: 78px;
                margin-bottom: 56px;
            }
            .signup-container .cta {
                background-color: #0033FF;
                color: #ffffff;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                height: 120px;
                line-height: 120px;
                padding-left: 55px;
                width: 100%;
            }
            .signup-container .image-container {
                flex: 1 1 0;
                overflow: hidden;
                position: relative;
                width: 100%;
            }
            .signup-container .image-container img {
                display: block;
                left: 50%;
                min-height: 100%;
                min-width: 100%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .invite-cta {
                background-color: var(--app-color-white);
                border: 2px solid var(--app-color-blue);
                color: var(--app-color-blue);
                left: 50%;
                padding-bottom: 20px;
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 20px;
                position: absolute;
                top: 50px;
                transform: translate(-50%, 0);
            }
        `,
    ];

}

export { getStyles };
