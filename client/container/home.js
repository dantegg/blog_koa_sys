/**
 * Created by dantegg on 2017/1/2.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../actions/welcome'
import Home from '../component/home'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)