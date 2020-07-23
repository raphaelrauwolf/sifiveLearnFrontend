
import {
    html, customElement, property
} from 'lit-element';

// redux dependencies
// TODO: add assessment selectors
import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SifiveLoader';
import 'Components/Global/SifiveButton';
import 'Components/Global/SVGIcon';

import './AssessmentEvaluation'

import { singleTeamDashboard } from './Factories/singleTeamDashboard'
import { multipleTeamsDashboard } from './Factories/multipleTeamsDashboard'

import { getStyles } from './Styles';

import { getAssessmentStats, getPendingAssessments } from 'Actions/Assessment'
import { getPendingAssessments as getPendingAssessmentsFromState,
    getPendingAssessmentsStatus as getPendingAssessmentsStatusFromState } from 'Selectors/Assessment'
import { getTeams } from 'Selectors/User'

// TODO: Replace this with logic
const multipleTeams = false

/**
 * AssessorDashboard LitElement
 * template
 */
@customElement('assessor-dashboard')
class AssessorDashboard extends ConnectedComponent {

    @property({ type: Object })
    courses = {};

    @property({ type: Boolean })
    startedAssessment = false;

    /* Pending assessments array returned from API */
    @property({ type: Array })
    pendingAssessments = getPendingAssessmentsFromState(this.store.getState()) || []

    @property({ type: Array })
    assessmentStats = this.store.getState().Assessment.assessmentStats || []

    @property({ type: Array })
    userTeams = getTeams(this.store.getState()) || []

    @property({ type: String })
    createAssessmentStatus = ''

    @property({ type: String })
    pendingAssessmentsStatus = getPendingAssessmentsStatusFromState(this.store.getState())

    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Callback for redux state changes
     * @param {Object} state current state
     */
    stateChanged(state) {
        this.pendingAssessmentsStatus = getPendingAssessmentsStatusFromState(this.store.getState())
        this.pendingAssessments = getPendingAssessmentsFromState(state)
        this.userTeams = getTeams(this.store.getState()) || []
        this.assessmentStats = state.Assessment.assessmentStats

    }

    connectedCallback() {
        super.connectedCallback()
        this.fetchAssessmentData()
    }

    // NOTE: this same function is also in HomeView.js
    fetchAssessmentData() {
        const userTeam = this.userTeams[0]
        const teamId = userTeam.id
        this.store.dispatch(getPendingAssessments(teamId))
        this.store.dispatch(getAssessmentStats(teamId))
    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        if (this.pendingAssessments == null && this.pendingAssessmentsStatus === 'PENDING') {
            return html`<sifive-loader></sifive-loader>`
        }

        if (this.startedAssessment) {
            const assessmentId = getActivePendingAssessmentId(this.pendingAssessments)
            return html`<assessment-evaluation assessmentId=${assessmentId} .onSubmit=${() => this.startedAssessment = false}></assessment-evaluation>`
        }

        const handleStartAssessment = () => this.startedAssessment = true

        if (multipleTeams) {
            const userTeam = this.userTeams[0]
            const userTeamName = userTeam.name
            return multipleTeamsDashboard({ userTeamName, handleStartAssessment })
        }

        const numPendingAssessments = Array.isArray(this.pendingAssessments) ? this.pendingAssessments.length : 0
        return singleTeamDashboard({ numPendingAssessments, handleStartAssessment })
    }

}

export { AssessorDashboard };

/**************************************/

function getActivePendingAssessmentId(pendingAssessments) {
    return pendingAssessments[0]['id']
}