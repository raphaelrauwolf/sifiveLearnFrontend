import {
    html,
} from 'lit-element';

import { ROLES } from 'Constants/User';

import 'Components/Global/SifivePagination';
import 'Components/Global/SifiveButton';

export const courseStatsFactory = (
        courses = [], teamMembers = [], onAssignCourseClick) => {

    const courseStats = courses.map((course) => {

        const assignedUsers = teamMembers.filter((user) => {

            return user.progress && user.progress.find((courseProgress) => {

                return courseProgress.id === course.id;

            });

        });

        const graduatedUsers = assignedUsers.filter((user) => {

            return user.progress.find((courseProgress) => {

                return courseProgress.id === course.id;

            }).progress >= 100;

        });

        const activeTimeframe = 1000 * 60 * 60 * 24 * 7;
        const activeUsers = assignedUsers.filter((user) => {

            return ROLES[user.permissions.role] === ROLES.LEARNER &&
                new Date() - new Date(user.lastActivity) < activeTimeframe;

        });

        const activeAssessors = assignedUsers.filter((user) => {

            return ROLES[user.permissions.role] === ROLES.ASSESSOR &&
                new Date() - new Date(user.lastActivity) < activeTimeframe;

        });

        return html`
            <div class="course">
                <div class="course-header">
                    <a href="/course/${course.id}"><b>${course.name}</b></a>
                </div>
                <div class="course-data">
                    <div class="course-data-card">
                        <div class="mid-data">${graduatedUsers.length}</div>
                        <div>
                            <b>Students Graduated</b><br />
                            &nbsp;
                        </div>
                    </div>
                    <div class="course-data-card">
                        <div class="mid-data">${activeUsers.length}</div>
                        <div>
                            <b>Active Students</b><br />
                            &nbsp;
                        </div>
                    </div>
                    <div class="course-data-card">
                        <div class="mid-data">${activeAssessors.length}</div>
                        <div>
                            <b>Active Assessors</b><br />
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>`;

    });

    return html`
    <section class="course-stats">
        <h5>Assigned Courses</h5>
        <sifive-pagination
            .pageLength=${4}>${courseStats}</sifive-pagination>
        <div class="course-actions">
            <sifive-button label="Assign Course" @click="${onAssignCourseClick}"></sifive-button>
        </div>
    </section>`;

};
