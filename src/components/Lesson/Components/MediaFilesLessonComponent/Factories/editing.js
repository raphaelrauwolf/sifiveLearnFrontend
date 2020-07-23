
import {
    html,
} from 'lit-element';

import 'Components/Media/MediaAccordion';
import 'Components/Global/SVGIcon';
import 'Components/Global/SifiveLoader';
import 'Components/Global/SifiveDropdown';
import 'Components/Global/SifivePagination';

import { slideshowFactory } from './slideshowEditing';

export const editingFactory = (context) => {

    const types = [
        'Video',
        'Slideshow',
        'PDF',
    ];

    // file list
    let filteredMedia;

    if (context.data.type) {

        const mediaList = Object.values(context.media);

        filteredMedia = mediaList.filter((media) => {

            const slideshow = context.data.type === 'Slideshow' && media.contentType.indexOf('image') === 0;
            const video = context.data.type === 'Video' && media.contentType.indexOf('video') === 0;
            const pdf = context.data.type === 'PDF' && media.contentType.indexOf('application/pdf') === 0;

            return slideshow || video || pdf;

        }).map((media, index) => {

            const onSelect = (event) => {

                const { media, selected } = event.detail;

                if (selected) {

                    context.selectMedia(media);

                } else {

                    context.deselectMedia(media);

                }

            };

            const selected =
                context.data.media.indexOf(media.uuid) >= 0;

            return html`<media-accordion
                .media=${media}
                ?selected=${selected}
                @select=${onSelect}
                selectable></media-accordion>`;

        });

        filteredMedia = html`
            <sifive-pagination .pageLength=${10}>
                ${filteredMedia}
            </sifive-pagination>`;

    }

    if (context.data.type && context.isFetching) {

        filteredMedia = html`<sifive-loader></sifive-loader>`;

    }

    // footer
    let footer;

    if (context.data.type) {

        footer = html`
        <div class="footer">
            <div>
                Did not find what you were looking for?
                <div class="upload-link" @click="${context.onUploadClick}">
                    <svg-icon slot="icon" src="assets/images/icons/upload.svg"></svg-icon>
                    Upload New Media File
                </div>
            </div>
        </div>`;

    }

    // Additional typespecific ui
    let additionalUi;

    if (context.data.type === 'Slideshow') {

        additionalUi = slideshowFactory(
            context.data, context.media, ::context.requestSingleMedia,
            context.selectedMedia,
            ::context.sortMedia, ::context.deselectMedia);

    }

    // Type Dropdown
    let typeDropdown = html`
        <sifive-dropdown label="Select Type"
            .items=${types}
            @input=${context.onTypeInput}></sifive-dropdown>`;

    if (context.data.type) {

        typeDropdown = html`
            <sifive-dropdown label="Select Type"
                .items=${types}
                .activeIndex=${types.indexOf(context.data.type)}
                @input=${context.onTypeInput}></sifive-dropdown>`;

    }

    return html`
        <div class="wrapper editing">
            <div class="top-container">
                ${typeDropdown}
            </div>
            ${additionalUi}
            <div class="file-list">
                ${filteredMedia}
            </div>
            ${footer}
        </div>`;


};

/*
const filters = [
    'Video',
    'Image',
    'PDF',
    'Created by me',
    'Created by SiFive',
];

content = html`
    <div class="wrapper editing">
        <div class="top-container">
            <div class="search-container">
                <sifive-field placeholder="Search videos, images, audio and PDF documents"></sifive-field>
            </div>
            <div class="button-container">
                <sifive-button label="Continue With Selected Files" @click="${this.onCreateModuleClick}">
                    <svg-icon slot="icon" src="assets/images/icons/add.svg"></svg-icon>
                </sifive-button>
                <sifive-dropdown label="Add Filter" .items="${filters}"></sifive-dropdown>
            </div>
        </div>
        <div class="header">
            <h5>Media Files</h5>
            <div>
                <div class="select-link" @click="${this.onDeselectAllClick}">Deselect All</div>
                <div class="select-link" @click="${this.onSelectAllClick}">Select All</div>
            </div>
        </div>
        <div class="file-list">
            ${this.media.map((media, index) => {

                return html`<media-accordion .media=${media} selectable></media-accordion>`;

            })}
        </div>
        <div class="footer">
            <div>
                Did not find what you were looking for?
                <div class="upload-link" @click="${this.onUploadClick}">
                    <svg-icon slot="icon" src="assets/images/icons/upload.svg"></svg-icon>
                    Upload New Media File
                </div>
            </div>

            <div class="pagination">
                <div class="page active">1</div>
                <div class="page">2</div>
                <div class="page">3</div>
                <div class="page">4</div>
                ...
                <div class="page">17</div>
            </div>
        </div>
    </div>`;
*/
