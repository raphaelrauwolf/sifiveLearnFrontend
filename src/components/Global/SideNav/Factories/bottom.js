import {
    html,
} from 'lit-element';

import 'Components/Global/SideNav/SideUserNav';

export const bottomFactory = (open) => {

    return html`
    <div class="bottom-container">
        <side-user-nav ?open=${open}></side-user-nav>
    </div>`;

};
