
import {
    html,
} from 'lit-element';

import 'Components/Global/EditableElements';

export const namingFactory =
    (
            lessonName, lessonDescription,
            onNameInput, onDescriptionInput,
    ) => {

        return html`
            <div class="name-container">
                <div class="grid-container">
                    <editable-h3
                        placeholder="Give your lesson a name"
                        .value=${lessonName}
                        @input=${onNameInput}></editable-h3>
                </div>
            </div>
            <div class="description-container">
                <div class="grid-container">
                    <editable-h4
                        placeholder="Write a short description of the lesson"
                        .value=${lessonDescription}
                        @input=${onDescriptionInput}></editable-h4>
                </div>
            </div>`;

    };
