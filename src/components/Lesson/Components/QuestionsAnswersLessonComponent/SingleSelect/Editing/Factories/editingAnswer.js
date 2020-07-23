
import {
    html,
} from 'lit-element';

export const editingAnswer = (context, answer, index) => {

    const addLink = html`
    <div class="add-link" @click="${context.onAddClick}">
        <svg-icon src="assets/images/icons/add.svg"></svg-icon>
        Add Answer
    </div>`;

    const deleteDropCallback = (event) => {

        event.stopPropagation();
        context.deleteAnswer(answer.id);

    };

    const sortedCallback = (event) => {

        event.stopPropagation();
        context.sortAnswers(index, event.detail.sortedArray);

    };

    return html`
        <sifive-sortable
            sortGroup="course-creation-single-select-answers"
            handleSelector="sifive-round-button"
            @delete-drop="${deleteDropCallback}"
            @sorted="${sortedCallback}">

            <div class="single-select-answer-setting row">

                <div class="row-left">
                    <sifive-round-button>
                        <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                    </sifive-round-button>
                    <div class="row-label">Answer</div>
                </div>

                <div class="row-right">
                    <div class="answer-control-wrapper">
                        <rich-text-editor
                            placeholder="Write option"
                            .content="${answer.text}"
                            @change="${event => context.updateAnswerText(answer.id, event.detail.html)}"></rich-text-editor>
                        <div class="answer-controls">
                            ${index === context.answers.length - 1 ?
                            addLink : ''}
                            <div class="flex"></div>
                            <sifive-radio class="correct-radio" label="Correct Answer"
                                @checked="${answer.correct}"></sifive-radio>
                        </div>
                    </div>
                </div>

                <div class="single-select-answer-dragging">
                    <sifive-round-button>
                        <svg-icon slot="icon" src="assets/images/icons/reorder.svg"></svg-icon>
                    </sifive-round-button>
                    <div>Answer</div>
                </div>
            </div>
        </sifive-sortable>`;

};
