/**
 * Created by dantegg on 2017/1/7.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../../actions/home'
import Space from '../../component/space'

function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo,
        isLogin:state.isLogin,
        allTags:state.allTags
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Space)