/**
 * Created by dantegg on 2017/1/10.
 */
import {GET_ONE_BLOG} from '../actions/blog'

export function oneBlog(state={},action) {
    switch (action.type){
        case GET_ONE_BLOG:
            return Object.assign({},state)
        default:
            return state
    }
}