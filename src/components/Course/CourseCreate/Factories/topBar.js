
import {
    html,
} from 'lit-element';

import 'Components/Global/TopBar';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveDropzone';

export const topBarFactory = (onBackClick, needDeleteDrop = false) => {

    let deleteDrop = '';

    if (needDeleteDrop) {

        deleteDrop = html`
            <sifive-dropzone class="remove-drop" dropEventName="delete-drop">
                <div>Drag & drop to remove</div>
                <sifive-round-button>
                    <svg-icon slot="icon" src="assets/images/icons/trash.svg"></svg-icon>
                </sifive-round-button>
            </sifive-dropzone>`;

    }

    return html`
        <top-bar visible>
            <div slot="content" class="top-bar-content grid-container">
                <div class="back-link" @click="${onBackClick}">
                    <svg-icon src="assets/images/icons/arrow_left.svg"></svg-icon>Back
                </div>
                ${deleteDrop}
            </div>
        </top-bar>`;

};
