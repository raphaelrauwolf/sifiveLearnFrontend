import {
    html,
} from 'lit-element';

import { ROLES } from 'Constants/User';

import 'Components/Global/SVGIcon';
import 'Components/Global/TimeStamp';
import 'Components/Global/SifiveLoader';


export const inviteCodesFactory = (invites, isFetchingInvites,
        archiveInvite, restoreInvite) => {

    if (isFetchingInvites) {

        return html`
        <section class="invite-codes">
            <sifive-loader></sifive-loader>
        </section>`;

    }

    const inviteCodes = invites.map((invite) => {

        const createDate = new Date(invite.createdAt);
        const day = createDate.getDate().toString().padStart(2, '0');
        const month = createDate.toLocaleString('default', { month: 'long' }).substr(0, 3).toUpperCase();
        const year = createDate.getFullYear();
        const timestamp = `${day} ${month} ${year}`;

        const role = ROLES[invite.role];

        const onCopy = () => {};
        const onArchiveInvite = () => archiveInvite(invite.id);
        const onRestoreInvite = () => restoreInvite(invite.id);

        let archiveToggle = html`
            <div class="archive-toggle" @click=${onArchiveInvite}>
                <b>Archive</b>
            </div>`;

        if (invite.Updating) {

            archiveToggle = html`
                <div class="updating-toggle">
                    ...
                </div>`;

        } else if (invite.archivedAt) {

            archiveToggle = html`
                <div class="restore-toggle" @click=${onRestoreInvite}>
                    <b>Restore</b>
                </div>`;

        }

        return html`
            <tr class="invite-code-item ${invite.isUsed ? 'used' : ''}">
                <td class="invite-code">
                    <div class="code-copy" @click=${onCopy}>
                        ${invite.code}
                        <svg-icon src="assets/images/icons/copy.svg"></svg-icon>
                    </div>
                </td>
                <td class="created">
                    Created <time-stamp text="${timestamp}"></time-stamp>
                </td>
                <td class="used">
                    ${invite.isUsed ? 'Used' : 'Not used'}
                </td>
                <td class="role">
                    ${role.LABEL}
                </td>
                <td class="email">
                    ${invite.email}
                </td>
                <td class="archive">
                    ${archiveToggle}
                </td>
            </tr>`;

    });

    return html`
    <section class="invite-codes">
        <div class="invite-codes-header">
            <h5>Invites Created</h5>
        </div>
        <table class="invite-code-list">
            <tbody>
                ${inviteCodes}
            </tbody>
        </table>
    </section>`;

};
