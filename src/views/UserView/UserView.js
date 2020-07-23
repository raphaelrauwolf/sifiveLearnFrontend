
import {
    html, customElement, property,
} from 'lit-element';

import {
    getUserID,
    getUser,
    shouldFetchUser,
} from 'Selectors/User';
import UserActions from 'Actions/User';

// component dependencies
import { PrivateViewComponent } from 'Components/Global/PrivateViewComponent';
import 'Components/Global/SifiveLoader';

import { getStyles } from './Styles';

/**
 * UserView LitElement
 * template for /profile
 */
@customElement('user-view')
class UserView extends PrivateViewComponent {

    @property({ type: String })
    userID = false;

    @property({ type: Object })
    user = {};

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

        if (!this.user || this.user.Fetching) {

            return html`<sifive-loader></sifive-loader>`;

        } else if (!this.user.Fetched) {

            return html`
            <div class="grid-container">
                <h3>404 - User Not Found!</h3>
                <a href="/">Home</a>
            </div>`;

        }

        return html`
            <!-- UserView Component -->
            <div class="grid-container">
                <div class="top-container">
                    <div class="left-container">
                        <h1>${this.user.firstname} ${this.user.lastname}</h1>
                        <div class="available">Available for job offers</div>
                    </div>
                    <div class="right-container">
                        <div class="certified">RISC-V Certified</div>
                        <a href="">View Resume</a>
                    </div>
                </div>
                <hr>
                <div class="summary-container">
                    <div class="summary-line">
                        <div class="summary-label">Location</div>
                        <div class="summary-content">New York, NY, USA</div>
                    </div>
                    <div class="summary-line">
                        <div class="summary-label">Team</div>
                        <div class="summary-content">EECS-1</div>
                    </div>
                    <div class="summary-line">
                        <div class="summary-label">Status</div>
                        <div class="summary-content">Learner</div>
                    </div>
                    <div class="summary-line">
                        <div class="summary-label">Last Active</div>
                        <div class="summary-content">10 June 2019</div>
                    </div>
                    <div class="summary-line">
                        <div class="summary-label">Contact</div>
                        <div class="summary-content">
                            <a href="mailto:rolf@email.com">rolf@email.com</a><br>
                            <a href="tel:+1 332 999 0834">+1 332 999 0834</a>
                        </div>
                    </div>
                </div>
                <hr>
                <h5>Work Experience</h5>
                <div class="experience-container">
                    <div class="experience-line">
                        <div class="experience-label">Microsoft</div>
                        <div class="experience-content">
                            Senior Front-End Engineer <br>
                            2017-2019 <br>
                            Seattle, WA, USA
                        </div>
                    </div>
                    <div class="experience-line">
                        <div class="experience-label">Space X</div>
                        <div class="experience-content">
                            Front-End Engineer <br>
                            2015-2017 <br>
                            San Fransisco, CA, USA
                        </div>
                    </div>
                    <div class="experience-line">
                        <div class="experience-label">Facebook</div>
                        <div class="experience-content">
                            Front-End Engineer Intern <br>
                            2014-2015 <br>
                            San Fransisco, CA, USA
                        </div>
                    </div>
                </div>
            </div>`;

    }

    /**
     * Get requested User if not in state
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        if (this.shouldFetchUser) {

            this.store.dispatch(UserActions.getUser(this.userID));

        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        super.stateChanged(state);

        this.userID = getUserID(state);
        this.user = getUser(state, this.userID);

        this.shouldFetchUser = shouldFetchUser(state, this.userID);

    }

}

export { UserView };
