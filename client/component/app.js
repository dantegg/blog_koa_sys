/**
 * Created by dantegg on 2017/1/2.
 */
import React,{Component} from 'react'


export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        //console.log('zzz',this.props)
        return(
            <div style={{height:'100%'}}>
                <div style={{height:'90%'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}