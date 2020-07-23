
import {
    html, customElement, property,
} from 'lit-element';

import {
    shouldFetchTeamCourses,
    isFetchingTeamCourses,
} from 'Selectors/Team';

import {
    getTeams,
} from 'Selectors/User';

import TeamActions from 'Actions/Team';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveLoader';

import { getStyles } from './Styles';

/**
 * ManagerDashboard LitElement
 * template
 */
@customElement('manager-dashboard')
class ManagerDashboard extends ConnectedComponent {

    @property({ type: Boolean })
    isFetching = false;

    @property({ type: Object })
    teams = false;

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

        const teamList = Object.values(this.teams).map((team) => {

            let courses = [
                ...new Array(3),
            ];

            if (team.courses) {

                courses = [
                    ...team.courses,
                    ...courses,
                ];

            }

            courses = courses.slice(0, 3).map((course) => {

                if (course) {

                    return html`
                        <td class="course">
                        <a href="/course/${course.id}">${course.name}</a>
                        </td>`;

                } else {

                    return html`<td>&nbsp;</td>`;

                }


            });

            return html`
            <tr class="">
                <td class="team">
                    <a href="/team/${team.id}"><b>${team.name}</b></a><br>
                    5 Team Members
                </td>
                ${courses}
            </tr>`;

        });

        return html`
            <!-- ManagerDashboard -->
            <div class="grid-container">
                <!--
                <div class="team-statistics">
                    <div class="team-statistics-header">
                        <div class="team-statistics-header-left">
                            <h5>Team Statistics</h5>
                        </div>
                        <div class="flex"></div>
                        <div class="team-statistics-header-right">
                            <sifive-dropdown label="Choose Team" .items=""></sifive-dropdown>
                            <sifive-dropdown label="Choose Timeperiod" .items=""></sifive-dropdown>
                        </div>
                    </div>
                    <div class="team-statistics-container">
                        <div class="team-stat">
                            <span class="team-stat-number">5</span>
                            <span class="team-stat-text">In your team</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">45</span>
                            <span class="team-stat-text">Outside your team</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">3</span>
                            <span class="team-stat-text">Avg. days to access</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">21</span>
                            <span class="team-stat-text">Assessments passed</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">18</span>
                            <span class="team-stat-text">Assessments Graded</span>
                        </div>
                        <div class="team-stat">
                            <span class="team-stat-number">1</span>
                            <span class="team-stat-text">Active Assessor</span>
                        </div>
                    </div>
                </div>
                <div class="activity-feed">
                    <div class="activity-feed-header">
                        <div class="team-statistics-header-left">
                            <h5>Activity Feed</h5>
                        </div>
                        <div class="flex"></div>
                        <div class="team-statistics-header-right">
                            <sifive-dropdown label="Choose Day" .items=""></sifive-dropdown>
                            <sifive-dropdown label="Choose Roles" .items=""></sifive-dropdown>
                            <sifive-dropdown label="View All Teams" .items=""></sifive-dropdown>
                        </div>
                    </div>
                    <table class="activity-feed-container">
                        <tr class="bad">
                            <td class="user">
                                <a href="/user/123"><b>Joshua Smith</b></a><br>
                                Learner
                            </td>
                            <td class="team">
                                <a href="/team/123">EECS-1</a>
                            </td>
                            <td class="activity">
                                Missed deadline
                            </td>
                            <td class="context">
                                <a href="/course/1">Assessment: RISC-V Fundamentals</a>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="user">
                                <a href="/user/123"><b>Joshua Smith</b></a><br>
                                Learner
                            </td>
                            <td class="team">
                                <a href="/team/123">EECS-1</a>
                            </td>
                            <td class="activity">
                                Missed deadline
                            </td>
                            <td class="context">
                                <a href="/course/1">Assessment: RISC-V Fundamentals</a>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="user">
                                <a href="/user/123"><b>Joshua Smith</b></a><br>
                                Learner
                            </td>
                            <td class="team">
                                <a href="/team/123">EECS-1</a>
                            </td>
                            <td class="activity">
                                Missed deadline
                            </td>
                            <td class="context">
                                <a href="/course/1">Assessment: RISC-V Fundamentals</a>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="user">
                                <a href="/user/123"><b>Joshua Smith</b></a><br>
                                Learner
                            </td>
                            <td class="team">
                                <a href="/team/123">EECS-1</a>
                            </td>
                            <td class="activity">
                                Missed deadline
                            </td>
                            <td class="context">
                                <a href="/course/1">Assessment: RISC-V Fundamentals</a>
                            </td>
                        </tr>
                    </table>
                </div>
                -->
                <div class="team-list">
                    <div class="team-list-header">
                        <div class="team-list-header-left">
                            <h5>Teams & Courses</h5>
                        </div>
                        <div class="team-list-header-right">
                            <sifive-dropdown label="View All Teams" .items="${['SiFive Global', 'EECS-1', 'EECS-2', 'EECS-3']}"></sifive-dropdown>
                        </div>
                    </div>
                    <table class="list">
                        ${teamList}
                    </table>
                </div>
            </div>
        `;

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {

        this.isFetching = false;
        this.teams = getTeams(state);

        if (Object.values(this.teams).length > 0) {

            Object.values(this.teams).forEach((team) => {

                if (shouldFetchTeamCourses(state, team.id)) {

                    this.store.dispatch(TeamActions.getTeamCourses(team.id));

                }

                this.isFetching = this.isFetching ||
                    isFetchingTeamCourses(state, team.id);

            });

        }

    }

}

export { ManagerDashboard };
