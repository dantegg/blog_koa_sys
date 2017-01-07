/**
 * Created by dantegg on 2017/1/7.
 */
//const models = require('../../models')



class News{
    constructor(blogModel){
        this.blogModel = blogModel
    }

    async getNews(){
        const news = await this.blogModel.findNews()
        return Promise.all(news.map(x=>{
            return {
                'title':x.title,
                'id':x._id,
                'content':x.content,
                'createTime':x.createTime
            }
        }))
    }



    async returnNews(news){
        return await this.normalized(news)
        // return new Promise((resolve,reject)=>{
        //     let tempArray = []
        //     news.toArray((err,items)=>{
        //         items.map(x=>{
        //             tempArray.push({
        //                 "title":x.title,
        //                 "content":x.content,
        //                 "createTime":x.createTime
        //             })
        //         })
        //     })
        //
        //     //console.log('zzzzzz',zzz)
        //     resolve(tempArray)
        //})

    }

    async normalized(x){
        //console.log('?',x)
        return{
            title:x.title,
            content:x.content,
            createTime:x.createTime
        }
    }
}

module.exports = News