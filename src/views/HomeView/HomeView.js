
import {
    html, customElement, property,
} from 'lit-element';

import Router from 'Utils/Router';

// redux dependencies
import {
    isLoggedIn,
    isVerified,
    getRole,
    getTeams,
} from 'Selectors/User';

import { shouldFetchPendingAssessments } from 'Selectors/Assessment'

// component dependencies
import { BaseViewComponent } from 'Components/Global/BaseViewComponent';
import 'Components/HomeWelcome';
import 'Components/Dashboard/LearnerDashboard';
import 'Components/Dashboard/ManagerDashboard';
import 'Components/Dashboard/AssessorDashboard';

import { getAssessmentStats, getPendingAssessments } from 'Actions/Assessment'

import { getStyles } from './Styles';

/**
 * HomeView LitElement
 * template for / route
 */
@customElement('home-view')
class HomeView extends BaseViewComponent {

    @property({ type: Boolean })
    loggedIn = false;

    @property({ type: Boolean })
    isVerified = false;

    @property({ type: String })
    userRole = '';

    @property({ type: Object })
    teams = {};

    @property({ type: Array })
    userTeams = getTeams(this.store.getState()) || []

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

        let dashboard;

        if (this.userRole === 'learner') {

            dashboard = html`<learner-dashboard></learner-dashboard>`;

        } else if (this.userRole === 'manager') {

            dashboard = html`<manager-dashboard
                .teams=${this.teams}></manager-dashboard>`;

        } else if (this.userRole === 'accessor') {

            dashboard = html`<assessor-dashboard></assessor-dashboard>`;

        } else {

            dashboard = html`
                <div class="grid-container">
                    <h3>
                        You are not part of a team <br />
                        and have no role :/
                    </h3>
                </div>`;

        }

        return html`
            <!-- HomeView Component -->
            <div class="wrapper">
                ${this.loggedIn ?
                    dashboard :
                    html`<home-welcome></home-welcome>`}
            </div>
        `;

    }

    /**
     * Verify mail if not verified
     * @param {Object} changedProps
     */
    updated(changedProps) {

        super.updated(changedProps);

        if (this.loggedIn && !this.isVerified) {

            Router.replace('/signup');

        }

        if (changedProps.has('active') && this.active) {

            this.onPageNavigation()

        }

    }

    // NOTE: this same function is also in AssessorDashboard.js
    fetchAssessmentData() {
        const userTeam = this.userTeams[0]
        const teamId = userTeam.id
        this.store.dispatch(getPendingAssessments(teamId))
        this.store.dispatch(getAssessmentStats(teamId))
    }

    /**
     * Called when this page view is navigated to
     */
    onPageNavigation() {

        if (this.userRole === 'accessor' && shouldFetchPendingAssessments(this.store.getState())) {
            this.fetchAssessmentData()
        }

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.loggedIn = isLoggedIn(state);
        this.isVerified = isVerified(state);
        this.userRole = getRole(state);
        this.teams = getTeams(state);
        this.userTeams = getTeams(this.store.getState()) || []

    }

}

export { HomeView };
