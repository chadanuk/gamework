export class Storage {
    constructor(key) {
        this.key = key;
    }

    async get(key = null, defaultValue = null) {
        const data = JSON.parse(await localStorage.getItem(this.key))

        if(!key) {
            return data;
        }

        return data !== null && data[key] !== undefined ? data[key] : defaultValue;
    }
    
    async set(key, value) {
        let data = await this.get();
        if(data === null || data === undefined) {
            data = {};
        }
        data[key] = value;

        return await localStorage.setItem(this.key, JSON.stringify(data));
    }
}