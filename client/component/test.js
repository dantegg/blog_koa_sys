/**
 * Created by dantegg on 16-12-30.
 */
import React,{Component} from 'react'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as testActions from '../actions/welcome'


class Test extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>test webpack!2016-12-30!233{this.props.ttt}</div>
        )
    }
}


function mapStateToProps(state) {
    return{
        welcomeInfo:state.welcomeInfo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(testActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Test)