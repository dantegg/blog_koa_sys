/**
 * Created by dantegg on 16-12-22.
 */
const MongoBaseModel = require('./mongobase')


class UserModel extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({email:1},{unique:true}).then()
    }

    // create(obj){
    //     return super.create(obj).then((id)=>{
    //         return this.store.set(PREFIX_EMAIL_TO_ID+obj.email,id).then(()=>id)
    //     })
    // }

    getByEmail(email){
        return this.collection.findOne({email:email})
    }
}

module.exports = UserModel