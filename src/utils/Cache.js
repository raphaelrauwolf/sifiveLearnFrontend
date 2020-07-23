
/**
 * Cache helper class
 */
class Cache {

    _cache = {};

    /**
     * Add a url to cache
     * @param {String} url
     * @param {Function} callback
     */
    add(url, callback) {

        const cb = (typeof callback === 'function') ? callback : function() {};

        if (this.isInCache(url) && this.isLoaded(url)) { // is in Cache and loaded

            cb(this._cache[url].data);
            return;

        } else if (this.isInCache(url) && !this.isLoaded(url)) { // is in Cache but not loaded

            this._cache[url].callbacks.push(cb);

        } else {

            this._cache[url] = {
                callbacks: [cb],
                isLoaded: false,
            };

        }

    }

    /**
     * Finish a file in cache
     * @param {String} url
     * @param {*} data
     */
    finish(url, data) {

        if (this.isInCache(url) && !this.isLoaded(url)) {

            const entry = this._cache[url];

            entry.data = data;
            entry.isLoaded = true;

            this._execCallbacks(url);

        }

    }

    /**
     * Checks if a url already exists in the Cache
     * @param {String} url
     * @return {Boolean}
     */
    isInCache(url) {

        return !!this._cache[url];

    }

    /**
     * Checks if a url was already loaded in the Cache
     * @param {String} url
     * @return {Boolean}
     */
    isLoaded(url) {

        return (this.isInCache(url) && !!this._cache[url].isLoaded);

    }

    /**
     * Returns the data of an url in the cahce
     * @param {String} url
     * @return {*}
     */
    getData(url) {

        return this._cache[url].data;

    }

    /**
     * Executes all callbacks listening to the completion of an url
     * @param {String} url
     */
    _execCallbacks(url) {

        const entry = this._cache[url];

        if (entry && entry.isLoaded) {

            for (let i = 0, j = entry.callbacks.length; i < j; i++) {

                entry.callbacks.shift()(entry.data);
                i--;
                j--;

            }

        }

    }

}

export default new Cache();
export const CacheClass = Cache;
