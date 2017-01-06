/**
 * Created by dantegg on 2017/1/7.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../actions/home'
import Home from '../component/Home'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo,
        isLogin:state.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)