/**
 * Created by dantegg on 16-12-22.
 */
const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel{
    init(collection){
        //console.log('collection',collection)
        this.collection = collection
        //console.log('size',this.collection.count().toNumber())
        this.collection.createIndex({email:1},{unique:true}).then(async  ()=> {
            let zz = await this.getUserCount()
            //console.log('ss',zz)
            if(zz===0){
                this.create({'email':'scott','password':'123456'})
            }
        })
    }

    // create(obj){
    //     return super.create(obj).then((id)=>{
    //         // console.log('init user',id)
    //         // this.collection.createIndex({email:1},{unique:true}).then()
    //         //return this.store.set(PREFIX_EMAIL_TO_ID+obj.email,id).then(()=>id)
    //     })
    // }
    getUserCount(){
        return this.collection.count()
    }

    getByEmail(email){
        return this.collection.findOne({email:email})
    }
}

export default UserModel