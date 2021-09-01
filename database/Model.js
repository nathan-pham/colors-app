module.exports = class Model {
    created = Date.now()

    prepare() {
        return Object.keys({...this})
            .filter(key => !key.startsWith("_"))
            .reduce((acc, key) => ({
                ...acc,
                [key]: this[key]
            }), {})
    }

    async save() {
        await this._collection.put(this.prepare())
    }
}