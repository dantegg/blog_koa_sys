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
        return Promise.all(news.map(x=>this.normalized(x)))
    }


    // async returnNews(news){
    //     return await this.normalized(news)
    //     // return new Promise((resolve,reject)=>{
    //     //     let tempArray = []
    //     //     news.toArray((err,items)=>{
    //     //         items.map(x=>{
    //     //             tempArray.push({
    //     //                 "title":x.title,
    //     //                 "content":x.content,
    //     //                 "createTime":x.createTime
    //     //             })
    //     //         })
    //     //     })
    //     //
    //     //     //console.log('zzzzzz',zzz)
    //     //     resolve(tempArray)
    //     //})
    //
    // }

    async normalized(x){
        //console.log('?',x)
        return{
            title:x.title,
            content:x.content,
            createTime:x.createTime,
            id:x._id
        }
    }

    // async normalizedWithId(x){
    //     let newdate = new Date()
    //     newdate.setTime(x.createTime)
    //     return{
    //         title:x.title,
    //         content:x.content,
    //         createTime:x.createTime,
    //         id:x._id
    //     }
    // }

    normalizedList(list){
        return Promise.all(list.map(x=>this.normalized(x)))
    }
}

module.exports = News