import {
    html,
} from 'lit-element';

import 'Components/Global/SideNav/SideNavButton';
import 'Components/Global/SideNav/SideCourseNav';
import 'Components/Global/SVGIcon';

export const topFactory = (open) => {

    const homeButton = html`
    <side-nav-button label="Home"
        ?label-hidden=${!open}
        href="/">
        <svg-icon slot="icon" src="assets/images/icons/home.svg" alt="Exit Icon"></svg-icon>
    </side-nav-button>`;

    return html`
        <div class="top-container">
            ${homeButton}
            <side-course-nav ?open=${open}></side-course-nav>
        </div>
    `;

};
