/**
 * Storage class for managing persistent key-value data in localStorage.
 */
export class Storage {
    /**
     * @param {string} key
     */
    constructor(key) {
        this.key = key;
    }

    /**
     * Get a value by key, or all data if no key is provided.
     * @param {string|null} [key=null]
     * @param {*} [defaultValue=null]
     * @returns {Promise<*>}
     */
    async get(key = null, defaultValue = null) {
        const data = JSON.parse(await localStorage.getItem(this.key));
        if(!key) {
            return data;
        }
        return data !== null && data[key] !== undefined ? data[key] : defaultValue;
    }
    
    /**
     * Set a value by key.
     * @param {string} key
     * @param {*} value
     * @returns {Promise<void>}
     */
    async set(key, value) {
        let data = await this.get();
        if(data === null || data === undefined) {
            data = {};
        }
        data[key] = value;
        return await localStorage.setItem(this.key, JSON.stringify(data));
    }
}