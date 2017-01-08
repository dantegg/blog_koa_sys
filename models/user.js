/**
 * Created by dantegg on 16-12-22.
 */
const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel{
    init(collection){
        //console.log('collection',collection)
        this.collection = collection

        this.collection.createIndex({email:1},{unique:true}).then()

    }

    // create(obj){
    //     return super.create(obj).then((id)=>{
    //         // console.log('init user',id)
    //         // this.collection.createIndex({email:1},{unique:true}).then()
    //         //return this.store.set(PREFIX_EMAIL_TO_ID+obj.email,id).then(()=>id)
    //     })
    // }

    initUser(){
        super.create({email:'scott',password:'123456'})
    }

    getByEmail(email){
        return this.collection.findOne({email:email})
    }
}

export default UserModel