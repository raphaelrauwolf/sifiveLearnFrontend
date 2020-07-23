
import {
    html,
} from 'lit-element';

import { ROLES } from 'Constants/User';

import 'Components/Global/SideNav/SideNavDropdown';
import 'Components/Global/SVGIcon';

export const roleSelectFactory = (roles, role, open, onRoleSelect) => {

    if (roles.length > 0 && role) {

        const roleRole = ROLES[role];

        let settingsList = roles.map(role => ROLES[role].LABEL);

        settingsList = [
            ROLES.MANAGER.LABEL,
            ROLES.ASSESSOR.LABEL,
            ROLES.LEARNER.LABEL,
        ];

        const index = settingsList.indexOf(roleRole.LABEL);

        return html`
        <side-nav-dropdown eyebrow="View as"
            ?label-hidden=${!open}
            .dropdownList=${settingsList}
            .dropdownActiveIndex=${index}
            @dropdown-select=${onRoleSelect}>
            <svg-icon slot="icon" src="assets/images/icons/view_as.svg" alt="View as Icon"></svg-icon>
        </side-nav-dropdown>`;

    }

    return '';

};
