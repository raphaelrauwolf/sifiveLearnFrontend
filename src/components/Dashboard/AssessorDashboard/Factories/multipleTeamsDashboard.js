import { html } from 'lit-element';

export const multipleTeamsDashboard = function({ userTeamName, handleStartAssessment }) {

    return html`
        <div class="wrapper multiple-teams">

            <div class="section-assessment">
                <header class="header-title">
                    <small class="bold">Assessments</small>
                    <div style="display:flex;">
                        <h3>Pending</h3>
                        <div class="flex-display" style="align-items:center;margin-left:2rem;">
                            <svg-icon src="assets/images/icons/start_time.svg" alt="Estimated Time Icon"></svg-icon>
                            <div style="margin-left: 7px;line-height:1;">
                                <p><small>Oldest Assessment Pending <span class="highlight-red">5 Days</span></small></p>
                                <p><small style="line-height: normal;">Team: <a href="">${userTeamName}</a></small></p>
                            </div>
                        </div>
                    </div>
                    <div class="flex-display mt-3">
                        <div>
                            <span class="small-number">06</span>
                            <span class="label">EECS-1</span>
                        </div>
                        <div>
                            <span class="small-number">04</span>
                            <span class="label">EECS-2-1</span>
                        </div>
                        <div>
                            <span class="small-number">+500</span>
                            <span class="label">EECS-2-1</span>
                        </div>
                    </div>
                </header>
            </div>

            <section class="section-assessment mb-4">
                <div class="mb-1-5">
                    <span class="mr-1">Dropdown box</span>
                    <sifive-button label="Start Review" @click=${handleStartAssessment}></sifive-button>
                </div>
                <p class="bold mb-1-5">Assessments take approx. 15 minutes to complete</p>
                <p class="mb-1-5">By starting the review you commit to completing the assessment review and providing the student with useful feedback.</p>
                <p>Read our guidelines on assessments <a href="/">here</a></p>
            </section>

            <section class="assessments-completed-box">
                <div class="flex-display mb-3">
                    <h5>Assessments Completed</h5>
                    <div>Date dropdown</div>
                </div>

                <div class="assessments-completed-numbers">
                    <div>
                        <span class="small-number">09</span>
                        <span class="label">EECS-1</span>
                    </div>
                    <div>
                        <span class="small-number">3.5</span>
                        <span class="label">Avg. days to assess EECS-2-1</span>
                    </div>
                    <div>
                        <span class="small-number">02</span>
                        <span class="label">EECS-2</span>
                    </div>
                    <div>
                        <span class="small-number">05</span>
                        <span class="label">Avg. days to assess EECS-2</span>
                    </div>
                    <div>
                        <span class="small-number">16</span>
                        <span class="label">Outside your team</span>
                    </div>
                    <div>
                        <span class="small-number">08</span>
                        <span class="label">Avg. days to assess across all SiFive teams</span>
                    </div>
                </div>
            </section>
        </div>
    `
}