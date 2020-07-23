
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import { ROLES } from 'Constants/User';

// redux dependencies
import {
    isVerified,
    getAvailableRoles,
    getRole,
} from 'Selectors/User';
import UserActions from 'Actions/User';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SideNav/SideNavButton';
import 'Components/Global/SVGIcon';

import { hasArrayChanged } from 'Components/hasArrayChanged';

import { profileButtonsFactory } from './Factories/profileButtons';

import { getStyles } from './Styles';

/**
 * SideCourseNav LitElement
 * template
 */
@customElement('side-user-nav')
class SideCourseNav extends ConnectedComponent {

    @property({ type: Boolean })
    open = false;

    @property({
        type: Array,
        hasChanged: hasArrayChanged,
    })
    roles = [];

    @property({ type: String })
    userRole = '';


    @property({ type: Boolean, attribute: 'is-verified' })
    isVerified = false;

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- SideCourseNav Component -->
            <div class="wrapper">
                ${profileButtonsFactory(
                    this.isVerified, this.roles, this.userRole, this.open, this.onRoleSelect)}
                <side-nav-button label="Logout"
                    ?label-hidden=${!this.open}
                    @click=${this.onLogoutClick}>
                    <svg-icon slot="icon" src="assets/images/icons/exit.svg" alt="Exit Icon"></svg-icon>
                </side-nav-button>
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.isVerified = isVerified(state);
        this.roles = getAvailableRoles(state);
        this.userRole = getRole(state);

    }

    /**
     * Callback for role dropdown select
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onRoleSelect(event) {

        const role = ROLES[event.detail.item].API;

        this.store.dispatch(UserActions.setRole(role));

    }

    /**
     * Callback for Menu click
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onLogoutClick(event) {

        this.store.dispatch(UserActions.logout());

    }

}

export { SideCourseNav };
