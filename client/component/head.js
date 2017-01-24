/**
 * Created by dantegg on 2017/1/1.
 */
import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import { browserHistory } from 'react-router'
import 'antd/dist/antd.css'
import '../css/home.css'
import {FETCH_GET} from '../util/fetchConfig'


export default class Head extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        //console.log('did mount',this)
    }

    logoClick(){
        //console.log('e',e)
        //browserHistory.push('/')
        window.location.href='/'
    }

    goCheck(){
        console.log('this',this.props)
    }

    go2login(){
        //console.log('e',e)
        browserHistory.push('/login')
        //window.location.href='/space'
    }

    logOut(e){
        //console.log('e',e.target.innerHTML)
        let fetchData = FETCH_GET

        fetch('/api/logout',fetchData).then(res=>{
            console.log(res)
            if(res.ok){
                res.json().then(function (result) {
                    if(result.success){
                        window.location.href='/'
                    }
                })
            }
        })

        //browserHistory.push('/login')
    }

    render(){
        //console.log('this props',this.props)
        //let currentPath  =window.location.pathname
        let btnTxt = '登录'
        if(this.props.currentPath ==='/login'){
            btnTxt = '返回'
        }
        let btnAction = null

        switch (this.props.currentPath){
            case '/home':
                btnTxt = '登录',btnAction = this.go2login
                break
            case '/login':
                btnTxt = '登录',btnAction = this.go2login
                break
            default:
                btnTxt = '退出',btnAction = this.logOut
        }
        return(
            <Row style={{height:'80px'}}>
                <Col xs={8} sm={8} md={8} lg={8} className="home-head-logo">
                    <div onClick={()=>this.logoClick()}>
                        <img src="/static/logo.png" style={{height:'50px'}} />
                    </div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} className="home-head-login">
                    <Button type="ghost" onClick={btnAction.bind(this)}>{btnTxt}</Button>
                </Col>
            </Row>
        )
    }
}
