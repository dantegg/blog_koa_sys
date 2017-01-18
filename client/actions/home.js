/**
 * Created by dantegg on 16-12-30.
 */

import {FETCH_POST,FETCH_GET} from '../util/fetchConfig'

export const WELCOME = 'WELCOME'
export const DELETE_BLOG = 'DELETE_BLOG'
export const PAGE_CHANGE = 'PAGE_CHANGE'
export const GET_ALL_TAGS = 'GET_ALL_TAGS'
export const GET_MORE_NEWS = 'GET_MORE_NEWS'

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


export function getAllTags() {
    return(dispatch)=>{
        let fetchData = FETCH_GET
        fetch('/api/getAllTags',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    console.log(result)
                    dispatch(getTagList(result))
                })
            }
        })
    }
}

export function addTag(tagName) {
    return(dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body = `tagName=${tagName}`
        fetch('/api/createTag',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    if(result.success){
                        dispatch(getAllTags())
                    }
                })
            }
        })
    }
}

function getTagList(res) {
    return{
        type:GET_ALL_TAGS,
        list:res
    }
}

export function getMoreNews(page,callback) {
    return(dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body = `nextPage=${page}`
        fetch('/api/moreNews',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    callback()
                    dispatch(moreNews(result))
                })
            }
        })
    }
}

function moreNews(res) {
    return{
        type:GET_MORE_NEWS,
        list:res
    }
}