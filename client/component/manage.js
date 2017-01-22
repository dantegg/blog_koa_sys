/**
 * Created by dantegg on 2017/1/8.
 */
import React,{Component} from 'react'
import Head from './head'
import {Button,Input,Icon,Table} from 'antd'
//import {browserHistory} from 'react-router'
import '../css/manage.css'
//import {FETCH_POST} from '../util/fetchConfig'

class Manage extends Component{
    constructor(props){
        super(props)
        this.state={
            currenPage:1
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log('next',nextProps)
        //console.log('now',this.state)
    }


    go2user(){
        window.location.href='/space'
        //browserHistory.push('/space')
    }

    pageChange(e){
        //console.log(e)
        this.setState({
            currentPage:e
        })
        this.props.pageChange(e,10)
    }

    delBlog(id,col,index){
       // console.log('sss',col,index)
        let comp = this
        let currentPage = parseInt(this.state.currenPage)
        if(index === 0){
            currentPage = parseInt(this.state.currenPage)-1
        }
        let pageSize = 10
        this.props.deleteBlog(id,currentPage,pageSize,function () {
            comp.props.pageChange(currentPage,10)
        })
        //this.props.deleteBlog(id)
    }
    render(){
        // console.log('table',this.props)

        const pagination = {
            total:this.props.blogCount,
            pageSize:10,
            onChange:this.pageChange.bind(this)
        }
        //console.log('page',pagination)
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            render: (text,col)=> {
                //console.log(col.id)
                let blogUrl = '/blog/'+col.id
                //let timestep = new Date()
                return<a href={blogUrl}>{text}</a>
            },
        }, {
            title: '日期',
            dataIndex: 'createTime',
            render: (text,col)=>{
                // let newdate = new Date()
                // newdate.setTime(text)
                // let time = newdate.toLocaleString()
                return<div>{text}</div>
            }
        }, {
            title: '操作',
            dataIndex: 'id',
            render: (text,col,index)=><Button type="primary" onClick={()=>this.delBlog(text,col,index)}>删除</Button>
        }];
        return(
            <div>
                <Head/>
                <div className="go-user">
                    <Button type='ghost' icon="user" shape="circle" onClick={this.go2user.bind(this)}/>
                </div>
                <div className="manage-table">
                    <Table rowKey={
                        record => {
                            //console.log(record)
                            return record.id+'row'
                        }
                    } columns={columns} dataSource={this.props.welcomeInfo} pagination={pagination} ref/>
                </div>
            </div>
        )
    }
}

export default Manage