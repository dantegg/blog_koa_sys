/**
 * Created by dantegg on 2017/1/1.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../actions/home'
import Head from '../component/head'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Head)