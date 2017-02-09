/**
 * Created by dantegg on 17-1-3.
 */
import React,{Component} from 'react'
import {Form, Icon, Input, Button,notification} from 'antd'
import { browserHistory } from 'react-router'
import Head from './head'
const FormItem = Form.Item;
import {FETCH_POST} from '../util/fetchConfig'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        if(this.props.isLogin === true){
            browserHistory.push('/space')
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
        fetch('/api/login',fetchData).then(res=>{
            if(res.ok){
                res.json().then(result=>{
                    if(result.success){
                        console.log('sss')
                        //browserHistory.push('/space')
                        window.location.href='/space'
                    }else{
                        notification.error({
                            message:'错误',
                            description:'用户名或密码错误!'
                        })
                    }
                    //console.log('login',result)
                })
            }
        })
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
        //console.log('login',this.props)
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