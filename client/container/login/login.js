/**
 * Created by dantegg on 2017/1/8.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../../actions/home'
import Login from '../../component/login'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo,
        isLogin:state.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)

//module.exports = connect(mapStateToProps,mapDispatchToProps)(Login)