
/* eslint-disable babel/no-invalid-this */

import clone from 'clone';
import equal from 'deep-equal';

import Emitter from 'quill/core/emitter';

export const getNativeRange = function getNativeRange() {

    const selection = this.context.getSelection();

    if (selection == null || selection.rangeCount <= 0) {

        return null;

    }

    const nativeRange = selection.getRangeAt(0);

    if (nativeRange == null) {

        return null;

    }

    const range = this.normalizeNative(nativeRange);

    return range;

};
export const setNativeRange = function setNativeRange(
        startNode, startOffset,
        endNode = startNode, endOffset = startOffset,
        force = false) {

    if (startNode != null && (
        this.root.parentNode == null ||
        startNode.parentNode == null ||
        endNode.parentNode == null)) {

        return;

    }

    const selection = this.context.getSelection();

    if (selection == null) return;

    if (startNode != null) {

        if (!this.hasFocus()) this.root.focus();

        const native = (this.getNativeRange() || {}).native;

        if (native == null || force ||
            startNode !== native.startContainer ||
            startOffset !== native.startOffset ||
            endNode !== native.endContainer ||
            endOffset !== native.endOffset) {

            if (startNode.tagName == 'BR') {

                startOffset = [].indexOf
                    .call(startNode.parentNode.childNodes, startNode);
                startNode = startNode.parentNode;

            }

            if (endNode.tagName == 'BR') {

                endOffset = [].indexOf
                    .call(endNode.parentNode.childNodes, endNode);
                endNode = endNode.parentNode;

            }

            const range = document.createRange();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);

            selection.removeAllRanges();
            selection.addRange(range);

        }

    } else {

        selection.removeAllRanges();
        this.root.blur();
        document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)

    }

};
export const update = function update(source = Emitter.sources.USER) {

    const oldRange = this.lastRange;
    const [
        lastRange,
        nativeRange,
    ] = this.getRange();

    this.lastRange = lastRange;

    if (this.lastRange != null) {

        this.savedRange = this.lastRange;

    }

    if (!equal(oldRange, this.lastRange)) {

        if (
            !this.composing && nativeRange != null &&
            nativeRange.native.collapsed &&
            nativeRange.start.node !== this.cursor.textNode) {

            this.cursor.restore();

        }

        const args = [
            Emitter.events.SELECTION_CHANGE,
            clone(this.lastRange),
            clone(oldRange),
            source,
        ];

        this.emitter.emit(Emitter.events.EDITOR_CHANGE, ...args);

        if (source !== Emitter.sources.SILENT) {

            this.emitter.emit(...args);

        }

    }

};
export const hasFocus = function hasFocus() {

    return this.context.activeElement === this.root;

};
export const handleDragging = function handleDragging() {

    this.context.addEventListener('mousedown', () => {

        this.mouseDown = true;

    }, false);

    this.context.addEventListener('mouseup', () => {

        this.mouseDown = false;
        this.update(Emitter.sources.USER);

    });

};

export default Selection;
