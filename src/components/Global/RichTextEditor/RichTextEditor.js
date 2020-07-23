
import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import _debounce from 'lodash.debounce';

import Quill from 'quill';
import { SifiveImageDrop } from './SifiveImageDrop';
import { SifiveImageResize } from './SifiveImageResize';
import { QuillResourceEmbed } from './QuillResourceEmbed';
import {
    getNativeRange, hasFocus, setNativeRange, update, handleDragging,
} from './QuillFix';

Quill.register('modules/imageResize', SifiveImageResize);
Quill.register('modules/imageDrop', SifiveImageDrop);
Quill.register(QuillResourceEmbed);

import DOMUtils from 'Utils/DOMUtils';

import 'Components/Global/SifiveResource';

import { getStyles } from './Styles';

/**
 * RichTextEditor LitElement
 * template
 */
@customElement('rich-text-editor')
class RichTextEditor extends LitElement {

    @property({ type: String })
    content = '';

    @property({ type: String })
    placeholder = '';

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
            <!-- RichTextEditor Component -->
            <div class="editor">${unsafeHTML(this.content)}</div>
        `;

    }

    /**
     * Check if it is first update
     * @param {Object} changedProps
     * @return {Boolean}
     */
    shouldUpdate(changedProps) {

        if (changedProps.has('content') && this.quill) {

            this.clear();
            this.setHTML(this.content);

        }

        return changedProps.get('content') === undefined;

    }

    /**
     * Setup editor
     * @param {Object}changedProps
     */
    firstUpdated(changedProps) {

        const $editor = DOMUtils.q('.editor', this.shadowRoot);

        this.quill = new Quill($editor, {
            theme: 'snow',
            placeholder: this.placeholder,
            modules: {
                imageDrop: true,
                imageResize: {
                    updateCallback: _debounce(() => {

                        this.emitChange();

                    }, 1000),
                },
                toolbar: {
                    container: [
                        [{ font: [] }, { header: [] }],
                        ['color', 'background'],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                    handlers: {
                        image: () => {

                            let fileInput = this.quill.container.querySelector('input.ql-image[type=file]');

                            if (fileInput == null) {

                                fileInput = document.createElement('input');
                                fileInput.setAttribute('type', 'file');
                                fileInput.setAttribute(
                                    'accept',
                                    'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
                                );
                                fileInput.classList.add('ql-image');
                                fileInput.addEventListener('change', () => {

                                    if (fileInput.files != null &&
                                        fileInput.files[0] != null) {

                                        const file = fileInput.files[0];
                                        const reader = new FileReader();

                                        reader.onload = (event) => {

                                            const base64 = event.target.result;

                                            const selection =
                                                this.quill.getSelection(true);

                                            this.quill.insertText(selection.index, '\n', Quill.sources.USER);
                                            this.quill.insertEmbed(selection.index, 'sifiveresource', {
                                                quill: this.quill,
                                                callback: () =>
                                                    this.emitChange(),
                                                attributes: {},
                                                properties: {
                                                    'src': base64,
                                                    'needUpload': true,
                                                    'file': file,
                                                    'type': file.type,
                                                    'name': file.name,
                                                    'uuid': '',
                                                },
                                            });

                                            this.quill.setSelection(
                                                selection.index + 2,
                                                Quill.sources.SILENT);

                                            this.quill.insertText(
                                                selection.index,
                                                '\n',
                                                Quill.sources.USER);

                                        };

                                        reader.readAsDataURL(file);

                                    }

                                });

                                this.quill.container.appendChild(fileInput);

                            }

                            fileInput.click();

                        },
                    },
                },
            },
        });

        this.quill.selection.context = this.shadowRoot;
        this.quill.selection.getNativeRange = getNativeRange;
        this.quill.selection.setNativeRange = setNativeRange;
        this.quill.selection.hasFocus = hasFocus;
        this.quill.selection.update = update;
        this.quill.selection.handleDragging = handleDragging;
        this.quill.selection.handleDragging();

        const Parchment = Quill.import('parchment');
        // Allow uuid for sifive-resources
        const uuid = new Parchment.Attributor.Attribute('uuid', 'uuid', {
            scope: Parchment.Scope.BLOCK,
        });
        Parchment.register(uuid);

        this.quill.on('text-change', (delta, oldDelta, source) => {

            this.emitChange();

        });

        DOMUtils.on(this, 'click', (event) => {

            event.stopPropagation();

        });

    }

    /**
     * Broadcast updates
     */
    emitChange() {

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                content: this.quill.getContents(),
                text: this.quill.getText(),
                html: this.getHTML(),
            },
            bubbles: true,
            composed: true,
        }));

    }

    /**
     * Return the inner html of quill
     * @return {Node}
     */
    getHTML() {

        return this.stripTags(this.quill.root.innerHTML);

    }

    /**
     * Clear the inner html of quill
     */
    clear() {

        this.quill.setText('');

    }

    /**
     * Set quill content
     * @param {String} content
     */
    setHTML(content) {

        this.quill.clipboard.dangerouslyPasteHTML(0, content);

    }

    /**
     * Strip tags from html
     * @param {String} html
     * @return {String}
     */
    stripTags(html) {

        return this.quill.root.innerHTML;
        /*
        const stripTags = ['script', 'img', 'video', 'svg', 'style'];

        const $wrapper = document.createElement('div');
        $wrapper.innerHTML = this.quill.root.innerHTML;

        stripTags.forEach((tag) => {

            const $foundTag = DOMUtils.q(tag, $wrapper);

            if ($foundTag) {

                const $resource = document.createElement('resource');
                $foundTag.parentElement.replaceChild($resource, $foundTag);

            }

        });

        return $wrapper.innerHTML;
*/

    }

}

export { RichTextEditor };
