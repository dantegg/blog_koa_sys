/**
 * Created by dantegg on 16-12-30.
 */
import {WELCOME} from '../actions/welcome'


export default function counter(state ={},action) {
    switch (action.type){
        case WELCOME:
            return state
        default:
            return state
    }
}