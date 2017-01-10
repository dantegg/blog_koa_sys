
/**
 * Created by dantegg on 16-12-23.
 */
const ObjectID = require('mongodb').ObjectID
class MongoBaseModel{
    init(collection){
        this.collection = collection
    }

    toId(id){
        if(id instanceof ObjectID){
            //console.log('objectId',id)
            return id
        }
        //console.log('ssssssss')
        let temp1 = new ObjectID(id)
        //console.log('id is',temp1)
        return temp1
    }

    checkId(id){
        return ObjectID.isValid(id)
    }

    async create(obj){
        const insertResult = await this.collection.insertOne(obj)
        return insertResult && insertResult.insertedId
    }

    get(id){
        return this.collection.findOne({_id:this.toId(id)})
    }

    update(id,obj){
        return this.collection.updateOne({_id:this.toId(id)},obj)
    }

    updatePart(id,part){
        return this.collection.updateOne({_id:this.toId(id)},{$set:part})
    }
    del(id){
        console.log('delete',id)
        return this.collection.deleteOne({_id:this.toId(id)})
    }

    deleteMany(query={}){
        return this.collection.deleteMany(query)
    }

    find(query={},sort={},limit=100){
        //console.log('sort',sort)
        return this.collection.find(query).sort(sort).limit(limit)
    }
    findBefore(before,limit=100){
        return this.find({_id:{$lt:this.toId(before)}},{_id:-1})  //降序查询
    }
    findSince(since,limit=100){
        return this.find({_id:{$gt:this.toId(since)}},{_id:-1})     //升序查询
    }

    findByTime(before,limit=100){
        console.log('time',before)
        return this.find({createTime:{$lt:before}},{createTime:-1},limit)
    }

}

export default MongoBaseModel