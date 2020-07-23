
import {
    html, customElement, property, eventOptions,
} from 'lit-element';

import DOMUtils from 'Utils/DOMUtils';

import { ROLES } from 'Constants/User';

import {
    getTeamID,
} from 'Selectors/Team';
import {
    getInvitesByTeam,
    shouldFetchInvites,
} from 'Selectors/Invite';
import InviteActions from 'Actions/Invite';
import TeamActions from 'Actions/Team';

import { ConnectedComponent } from 'Components/Global/ConnectedComponent';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifiveButton';

import { inviteCodesFactory } from './Factories/inviteCodes';
import { csvImportFactory } from './Factories/csvImport';

import { getStyles } from './Styles';

/**
 * TeamInvite LitElement
 * template
 */
@customElement('team-invite')
class TeamInvite extends ConnectedComponent {

    @property({ type: Boolean })
    isAddingNewUser = false;

    @property({ type: Array })
    invites = [];

    @property({ type: Array })
    fileEntries = [];

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

        const roles = [
            ROLES.MANAGER.LABEL,
            ROLES.ASSESSOR.LABEL,
            ROLES.LEARNER.LABEL,
        ];

        return html`
            <!-- TeamInvite -->
            <div class="grid-container">
                <section class="header">
                    <h3>Invite users</h3>
                    <p>Use the form below to invite new users to the team, or search excisting users from the platform and add them to your team.</p>
                </section>
                <section class="invite-user">
                    <div class="invite-user-header">
                        <sifive-input placeholder="Email Address"></sifive-input>
                        <sifive-dropdown label="Role"
                            .items=${roles}
                            @input=${this.onRoleSelectInput}></sifive-dropdown>
                        <sifive-button
                            label="Send Invite"
                            @click=${this.onSendInviteClick}>
                            <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                        </sifive-button>
                    </div>
                </section>
                ${csvImportFactory(this)}
                ${inviteCodesFactory(this.invites, this.isFetchingInvites,
                    ::this.archiveInvite, ::this.restoreInvite)}
            </div>`;

    }

    /**
     * Callback for component updates
     * @param {Map} changedProps
     */
    updated(changedProps) {

        if (this.shouldFetchInvites) {

            this.store.dispatch(InviteActions.getInviteList());

        }

    }

    /**
     *
     * @param  {Object} state
     */
    stateChanged(state) {

        this.teamID = getTeamID(state);
        this.invites = getInvitesByTeam(state, this.teamID);

        this.shouldFetchInvites = shouldFetchInvites(state);
        this.isFetchingInvites = shouldFetchInvites(state);

    }

    /**
     * Validate email
     * @param  {String} email
     * @return {Boolean}
     */
    isEmailValid(email) {

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailReg.test(email);

    }

    /**
     * Send the email invite
     * @param  {String} email
     * @param  {String} role
     * @return {Promise}
     */
    sendInviteEmail(email, role) {

        return this.store.dispatch(
            TeamActions.createTeamInvite(this.teamID, { email, role })
        );

    }

    /**
     * Send multiple invites to entries from file
     */
    sendFileInvites() {

        if (this.fileEntries && this.fileEntries.length > 0) {

            const promises = this.fileEntries.map((entry, index) => {

                if (this.isEmailValid(entry.email)) {

                    return this.sendInviteEmail(
                        entry.email, entry.role || ROLES.LEARNER.API)
                        .then((response) => {

                            entry.success = true;

                        }, (error) => {

                            entry.success = false;

                        });

                }

                entry.success = false;

                return Promise.reject(new Error('Invalid Email'));

            });

            Promise.allSettled(promises).then(() => {

                this.fileEntries = [
                    ...this.fileEntries,
                ];

                window.setTimeout(() => this.fileEntries = [], 2000);

            });

        }

    }

    /**
     * Archive an invite
     * @param {String} inviteID
     */
    archiveInvite(inviteID) {

        this.store.dispatch(InviteActions.archiveInvite(inviteID));

    }

    /**
     * Restore an invite
     * @param {String} inviteID
     */
    restoreInvite(inviteID) {

        this.store.dispatch(InviteActions.restoreInvite(inviteID));

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSendInviteClick(event) {

        const $email = DOMUtils.q('.invite-user sifive-input', this.shadowRoot);

        if (this.isEmailValid($email.value)) {

            this.sendInviteEmail($email.value, this.role || ROLES.LEARNER.API)
                .then((invite) => {

                    const $email = DOMUtils.q('.invite-user sifive-input', this.shadowRoot);
                    $email.value = '';

                });

        }

    }

    /**
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onRoleSelectInput(event) {

        this.role = ROLES[event.detail.value].API;

    }

    /**
     *
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDownloadTemplateClick(event) {

        const csv = [
            'max.musterman@internet.com',
            'daniel.thingy@moodle.com',
            'andrea.changyyy@woohoo.com',
            'kathrine.winsburg@eymazon.com',
            'random.cheezuz@itsatrap.com',
        ].join('\n');

        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);

        a.href = window.URL.createObjectURL(new Blob([csv]));
        a.setAttribute('download', 'sifive_template.csv');
        a.click();

        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);

    }

}

export { TeamInvite };
