
import {
    html, customElement, property,
} from 'lit-element';

import Router from 'Utils/Router';

// Redux
import {
    getRole,
} from 'Selectors/User';

// Components
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Team/ManagerTeam';

import { getStyles } from './Styles';

/**
 * TeamView LitElement
 * template for /profile
 */
@customElement('team-view')
class TeamView extends PrivateViewComponent {

    @property({ type: String })
    userRole = '';

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        let teamView;

        if (this.userRole === 'manager') {

            teamView = html`
                <manager-team></manager-team>`;

        }

        return html`
            <!-- TeamView Component -->
            <div class="wrapper">
                ${teamView}
            </div>
        `;

    }

    /**
     * Check if View is active and if user is logged in
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        if (this.userRole !== 'manager') {

            Router.replace('/');

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.userRole = getRole(state);

    }

}

export { TeamView };
