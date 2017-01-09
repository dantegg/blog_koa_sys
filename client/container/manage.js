/**
 * Created by dantegg on 2017/1/8.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../actions/home'
import Manage from '../component/manage'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo,
        isLogin:state.isLogin,
        blogCount:state.blogCount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Manage)