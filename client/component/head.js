/**
 * Created by dantegg on 2017/1/1.
 */
import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import '../css/home.css'


export default class Head extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <Row>
                <Col xs={8} sm={8} md={8} lg={8} className="home-head-logo">
                    <div >Dantegg</div>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} className="home-head-login">
                    <Button type="ghost">登录</Button>
                </Col>
            </Row>
        )
    }
}
