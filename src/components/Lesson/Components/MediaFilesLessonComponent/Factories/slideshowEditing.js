
import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

import 'Components/Global/SifiveSortable';
import 'Components/Global/SVGIcon';

export const slideshowFactory = (data, storeMedia, requestSingleMedia,
        selectedMedia, sortMedia, deselectMedia) => {

    if (
        !storeMedia || Object.values(storeMedia).length <= 0 ||
        !selectedMedia || selectedMedia.length <= 0) {

        return '';

    }

    const storeMediaList = Object.values(storeMedia);

    const mediaList = selectedMedia.map((mediaUUID) => {

        const media = storeMediaList.find(storeMedia =>
            storeMedia.uuid === mediaUUID);

        if (typeof media === 'undefined') {

            // request media
            requestSingleMedia(mediaUUID);

        }

        return media;

    }).filter(media => typeof media !== 'undefined');

    console.log(mediaList);

    const images = repeat(
        mediaList,
        media => media.id,
        (media, index) => {

            const onDeleteDrop = () => deselectMedia(media);

            const onSorted = (event) => {

                const { startIndex, targetIndex } = event.detail;

                sortMedia(media, startIndex, targetIndex);

            };

            return html`
                <sifive-sortable
                    .sortGroup=${'media-files-lesson-component-edit'}
                    .handleSelector=${'img'}
                    @delete-drop=${onDeleteDrop}
                    @sorted=${onSorted}>
                    <div>
                        <div class="slideshow-item">
                            <img src="${media.signedPath}" alt="${media.originalFilename}">
                            <div class="slideshow-item-name">${media.originalFilename}</div>
                        </div>
                        <div class="slide-dragging">
                            <svg-icon src="assets/images/icons/resources.svg"></svg-icon>
                        </div>
                    </div>
                </sifive-sortable>`;

        },
    );

    return html`
        <div class="slideshow-selection">
            <h5>Selected Images</h5>
            <div class="slideshow-grid">
                ${images}
            </div>
        </div>`;

};
