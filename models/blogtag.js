/**
 * Created by dantegg on 2017/1/16.
 */
const MongoBaseModel = require('./mongobase')

class blogTag extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({tagName:1},{unique:true}).then()
    }

    findAllTags(){
        return this.find()
    }

    async findTagById(id){
        let name = await this.get(id)
        return name.tagName
    }

    findTagByName(tagName){
        return this.collection.findOne({tagName:tagName})
    }
}

module.exports = blogTag