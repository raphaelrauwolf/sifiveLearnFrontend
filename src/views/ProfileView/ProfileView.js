
import {
    html, customElement, property,
} from 'lit-element';

import { getCurrentUser } from 'Selectors/User';

import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';

import { getStyles } from './Styles';

/**
 * ProfileView LitElement
 * template for /profile
 */
@customElement('profile-view')
class ProfileView extends PrivateViewComponent {

    @property({ type: Object })
    currentUser = false;

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

        return html`
            <!-- ProfileView Component -->
            <div class="grid-container">
                <h1>Profile</h1>
                <h4>
                    Hi ${this.currentUser.firstname}!<br>
                    Profiles are coming soon!
                </h4>
            </div>
        `;

    }

    /**
     * Callback for redux state change
     * @param  {Object} state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.currentUser = getCurrentUser(state);

    }

}

export { ProfileView };
