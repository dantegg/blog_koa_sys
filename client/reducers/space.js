/**
 * Created by dantegg on 2017/1/16.
 */
import {GET_ALL_TAGS} from '../actions/home'

export function allTags(state=[],action) {
    switch (action.type){
        case GET_ALL_TAGS:
            //console.log('action',action)
            return action.list
        default:
            return state
    }
}