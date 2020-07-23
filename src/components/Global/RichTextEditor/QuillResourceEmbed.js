
import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

/**
 * Class to suport QuillResourceEmbed elements in Quill
 * @extends BlockEmbed
 */
class QuillResourceEmbed extends BlockEmbed {

    /**
     * Create the embed
     * @param  {Object} params
     * @return {Node}
     */
    static create(params) {

        const $node = super.create();

        console.log('QuillResourceEmbed', $node, params);

        if (typeof params === 'object') {

            Object.keys(params.attributes)
                .forEach(key =>
                    $node.setAttribute(key, params.attributes[key]));

            Object.keys(params.properties)
                .forEach(key => $node[key] = params.properties[key]);

        }

        $node.addEventListener('upload', function() {

            if (typeof params.callback === 'function') {

                window.requestAnimationFrame( function() {

                    params.callback();

                });

            }

        }, false);

        return $node;

    }

}

QuillResourceEmbed.blotName = 'sifiveresource';
// QuillResourceEmbed.className = 'sifive-resource';
QuillResourceEmbed.tagName = 'sifive-resource';

export { QuillResourceEmbed };
