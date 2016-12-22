/**
 * Created by dantegg on 2016/12/21.
 */
class MemStore{
    constructor(){
        this.map = {}
    }

    async set(key,value){
        this.map[key]=value
    }

    async get(key){
        return this.map[key]
    }

    async del(key){
        delete this.map[key]
    }

    async incr(key){
        var value = await this.get(key)
        if(value === undefined){
            value = 0
        }
        var num = parseInt(value,10)
        if(Number.isNaN(num)){
            throw new Error('INCR: Wrong type of value')
        }
        this.map[key] = ++num
        return num
    }
}

module.exports = MemStore