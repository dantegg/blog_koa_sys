/**
 * Created by dantegg on 17-1-4.
 */
import React,{Component} from 'react'
// import {PrismCode} from 'react-prism'
import homeStyle from '../css/home.css'
import Head from './head'
export default class Test extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        //console.log('this',this.props.path)
        return(
            <div style={{height:'100%'}}>
                <Head currentPath={this.props.location.pathname}/>
                <div className={homeStyle.homeSlogan}>
                    <div>吾生也有涯，而知也无涯，以有涯随无涯，殆已</div><div style={{textAlign:'right'}}>——— 庄子</div>
                </div>
            </div>
        )
    }
}