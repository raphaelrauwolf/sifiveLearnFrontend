import {
    html,
} from 'lit-element';

export const paginationFactory =
(activePage, pageLength, items, setActivePage) => {

    if (!items || items.length <= 0) {

        return '';

    }

    let pages;

    const pageCount = Math.ceil(items.length / pageLength);

    if (pageCount <= 5) {

        pages = [...new Array(pageCount)].map((page, index) => {

            const onClick = () => setActivePage(index);

            const pageText = ('' + (index + 1)).padStart(2, '0');

            return html`<div
                class="page ${activePage === index ? 'active' : ''}"
                @click=${onClick}>${pageText}</div>`;

        });

    } else if (activePage > 2 && activePage < pageCount - 3) {

        pages = [...new Array(5)].map((page, index) => {

            const pageIndex = activePage + index - 2;

            const onClick = () => setActivePage(pageIndex);

            const pageText = ('' + (pageIndex + 1)).padStart(2, '0');

            return html`<div
                class="page ${activePage === pageIndex ? 'active' : ''}"
                @click=${onClick}>${pageText}</div>`;

        });

        const firstPage = html`<div class="page"
            @click=${() => setActivePage(0)}>01</div>`;

        const lastPage = html`<div class="page"
            @click=${() => setActivePage(pageCount - 1)}>
                ${('' + (pageCount)).padStart(2, '0')}
            </div>`;

        pages = html`
            ${firstPage}
            <div class="dots">...</div> ${pages} <div class="dots">...</div>
            ${lastPage}`;

    } else if (activePage <= 2) {

        pages = [...new Array(5)].map((page, index) => {

            const onClick = () => setActivePage(index);

            const pageText = ('' + (index + 1)).padStart(2, '0');

            return html`<div
                class="page ${activePage === index ? 'active' : ''}"
                @click=${onClick}>${pageText}</div>`;

        });

        const lastPage = html`<div class="page"
            @click=${() => setActivePage(pageCount - 1)}>
                ${('' + (pageCount)).padStart(2, '0')}
            </div>`;

        pages = html`
            ${pages} <div class="dots">...</div>
            ${lastPage}`;

    } else {

        pages = [...new Array(5)].map((page, index) => {

            const pageIndex = pageCount - 5 + index;

            const onClick = () => setActivePage(pageIndex);

            const pageText = ('' + (pageIndex + 1)).padStart(2, '0');

            return html`<div
                class="page ${activePage === pageIndex ? 'active' : ''}"
                @click=${onClick}>${pageText}</div>`;

        });

        const firstPage = html`<div class="page"
            @click=${() => setActivePage(0)}>01</div>`;

        pages = html`
            ${firstPage}
            <div class="dots">...</div> ${pages}`;

    }

    return html`
        <div class="pagination">
            ${pages}
        </div>`;

};
