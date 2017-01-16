/**
 * Created by dantegg on 2017/1/16.
 */
const MongoBaseModel = require('./base')

class blogTag extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({tagName:1},{unique:true}).then()
    }

    findAllTags(){
        return this.find()
    }

    findTagById(id){
        return this.collection.findOne({_id:id})
    }

    findTagByName(tagName){
        return this.collection.findOne({tagName:tagName})
    }
}

module.exports = blogTag