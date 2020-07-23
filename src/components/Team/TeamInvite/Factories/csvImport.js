
import {
    html,
} from 'lit-element';

import { ROLES } from 'Constants/User';

import 'Components/Global/SifiveUpload';

export const csvImportFactory = (context) => {

    const roles = [
        ROLES.MANAGER.LABEL,
        ROLES.ASSESSOR.LABEL,
        ROLES.LEARNER.LABEL,
    ];

    const parseFile = (file) => {

        const lines = file.split(/\r\n|\n/);

        return lines.map((email) => {

            return {
                email,
                role: ROLES.LEARNER.API,
            };

        });

    };

    const onUploadChange = (event) => {

        const fileReader = new FileReader();
        fileReader.onload = () => {

            context.fileEntries = parseFile(fileReader.result);

        };
        fileReader.readAsText(event.detail.files[0]);

    };

    const onSendInvitesClick = () => {

        context.sendFileInvites();

    };

    let fileEntries;
    if (context.fileEntries && context.fileEntries.length > 0) {

        const rows = context.fileEntries.map((entry) => {

            const onRoleSelect = (event) => {

                entry.role = ROLES[event.detail.value].API;

                context.fileEntries = [
                    ...context.fileEntries,
                ];

            };

            const activeIndex = roles.indexOf(ROLES[entry.role].LABEL);

            let cssClass = '';

            if (entry.success === true) {

                cssClass = 'success';

            } else if (entry.success === false) {

                cssClass = 'error';

            }

            return html`
                <tr class="csv-import-item ${cssClass}">
                    <td class="role">
                        <sifive-dropdown label="Role"
                            .items=${roles}
                            .activeIndex=${activeIndex}
                            @input=${onRoleSelect}></sifive-dropdown>
                    </td>
                    <td class="email">
                    ${entry.email}
                    </td>
                </tr>`;

        });

        fileEntries = html`
        <table class="csv-import-list">
            <tbody>
                ${rows}
            </tbody>
        </table>
        <div class="csv-import-send-container">
            <sifive-button label="Send Invites"
                @click=${onSendInvitesClick}>
                <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
            </sifive-button>
        </div>`;

    }

    return html`
    <section class="csv-import">
        <div class="csv-import-header">
            <h5>Import CSV</h5>
            <div class="download-link"
                @click=${context.onDownloadTemplateClick}>
                <svg-icon src="assets/images/icons/download.svg"></svg-icon>
                Download template CSV
            </div>
        </div>
        <sifive-upload accept="text/plain, .csv, .txt"
            @change=${onUploadChange}></sifive-upload>
        ${fileEntries}
    </section>`;

};
