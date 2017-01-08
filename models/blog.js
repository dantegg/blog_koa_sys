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
        return this.find({},{createTime:-1},10).toArray()
        //return ttt
    }



    findBlogs(time){
        return this.findByTime(time,10)
    }
}

module.exports = BlogModel