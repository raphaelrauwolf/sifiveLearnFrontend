
import {
    html,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';


export const answeringAnswer = (context, answer, index, result) => {

    const onInput = (event) => {

        context.userAnswers[index] = event.target.checked;
        context.correct = null;
        context.results = [];

    };

    return html`
        <div class="answer">
            <sifive-radio
                @input=${onInput}
                ?red=${result === false}
                ?green=${result}
                ></sifive-radio>
            <div>${unsafeHTML(answer.text)}</div>
        </div>`;

};
