/**
 * Created by dantegg on 2017/1/1.
 */
import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import 'antd/dist/antd.css'
import test from '../css/home.css'


export default class Head extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    go2space(){
        window.location.href='/space'
    }
    render(){
        return(
            <Row>
                <Col xs={8} sm={8} md={8} lg={8} className={test.homeHeadLogo}>
                    <div >Dantegg's world</div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} className={test.homeHeadLogin}>
                    <Button type="ghost" onClick={this.go2space.bind(this)}>登录</Button>
                </Col>
            </Row>
        )
    }
}
