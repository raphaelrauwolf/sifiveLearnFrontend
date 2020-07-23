import {
    html,
} from 'lit-element';

import {
    PROFILE_PATH, USER_PATH, TEAM_PATH, COURSE_PATH,
    MODULE_PATH, LESSON_PATH, INVITE_PATH, VERIFY_PATH,
    SIGNUP_PATH, DESIGN_PATH, HOME_PATH,
    TERMS_PATH, PRIVACY_PATH,
} from 'Constants/Paths';

import 'Components/ComponentRouter';
import 'Components/Global/SnackBar';
import 'Components/Global/TopBar';
import 'Components/Global/UploadStatus';
import 'Components/Global/SideNav';
import 'Components/Global/SVGIcon';

const routes = [
    { name: 'profile-view', route: PROFILE_PATH },
    { name: 'user-view', route: USER_PATH },
    { name: 'team-view', route: TEAM_PATH },
    { name: 'course-view', route: COURSE_PATH },
    { name: 'module-view', route: MODULE_PATH },
    { name: 'lesson-view', route: LESSON_PATH },
    { name: 'invite-view', route: INVITE_PATH },
    { name: 'verify-view', route: VERIFY_PATH },
    { name: 'signup-view', route: SIGNUP_PATH },
    { name: 'design-view', route: DESIGN_PATH },
    { name: 'terms-view', route: TERMS_PATH },
    { name: 'privacy-view', route: PRIVACY_PATH },
    { name: 'home-view', route: HOME_PATH, default: true },
];

export const loggedInFactory = () => {

    return html`
        <!-- SifiveApp Component [LoggedIN]-->
        <snack-bar></snack-bar>
        <side-nav></side-nav>
        <upload-status></upload-status>
        <main role="main">
            <component-router .routes=${routes}>
                <home-view slot="home-view"></home-view>
                <user-view slot="user-view"></user-view>
                <team-view slot="team-view"></team-view>
                <course-view slot="course-view"></course-view>
                <module-view slot="module-view"></module-view>
                <lesson-view slot="lesson-view"></lesson-view>
                <profile-view slot="profile-view"></profile-view>
                <design-view slot="design-view"></design-view>
                <privacy-view slot="privacy-view"></privacy-view>
                <terms-view slot="terms-view"></terms-view>
                <invite-view slot="invite-view"></invite-view>
                <verify-view slot="verify-view"></verify-view>
                <signup-view slot="signup-view"></signup-view>
            </component-router>
        </main>`;

};
