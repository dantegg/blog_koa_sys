/**
 * Created by dantegg on 2017/1/6.
 */
const {MongoClient} = require('mongodb')
const BlogModel = require('./blog')
const UserModel = require('./user')
const TagModel = require('./blogtag')

exports.user = new UserModel()
exports.blog = new BlogModel()
exports.tag = new TagModel()

MongoClient.connect('mongodb://localhost/blogsys')
.then(db=>{
    //console.log('db',db.collection('user'))
    exports.user.init(db.collection('user'))
    exports.blog.init(db.collection('blog'))
    exports.tag.init(db.collection('blogtag'))
})