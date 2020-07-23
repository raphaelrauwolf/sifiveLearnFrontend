
import {
    html,
} from 'lit-element';

import 'Components/Global/SideNav/SideNavButton';

import { roleSelectFactory } from './roleSelect';

export const profileButtonsFactory =
    (isVerified, roles, role, open, onRoleSelect) => {

        if (isVerified) {

            return html`
                ${roleSelectFactory(roles, role, open, onRoleSelect)}
                <side-nav-button label="Profile"
                    ?label-hidden=${!open}
                    href="/profile">
                    <svg-icon slot="icon" src="assets/images/icons/profile.svg" alt="Profile Icon"></svg-icon>
                </side-nav-button>`;

        }

        return '';

    };
