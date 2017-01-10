/**
 * Created by dantegg on 2017/1/10.
 */
import {FETCH_POST} from '../util/fetchConfig'

export const GET_ONE_BLOG = 'GET_ONE_BLOG'

export function getOneBlog(id) {
    return(dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body=`blogId=${id}`
        fetch('/api/getBlogById',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    console.log(result)
                })
            }
        })
    }
}