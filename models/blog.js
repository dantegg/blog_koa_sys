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

    //simple pagination
    findBlogByPage(currentPage,pageSize){
        let limitNum = parseInt(pageSize)
        let skipNum =  (parseInt(currentPage)-1)*parseInt(pageSize)
        if(skipNum <0) skipNum= 0
        return this.collection.find({}).sort({createTime:-1}).limit(limitNum).skip(skipNum).toArray()
    }

    findBlogSize(){
        return this.collection.count()
    }


    findBlogs(time){
        return this.findByTime(time,100)
    }
}

module.exports = BlogModel