/**
 * Created by dantegg on 16-12-30.
 */

import {FETCH_POST} from '../util/fetchConfig'

export const WELCOME = 'WELCOME'
export const DELETE_BLOG = 'DELETE_BLOG'

export function welcome() {
    return 0
}

export function deleteBlog(id){
    return (dispatch)=>{
        let fetchData = FETCH_POST
        fetchData.body=`id=${id}`
        fetch('/api/deleteblog',fetchData).then(function (res) {
            if(res.ok){
                res.json().then(result=>{
                    //console.log('result',result)
                    dispatch(getlist(result))
                })
            }
        })

    }
}

function getlist(list) {
    return{
        type:DELETE_BLOG,
        list:list
    }
}