/**
 * Created by dantegg on 2017/1/2.
 */
import React,{Component} from 'react'
import Head from '../container/head'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>
                <Head/>
                <div>home22组件</div>
            </div>
        )
    }
}