import {
    html,
} from 'lit-element';

import 'Components/User/UserSummaryRow';
import 'Components/Global/SifivePagination';
import 'Components/Global/SifiveInput';
import 'Components/Global/SifiveButton';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SVGIcon';

export const userFactory = (user, courses) => {

    let progresses = [];

    if (courses && user.progress) {

        progresses = courses.map((course) => {

            const courseProgress = user.progress.find(courseProgress =>
                courseProgress.id === course.id);


            if (typeof courseProgress !== 'undefined' && courseProgress !== null) {

                return {
                    ...course,
                    progress: courseProgress.progress,
                };

            }

            return {
                ...course,
                progress: 0,
            };

        }).sort((a, b) => {

            return b.progress - a.progress;

        });

    }

    return html`
        <user-summary-row .user=${user} .progresses=${progresses}>
            <div slot="actions"></div>
        </user-summary-row>`;

};

export const memberListFactory = (team, courses, members, onInviteUserCick) => {

    if (!members) {

        return '';

    }

    const memberContent = members.map(user => userFactory(user, courses));

    return html`
    <section class="members">
        <div class="members-header">
            <div>
                <h5>Team Members</h5>
                ${members.length} users
            </div>
            <div class="filters">
                <sifive-input placeholder="Search members">
                    <svg-icon slot="icon" src="assets/images/icons/search.svg"></svg-icon>
                </sifive-input>
                <sifive-dropdown label="Add Filter" .items="${[]}"></sifive-dropdown>
                <sifive-dropdown label="Sort by" .items="${[]}"></sifive-dropdown>
            </div>
        </div>
        <sifive-pagination class="member-list"
            .items=${memberContent}
            .pageLength=${5}>
            <div slot="actions" class="members-controls">
                <sifive-button label="Invite Users"
                    @click=${onInviteUserCick}>
                </sifive-button>
            </div>
        </sifive-pagination>
    </section>`;

};
