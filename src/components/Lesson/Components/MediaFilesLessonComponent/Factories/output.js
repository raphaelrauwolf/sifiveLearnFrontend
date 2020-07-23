
import {
    html,
} from 'lit-element';

import 'Components/Global/SifiveVideo';
import 'Components/Global/SifivePDF';
import 'Components/Global/SifiveSlideshow';

export const outputFactory = (componentData, componentMedia) => {

    // check if all media is loaded
    if (componentData.media.find(media => typeof media !== 'object')) {

        return '';

    }

    if (componentData.type === 'Video') {

        const videoURL = componentData.media[0].signedPath;

        return html`
            <div class="wrapper video">
                <sifive-video src="${videoURL}"></sifive-video>
            </div>`;

    } else if (componentData.type === 'PDF') {

        const pdfURL = componentData.media[0].signedPath;

        return html`
            <div class="wrapper pdf">
                <sifive-pdf src="${pdfURL}"></sifive-pdf>
            </div>`;

    } else {

        return html`
            <div class="wrapper slideshow">
                <sifive-slideshow .media=${componentData.media}></sifive-slideshow>
            </div>`;

    }

};
