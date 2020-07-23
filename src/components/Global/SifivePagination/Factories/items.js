
export const itemsFactory = (activePageIndex, pageLength, items) => {

    if (items.length > 0) {

        const startIndex = activePageIndex * pageLength;
        return items.slice(startIndex, startIndex + pageLength);

    }

    return '';

};
