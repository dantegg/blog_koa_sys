/**
 * Created by dantegg on 2017/1/1.
 */
import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import { browserHistory } from 'react-router'
import 'antd/dist/antd.css'
import test from '../css/home.css'


export default class Head extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    logoClick(){
        browserHistory.push('/')
    }

    goCheck(){
        console.log('this',this.props)
    }

    go2home(){
        browserHistory.push('/home')
        //window.location.href='/space'
    }

    go2login(){
        browserHistory.push('/login')
    }

    render(){
        //console.log('this',this.props)
        //let currentPath  =window.location.pathname
        let btnTxt = '登录'
        if(this.props.currentPath ==='/login'){
            btnTxt = '返回'
        }
        if(this.props.currentPath === '/home') btnTxt = '登录'
        if(this.props.currentPath === '/space') btnTxt = '首页'
        return(
            <Row style={{height:'10%'}}>
                <Col xs={8} sm={8} md={8} lg={8} className={test.homeHeadLogo}>
                    <div onClick={()=>this.logoClick()}>Dantegg's world</div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} className={test.homeHeadLogin}>
                    <Button type="ghost" onClick={this.go2login.bind(this)}>{btnTxt}</Button>
                </Col>
            </Row>
        )
    }
}
