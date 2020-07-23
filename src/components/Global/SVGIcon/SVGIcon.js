
import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import Cache from 'Utils/Cache';

import { getStyles } from './Styles';

/**
 * SVGIcon LitElement
 * template
 */
@customElement('svg-icon')
class SVGIcon extends LitElement {

    @property({ type: String, attribute: true })
    src = '';

    @property({ type: Boolean })
    loaded = false;

    @property({ type: String })
    content = '';


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

        let content = '';

        if (this.loaded && this.content) {

            content = unsafeHTML(this.content);

        }

        return html`
            <!-- SVGIcon Component -->
            ${content}`;

    }

    /**
     * Load svg on first update
     * @param {Map} changedProps
     */
    firstUpdated(changedProps) {

        if (!this.loaded && this.src.length > 0) {

            if (!Cache.isInCache(this.src)) {

                this.loadSVG();

            }

            Cache.add(this.src, (content) => {

                this.content = content;
                this.loaded = true;

            });

        }

    }

    /**
     *
     */
    loadSVG() {

        fetch(this.src, {})
            .then((response) => {

                if (response.status <= 400) {

                    return response.text();

                }

            })
            .then((text) => {

                Cache.finish(this.src, text);

            });

    }

}

export { SVGIcon };
