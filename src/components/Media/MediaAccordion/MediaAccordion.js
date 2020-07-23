
import {
    LitElement, html, customElement, property, eventOptions,
} from 'lit-element';

import 'Components/Global/SifiveCheckbox';
import 'Components/Global/SVGIcon';
import 'Components/Global/TimeStamp';
import 'Components/Global/SifiveVideo';
import 'Components/Global/SifivePDF';
import 'Components/Global/SifiveImage';

import { getStyles } from './Styles';

/**
 * MediaAccordion LitElement
 * template
 */
@customElement('media-accordion')
class MediaAccordion extends LitElement {

    @property({ type: Object })
    media = {}

    @property({ type: Boolean })
    openable = false;

    @property({ type: Boolean })
    sortable = false;

    @property({ type: Boolean })
    addable = false;

    @property({ type: Boolean })
    selectable = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    open = false;

    @property({ type: Boolean, attribute: true, reflect: true })
    selected = false;


    /**
     * @return {String} element styles
     */
    static get styles() {

        return getStyles(this);

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        let content;

        if (this.media.contentType.indexOf('image') === 0) {

            content = html`<img src="${this.media.signedPath}" alt="${this.media.originalFilename}" />`;

        } else if (this.media.contentType.indexOf('video') === 0) {

            content = html`<sifive-video src="${this.media.signedPath}"></sifive-video>`;

        } else if (this.media.contentType.indexOf('application/pdf') === 0) {

            content = html`<sifive-pdf src="${this.media.signedPath}"></sifive-pdf>`;

        }

        const creator = this.media.creator;
        const creatorName = `${creator.firstname} ${creator.lastname}`;

        const createDate = new Date(this.media.createdAt);
        const day = createDate.getDate().toString().padStart(2, '0');
        const month = createDate.toLocaleString('default', { month: 'long' }).substr(0, 3).toUpperCase();
        const year = createDate.getFullYear();
        const timestamp = `${day} ${month} ${year}`;

        return html`
            <!-- MediaAccordion Component -->
            <div class="wrapper">
                <div class="info">
                    <div class="header">
                        <h5>
                            <a href="/media/${this.media.id}">
                                <svg-icon src="assets/images/icons/lesson.svg" alt="Lesson Icon"></svg-icon>
                                ${this.media.originalFilename}
                            </a>
                        </h5>
                    </div>
                    <div class="content">
                        ${content}
                    </div>
                </div>
                <div classw="details">
                    <div class="header">
                        <div @click=${this.onDetailsToggleClick} class="details-toggle">
                            File Details
                            <div class="divider"></div>
                            ${this.open ?
                                html`<svg-icon src="assets/images/icons/arrow_up.svg"></svg-icon>` :
                                html`<svg-icon src="assets/images/icons/arrow_down.svg"></svg-icon>`}
                        </div>
                    </div>
                    <div class="content details-list">
                        <div class="detail">
                            <a href="/media/${this.media.id}">Uploaded <time-stamp text="${timestamp}"></time-stamp></a>
                        </div>
                        <div class="detail">
                            <a href="/user/${creator.id}">Created by ${creatorName}</a>
                        </div>
                    </div>
                </div>
                <!--
                <div class="courses">
                    <div class="header">
                        <div class="courses-headline">
                            <div class="counter">2</div> Courses
                        </div>
                    </div>
                    <div class="content">
                        <ul class="course-list">
                            <li><a href="/course/1" class="course">Blabla blue</a></li>
                            <li><a href="/course/2" class="course">Blabla blue</a></li>
                        </ul>
                    </div>
                </div>
                -->
                <div class="actions">
                    ${this.selectable ?
                        html`<sifive-checkbox @input=${this.onSelectInput} ?checked=${this.selected}></sifive-checkbox>` : ''}
                </div>
            </div>`;

    }

    /**
     * Expand click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onDetailsToggleClick(event) {

        this.open = !this.open;

    }

    /**
     * Add lesson click callback
     * @param {Object} event
     */
    @eventOptions({ passive: true })
    onSelectInput(event) {

        event.stopPropagation();

        this.selected = event.target.checked;

        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                media: this.media,
                selected: this.selected,
            },
            bubbles: true,
            composed: true,
        }));

    }

}

export { MediaAccordion };
