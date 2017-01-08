/**
 * Created by dantegg on 16-12-30.
 */
import {WELCOME,DELETE_BLOG} from '../actions/home'


export function welcomeInfo(state =[],action) {
    switch (action.type){
        case WELCOME:
            return state
        case DELETE_BLOG:
            return action.list
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