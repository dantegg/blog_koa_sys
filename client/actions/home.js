/**
 * Created by dantegg on 16-12-30.
 */

import {FETCH_POST} from '../util/fetchConfig'

export const WELCOME = 'WELCOME'
export const DELETE_BLOG = 'DELETE_BLOG'
export const PAGE_CHANGE = 'PAGE_CHANGE'

export function welcome() {
    return 0
}

export function deleteBlog(id,currentPage,pageSize,callback){
    return (dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body=`id=${id}&currentPage=${currentPage}&pageSize=${pageSize}`
        fetch('/api/deleteblog',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    //console.log('result',result)
                    callback()
                    dispatch(pageBlogList(result))

                })
            }
        })

    }
}


export function pageChange(currentPage,pageSize){
    return(dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body=`currentPage=${currentPage}&pageSize=${pageSize}`
        fetch('/api/findBlogBySimplePagination',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    //console.log(result)
                    dispatch(pageBlogList(result))
                })
            }
        })
    }
}

function pageBlogList(res) {
    //console.log('rrr',res.blogCount)
    return{
        type:PAGE_CHANGE,
        list:res.blogList,
        blogCount:res.blogCount
    }
}


