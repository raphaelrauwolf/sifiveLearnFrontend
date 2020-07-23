import {
    html,
} from 'lit-element';

import {
    FORGOT_PATH, RESET_PATH, SIGNUP_PATH,
    VERIFY_PATH, DESIGN_PATH, HOME_PATH,
    TERMS_PATH, PRIVACY_PATH, INVITE_PATH,
} from 'Constants/Paths';

import 'Components/ComponentRouter';
import 'Components/Global/SnackBar';

export const loggedOutFactory = () => {

    const routes = [
        { name: 'forgot-view', route: FORGOT_PATH },
        { name: 'reset-view', route: RESET_PATH },
        { name: 'signup-view', route: SIGNUP_PATH },
        { name: 'verify-view', route: VERIFY_PATH },
        { name: 'invite-view', route: INVITE_PATH },
        { name: 'design-view', route: DESIGN_PATH },
        { name: 'terms-view', route: TERMS_PATH },
        { name: 'privacy-view', route: PRIVACY_PATH },
        { name: 'home-view', route: HOME_PATH, default: true },
    ];

    return html`
        <!-- SifiveApp Component [LoggedOUT] -->
        <snack-bar></snack-bar>
        <main role="main">
            <component-router .routes=${routes}>
                <home-view slot="home-view"></home-view>
                <design-view slot="design-view"></design-view>
                <privacy-view slot="privacy-view"></privacy-view>
                <terms-view slot="terms-view"></terms-view>
                <reset-view slot="reset-view"></reset-view>
                <forgot-view slot="forgot-view"></forgot-view>
                <signup-view slot="signup-view"></signup-view>
                <invite-view slot="invite-view"></invite-view>
            </component-router>
        </main>`;

};
