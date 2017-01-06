/**
 * Created by dantegg on 17-1-3.
 */
import React,{Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import { browserHistory } from 'react-router'
import Head from './head'
const FormItem = Form.Item;

const FETCH_POST = {
    method:'post',
    //body:paydata,
    credentials: 'same-origin',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/javascript,*/*;q=0.01'
    },
}

class Login extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    //登录按钮点击事件
    login(){
        //console.log('login')
        let userName = this.props.form.getFieldValue('username')
        let passWord = this.props.form.getFieldValue('password')
        console.log('username',userName)
        console.log('password',passWord)
        let fetchData = FETCH_POST
        fetchData.body = `email=${userName}&password=${passWord}`
        fetch('/api/login',fetchData)
        //browserHistory.push('/space')
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <Head currentPath={this.props.location.pathname}/>
                <div style={{width:'300px',margin:'200px auto',textAlign:'center'}}>
                     <h3>登录</h3>
                    <div style={{marginTop:'20px'}}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={()=>this.login()} style={{width:"100%"}}>
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create({})(Login)