/**
 * Created by dantegg on 2017/1/6.
 */
const {MongoClient} = require('mongodb')
const UserModel = require('./user')

exports.user = new UserModel()

MongoClient.connect('mongodb://localhost/blogsys')
.then(db=>{
    exports.user.init(db.collection('user'))
})