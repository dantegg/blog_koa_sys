/**
 * Created by dantegg on 2017/1/7.
 */

class News{
    constructor(blogModel,tagModel){
        this.blogModel = blogModel
        this.tagModel = tagModel
    }

    async getNews(page=1){
        const news = await this.blogModel.findNews(page)
        return Promise.all(news.map(x=>this.normalized(x)))
    }

    async normalized(x){
        let tags =[]
        //console.log(x.tagId)
        if(Object.prototype.toString.call(x.tagId) !== "[object String]"){
            if(x.tagId !== undefined){
                x.tagId.map(async(x)=>{
                    let zzz=  await this.tagModel.findTagById(x)
                    tags.push(zzz)
                })
            }
        }else{
           // tags.push(x.tagId)
            let tagName = await this.tagModel.findTagById(x.tagId)
            tags.push(tagName)
        }

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