/**
 * Created by dantegg on 2016/12/21.
 */
class BaseModel{
    constructor(store,prefix){
        this.store = store
        this.prefix = prefix
    }

    async create(obj){
        obj.id = obj.id || Date.now()
        await this.store.set(this.prefix+obj.id,obj)
        return obj.id
    }

    async get(id){
        return await this.store.get(this.prefix+id)
    }

    async update(id,obj){
        await this.store.set(this.prefix+id,obj)
    }

    async updatePart(id,part){
        var result = await this.get(id)
        Object.assign(result,part)
        await this.update(id,result)
    }

    async del(id){
        await this.store.del(this.prefix+id)
    }
}

module.exports = BaseModel