import {
    html,
} from 'lit-element';

import 'Components/Course/CourseProgressBar';
import 'Components/Global/SifiveButton';
import 'Components/Global/SVGIcon';

export const headerFactory = (progress, onStartButtonClick, ) => {

    let progressBar;

    if (progress > 0) {

        progressBar = html`
            <course-progress-bar
                percent="${progress}">
            </course-progress-bar>`;

    }

    const startButton = html`
        <div class="start-button-container">
            <sifive-button class="start-button"
                label="${progress > 0 ? 'Continue' : 'Start Course'}"
                @click=${onStartButtonClick}>
                <svg-icon slot="icon" src="assets/images/icons/arrow_right.svg"></svg-icon>
            </sifive-button>
        </div>`;

    return html`
        ${progressBar}
        ${startButton}`;

};
