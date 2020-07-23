import Quill from 'quill';
import { ImageDrop } from 'quill-image-drop-module';

/**
 * Replacement of ImageDrop that inserts SifiveResource
 * @extends ImageDrop
 */
class SifiveImageDrop extends ImageDrop {

    /**
     * Insert the SifiveResource
     * @param  {String} dataUrl
     * @param {File} file
     */
    insert(dataUrl, file) {

        const index = (this.quill.getSelection() || {}).index ||
            this.quill.getLength();

        this.quill.insertText(index,
            '\n',
            Quill.sources.USER);

        this.quill.insertEmbed(index, 'sifiveresource', {
            quill: this.quill,
            attributes: {},
            properties: {
                'src': dataUrl,
                'needUpload': true,
                'file': file,
                'type': file.type,
                'name': file.name,
                'uuid': '',
            },
        });

        this.quill.setSelection(
            index + 2,
            Quill.sources.SILENT);

        this.quill.insertText(
            index,
            '\n',
            Quill.sources.USER);

    }

    /**
     * Extract image URIs a list of files from evt.dataTransfer or evt.clipboardData
     * @param {File[]} files  One or more File objects
     * @param {Function} callback  A function to send each data URI to
     */
    readFiles(files, callback) {

        [].forEach.call(files, (file) => {

            if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {

                // file is not an image
                // Note that some file formats such as psd start with image/* but are not readable
                return;

            }
            // set up file reader
            const reader = new FileReader();
            reader.onload = (evt) => {

                callback(evt.target.result, file);

            };
            // read the clipboard item or file
            const blob = file.getAsFile ? file.getAsFile() : file;
            if (blob instanceof Blob) {

                reader.readAsDataURL(blob);

            }

        });

    }

}

export { SifiveImageDrop };
