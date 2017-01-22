/**
 * Created by dantegg on 2017/1/10.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as blogActions from '../../actions/blog'
import Blog from '../../component/blog'

function mapStateToProps(state) {
    return{
        isLogin:state.isLogin,
        oneBlog:state.oneBlog
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(blogActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog)