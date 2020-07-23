
/**
 * Check if two array properties are different
 * @param  {Array} newArr new Array
 * @param  {Array} oldArr old Array
 * @return {Boolean}
 */
export const hasArrayChanged = (newArr, oldArr) => {

    if (!Array.isArray(newArr) || !Array.isArray(oldArr)) {

        return true;

    }

    if (!newArr !== !oldArr) {

        return true;

    }

    if (newArr.length !== oldArr.length) {

        return true;

    }

    const diff = newArr.find((item, index) => {

        return item !== oldArr[index];

    });

    return !!diff;

};
