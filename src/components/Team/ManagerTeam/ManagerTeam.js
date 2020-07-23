
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import {
    shouldFetchTeam,
    shouldFetchTeamCourses,
    getTeam,
    getTeamID,
    getTeamCourses,
    getTeamMembers,
    isFetchingTeam,
    isFetchingTeamCourses,
    isShowingTeam,
} from 'Selectors/Team';
import TeamActions from 'Actions/Team';
import UserActions from 'Actions/User';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Team/TeamAssign';
import 'Components/Team/TeamInvite';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveLoader';
import 'Components/Global/TimeStamp';
import 'Components/Course/CourseProgressBar';

import { courseStatsFactory } from './Factories/courseStats';
import { memberListFactory } from './Factories/memberList';

import { getStyles } from './Styles';

/**
 * ManagerTeam LitElement
 * template
 */
@customElement('manager-team')
class ManagerTeam extends ConnectedComponent {

    @property({ type: Boolean })
    isAssigning = false;

    @property({ type: Boolean })
    isInviting = false;

    @property({ type: Object })
    team = false;

    @property({ type: Array })
    teamCourses = false;

    @property({ type: Array })
    teamMembers = false;

    @property({ type: Boolean })
    isFetching = false;


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

        if (this.isFetching) {

            return html`<sifive-loader></sifive-loader>`;

        }

        const backLink = html`
            <div class="back-link" @click="${this.onBackClick}">
                <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>
                Back
            </div>`;

        if (this.isAssigning) {

            return html`
                <div class="grid-container">
                    ${backLink}
                </div>
                <team-assign></team-assign>`;

        }

        if (this.isInviting) {

            return html`
                <div class="grid-container">
                    ${backLink}
                </div>
                <team-invite></team-invite>`;

        }

        return html`
            <!-- ManagerTeam -->
            <div class="grid-container">
                <header>
                    <div class="eyebrow">Team</div>
                    <h4>${this.team && this.team.name}</h4>
                </header>
                <!--
                <section class="pending">
                    <div class="pending-summary">
                        <div class="large-data">03</div>
                        <h3>
                            Issues<br>
                            Pending
                        </h3>
                    </div>
                    <div class="divider"></div>
                    <div class="pending-assessors">
                        <div class="pending-other">
                            <div class="small-data">02</div>
                            <b>Assassments Pending</b>
                        </div>
                        <div class="pending-assessments">
                            <svg-icon src="assets/images/icons/watch.svg"></svg-icon>
                            Oldest Assassment Pending <time-stamp text="5 DAYS" urgent></time-stamp>
                        </div>
                        <div>
                            <b>Assessors</b>
                            <ul>
                                <li>
                                    <a href="/user/12">Dave Samuelson</a>
                                </li>
                                <li>
                                    <a href="/user/12">Donal Kane</a>
                                </li>
                                <li>
                                    <a href="#">+ 8 more</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                -->
                ${courseStatsFactory(this.teamCourses, this.teamMembers, this.onAssignCourseClick)}
                ${memberListFactory(this.team, this.teamCourses, this.teamMembers, this.onInviteUserCick)}
            </div>
        `;

    }

    /**
     * Lifecycle shouldUpdate check
     * @return {Boolean}
     */
    shouldUpdate() {

        return this.active;

    }

    /**
     * Callback for component updates
     * @param {Map} changedProps
     */
    updated(changedProps) {

        if (this.shouldFetchTeam) {

            this.store.dispatch(TeamActions.getTeam(this.teamID));

        }

        if (this.shouldFetchTeamCourses) {

            this.store.dispatch(TeamActions.getTeamCourses(this.teamID));

        }

        if (this.team && Array.isArray(this.team.users)) {

            this.team.users.forEach((user) => {

                this.store.dispatch(
                    UserActions.getUserProgressIfNeeded(user.id));

            });

        }

        // this.store.dispatch(UserActions.getUserProgressIfNeeded())

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.active = isShowingTeam(state);
        this.teamID = getTeamID(state);

        if (this.active && this.teamID) {

            this.team = getTeam(state, this.teamID);
            this.teamCourses = getTeamCourses(state, this.teamID);
            this.teamMembers = getTeamMembers(state, this.teamID);

            this.shouldFetchTeam = shouldFetchTeam(state, this.teamID);
            this.shouldFetchTeamCourses =
                shouldFetchTeamCourses(state, this.teamID);

            this.isFetching = isFetchingTeam(state, this.teamID) ||
                isFetchingTeamCourses(state, this.teamID);

        }

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onAssignCourseClick(event) {

        this.isAssigning = true;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onInviteUserCick(event) {

        this.isInviting = true;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onBackClick(event) {

        this.isAssigning = false;
        this.isInviting = false;

    }

}

export { ManagerTeam };
