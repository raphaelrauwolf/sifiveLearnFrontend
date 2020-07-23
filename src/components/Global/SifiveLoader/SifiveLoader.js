
import {
    LitElement, html, customElement,
} from 'lit-element';

import 'Components/Global/SVGIcon';

import { getStyles } from './Styles';

/**
 * SifiveLoader LitElement
 * template
 */
@customElement('sifive-loader')
class SifiveLoader extends LitElement {

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

        return html`
            <svg-icon src="assets/images/icons/logo.svg"></svg-icon>`;

    }

}

export { SifiveLoader };
