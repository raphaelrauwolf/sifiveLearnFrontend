
import {
    html, customElement,
} from 'lit-element';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

import { getStyles } from './Styles';

/**
 * TermsView LitElement
 * template for /privacy-policy
 */
@customElement('terms-view')
class TermsView extends BaseViewComponent {

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
            <!-- TermsView Component -->
            <div class="grid-container">
                <header>
                    <h3>Terms for SiFive Learn</h3>
                    <h6><i>Last Revised: August 2, 2019</i></h6>
                    <p>
                        By registering for sifiveacademy.com (“SiFive Learn Site”), you agree to be bound by these SiFive Learn Site Terms. In addition to the sifive.com <a target="_blank" href="https://www.sifive.com/terms">Terms of Use</a>, which are hereby incorporated by reference, these SiFive Learn Site terms, as Supplemental Terms, govern your access to and use of sifiveacademy.com. If you do not agree to these terms or you do not have the authority to bind your employer or company to these terms, you must not register or use the SiFive Learn Site or any associated Training.
                    </p>
                    <p>Any capitalized terms that are not defined in these Supplemental Terms have the definition given in the sifive.com Terms of Use.</p>
                </header>
                <section>
                    <h5>Privacy</h5>
                    <p>SiFive is committed to protecting your privacy. We encourage you to review the SiFive <a target="_blank" href="https://www.sifive.com/privacy">Privacy Policy</a> as well as the SiFive Learn Site Privacy Policy to learn how we may collect, use, and protect your personal information and data.</p>
                </section>
                <section>
                    <h5>SiFive Learn</h5>
                    <p>Through SiFive Learn, SiFive offers a variety of self-paced training modules, instructor-led training, and team-based training solutions, quizzes, tests, assessments, evaluations, simulations, and labs, all of which may be delivered electronically and/or in-person, in real-time or on a pre-recorded basis, and which are collectively referred to as “Training”.</p>
                    <p>In some instances, users may upload content, submit comments, or otherwise interact with SiFive Learn, for which such use is governed by the sifive.com Terms of Use as supplemented by these terms.</p>
                    <p>SiFive Learn may use assessors, proctors, instructors, and/or evaluators (“Staff”) to facilitate Training and to ensure compliance with the terms. Staff may have administrative access to details regarding your account, including Training history, compliance, testing, etc.</p>
                    <p>
                        Certain Training and/or certain portions of the SiFive Learn Site may be limited to a specific set of users and its access and usage may be subject to additional terms, restrictions, and/or fees. Such a limited set of users may be referred to as a “Team”. Each Team may have one or more Team Managers who may have certain administrative rights to the Team, including adding, deleting, or modifying Team members, viewing information associated with Team members, and creating, modifying, managing, or deleting access codes that permit users to join the Team.
                    </p>
                </section>
                <section>
                    <h5>Registration and Cancellation</h5>
                    <p>SiFive may require registration or pre-registration for certain types of Training. You acknowledge that absent your successful registration or pre-registration for such Training, you may be denied access to participate.</p>
                    <p>
                        SiFive may, at its sole discretion, cancel, postpone, or delay any given Training for any reason. SiFive will attempt to provide as much advance notice as reasonably possible for any such cancellation, delay, or postponement (“Cancellation”). In no circumstance will SiFive issue any refund for SiFive-initiated Cancellation, your cancellation of registration or non-attendance, or for any other reason. SiFive will not be liable for any travel-related or other expenses or fees related to the Training or Cancellation.
                    </p>
                </section>
                <section>
                    <h5>Honor Code Pledge</h5>
                    <p>By enrolling in, accessing, and/or participating in Training and using the SiFive Learn Site, you agree that you will:</p>
                    <ul>
                        <li>Not harass other users of Staff.</li>
                        <li>Complete all quizzes and assignments on your own, unless collaboration on an assignment is explicitly permitted.</li>
                        <li>Not plagiarize (a form of cheating) the work of others. For example, using another person’s original work (e.g., code, language, formulas, etc.) in your assignments, projects, or assessments.</li>
                        <li>Maintain only one user account and not let anyone else use your account.</li>
                        <li>Not engage in any activity that would dishonestly improve your results or improve or hurt the results of others.</li>
                        <li>Not post answers to problems that are being used to assess learner performance.</li>
                        <li>Not post online any secured testing materials, as applicable.</li>
                        <li>Will notify Staff immediately if you become aware of any other User cheating or breaching this Honor Code or the SiFive Learn Site Terms.</li>
                    </ul>
                </section>
                <section>
                    <h5>Violations</h5>
                    <p>If you are found in violation of the SiFive Learn Site Terms or Honor Code, you may be subject to one or more of the following actions or additional actions at SiFive’s sole discretion:</p>
                    <ul>
                        <li>Receiving a zero or no credit for an assignment;</li>
                        <li>Having any certificate earned in the course withheld or revoked;</li>
                        <li>Being unenrolled from a course; or</li>
                        <li>Termination of your use of the SiFive Learn Site and/or Training.</li>
                    </ul>
                    <p>No refunds will be issued in the case of any corrective action for such violations.</p>
                    <p>Honor Code or SiFive Learn Site Terms violations will be determined at the sole discretion of SiFive. You will be notified if a violation has been determined and you will be informed of the corresponding action to be taken as a result of the violation.</p>
                </section>
            </div>
            `;

    }

}

export { TermsView };
