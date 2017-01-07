/**
 * Created by dantegg on 2017/1/7.
 */
const MongoBaseModel = require('./mongobase')

class BlogModel extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({title:1},{unique:true}).then()
    }

    findNews(){
        return this.collection.find({},{},10).toArray()
        //return ttt
    }
}

module.exports = BlogModel