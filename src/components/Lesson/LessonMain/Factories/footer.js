
import {
    html,
} from 'lit-element';

import 'Components/Global/SVGIcon';

export const footerFactory = (
        context, checked, questionCount,
        totalCount, correctCount, nextLink) => {

    const onSubmitClick = event => context.checkAnswers();
    const onEmptyLessonContinue = event => context.gotoNextLesson();
    const onContinueClick = event => context.gotoNextLesson();
    const onResolveClick = event => context.scrollToWrongAnswer();

    const resolveButton = html`
    <div class="resolve" @click=${onResolveClick}>
        <svg-icon src="assets/images/icons/arrow_up.svg"></svg-icon>
        <b>Resolve</b>
    </div>`;

    const submitButton = html`
    <div class="submit" @click=${onSubmitClick}>
        <b>Submit</b>
        <svg-icon src="assets/images/icons/arrow_right.svg"></svg-icon>
    </div>`;

    const continueButton = html`
    <div class="continue" @click=${onContinueClick}>
        <b>Continue</b>
        <svg-icon src="assets/images/icons/arrow_right.svg"></svg-icon>
    </div>`;

    if (questionCount <= 0) {

        return html`
            <footer class="continue">
                <div class="continue" @click=${onEmptyLessonContinue}>
                    <div class="grid-container">
                        <b>Continue</b>
                        <svg-icon src="assets/images/icons/arrow_right.svg"></svg-icon>
                    </div>
                </div>
            </footer>`;

    }

    if (!checked) {

        return html`
        <footer class="submit" @click=${onSubmitClick}>
            <div class="grid-container">
                <div class="label">Submit Answers</div>
                <svg-icon src="assets/images/icons/arrow_right.svg"></svg-icon>
            </div>
        </footer>`;

    } else {

        if (correctCount <= totalCount * .5) {

            return html`
                <footer class="result ouch">
                    <div class="grid-container">
                        ${resolveButton}
                        <div class="result-text">
                            Ouch! You got ${totalCount - correctCount} out of ${totalCount} wrong
                        </div>
                        ${submitButton}
                    </div>
                </footer>`;

        } else if (correctCount < totalCount) {

            return html`
                <footer class="result almost">
                    <div class="grid-container">
                        ${resolveButton}
                        <div class="result-text">
                            Almost! You got ${correctCount} out of ${totalCount} correct
                        </div>
                        ${submitButton}
                    </div>
                </footer>`;

        } else {

            return html`
                <footer class="result perfect">
                    <div class="grid-container">
                        <div class="result-text">
                            Perfect! You got ${totalCount} out of ${totalCount} correct
                        </div>
                        ${continueButton}
                    </div>
                </footer>`;

        }

    }

};
