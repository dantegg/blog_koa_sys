/**
 * Created by dantegg on 2017/1/7.
 */
//const models = require('../../models')



class News{
    constructor(blogModel,tagModel){
        this.blogModel = blogModel
        this.tagModel = tagModel
    }

    async getNews(){
        const news = await this.blogModel.findNews()
        return Promise.all(news.map(x=>this.normalized(x)))
    }

    async normalized(x){
        //console.log('?',x)
        //let tags = Promise.all(x.tagId.)
        let tags =[]
        x.tagId.map(async(x)=>{
           let zzz=  await this.tagModel.findTagById(x)
            tags.push(zzz)
        })
        console.log('tags',tags)
        return{
            title:x.title,
            content:x.content,
            createTime:getLocalTime(x.createTime),
            id:x._id,
            tags:tags
        }
    }

    async normalizeTag(t){
        return{
            tagName:t.tagName,
            id:t._id
        }
    }

    normalizedTagList(list){
        return Promise.all(list.map(x=>this.normalizeTag(x)))
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

function getLocalTime(nS) {
    let time = new Date(nS)
    let year = time.getFullYear()
    let month = time.getMonth()+1
    let day = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let localTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
    return localTime
}


module.exports = News