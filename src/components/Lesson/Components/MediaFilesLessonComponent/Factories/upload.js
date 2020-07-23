
import {
    html,
} from 'lit-element';

import 'Components/Media/MediaAccordion';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveUpload';

export const uploadFactory = (context) => {

    let uploadedFileList;

    if (context.uploaded.length > 0) {

        const mediaAccordions = context.uploaded
            .map((uploadedFile) => {

                const media = Object.values(context.media)
                    .find(file => file.id === uploadedFile);

                return media ? html`
                    <media-accordion open
                        .media=${media}></media-accordion>`: '';

            });

        uploadedFileList = html`
            <div class="uploaded-list">
                ${mediaAccordions}
            </div>`;

    }

    return html`
        <div class="wrapper uploading">
            <div class="top-container">
                <div class="back-link" @click="${context.onBackClick}">
                    <svg-icon slot="icon" src="assets/images/icons/arrow_left.svg"></svg-icon>
                    Back to Search
                </div>
            </div>
            ${uploadedFileList}
            <div class="upload-container">
                <sifive-upload multiple accept="image/*, video/*, audio/*, .pdf"
                    ?pending=${context.uploadPending}
                    @change=${context.onUploadUpdate}></sifive-upload>
                Recommended file formats: mp4, mp3, wav, png, jpg, gif, pdf and zip files
            </div>
        </div>`;

};
