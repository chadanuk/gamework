/**
 * Storage class for managing persistent key-value data in localStorage.
 */
export class Storage {
    /**
     * @param {string} key
     */
    constructor(key: string);
    key: string;
    /**
     * Get a value by key, or all data if no key is provided.
     * @param {string|null} [key=null]
     * @param {*} [defaultValue=null]
     * @returns {Promise<*>}
     */
    get(key?: string | null, defaultValue?: any): Promise<any>;
    /**
     * Set a value by key.
     * @param {string} key
     * @param {*} value
     * @returns {Promise<void>}
     */
    set(key: string, value: any): Promise<void>;
}
//# sourceMappingURL=storage.d.ts.map