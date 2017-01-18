/**
 * Created by dantegg on 16-12-30.
 */
import {WELCOME,DELETE_BLOG,PAGE_CHANGE,GET_MORE_NEWS} from '../actions/home'


export function welcomeInfo(state =[],action) {
    switch (action.type){
        case WELCOME:
            return state
        case DELETE_BLOG:
            return action.list
        case PAGE_CHANGE:
            return action.list
        case GET_MORE_NEWS:
            return state.concat(action.list)
        default:
            return state
    }
}

export function isLogin(state ={},action) {
    switch (action.type){
        case WELCOME:
            return state
        default:
            return state
    }
}

export function blogCount(state=0,action) {
    switch (action.type){
        case PAGE_CHANGE:
            return action.blogCount
        case DELETE_BLOG:
            return action.blogCount
        default:
            return state
    }
}