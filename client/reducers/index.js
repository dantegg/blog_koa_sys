/**
 * Created by dantegg on 16-12-30.
 */
import {combineReducers} from 'redux'
//import counter from './counter'
//import {red_color,green_color,blue_color} from './color'
import {welcomeInfo,isLogin} from './welcome'


const rootReducer = combineReducers({
    welcomeInfo,isLogin
})


export default rootReducer