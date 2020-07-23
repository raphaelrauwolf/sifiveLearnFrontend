import { html } from 'lit-element';

export const singleTeamDashboard = function({ numPendingAssessments, handleStartAssessment }) {

    return html`
        <div class="wrapper">
            <section class="assessment-top-section">
                <div class="big-number">${('' + numPendingAssessments).padStart(2, '0')}</div>
                <div>
                    <div class="eyebrow mb">Assessments awaiting to be graded in your team</div>
                    <div class="assessments-pending">Assessment${numPendingAssessments !== 1 ? 's' : ''}<br />Pending</div>
                </div>
                    <div class="flex-right-align" style="position:relative;">
                        ${numPendingAssessments > 0 ? html`
                            <div style="position:absolute;bottom:1.5rem;right:0;">
                                <div class="mb" style="white-space:nowrap">
                                    <svg-icon src="assets/images/icons/hourglass.svg" alt="Estimated Time Icon"></svg-icon>
                                    <small>Oldest Assessment Pending <span class="highlight-red">5 Days</span></small>
                                </div>
                                <div>
                                    <a href="/">
                                        <sifive-button label="Start Assessment" @click=${handleStartAssessment}></sifive-button>
                                    </a>
                                </div>
                            </div>
                        ` : ''}
                    </div>
            </section>

            <section class="assessment-instructions-section">
                <h5>Assessments take approx. 15 minutes to complete.</h5>
                <div class="instructions">
                    <p class="mb">By starting the review you commit to completing the assessment review and providing the student with useful feedback.</p>
                    <p>Read our guidelines on assessments <a href="">here</a>.</p>
                </div>
            </section>

            <section class="assessments-completed-box">
                <div class="flex-display mb-3">
                    <h5>Assessments Completed</h5>
                </div>
                <div class="flex-display assessments-completed">
                    <div><span class="small-number">05</span><span class="bold">In your team</span></div>
                    <div><span class="small-number">21</span><span class="bold">Outside your team</span></div>
                    <div><span class="small-number">3,5</span><span class="bold">Avg. days to access</span></div>
                </div>
            </section>
        </div>
    `
}