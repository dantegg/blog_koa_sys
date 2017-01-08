/**
 * Created by dantegg on 2017/1/8.
 */
import React,{Component} from 'react'
import Head from './head'
import {Button,Input,Icon,Table} from 'antd'
import {browserHistory} from 'react-router'
import manageStyle from '../css/manage.css'
//import {FETCH_POST} from '../util/fetchConfig'

class Manage extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }


    go2user(){
        browserHistory.push('/space')
    }

    delBlog(id){
        //console.log('sss',this.props)
        this.props.deleteBlog(id)
        //console.log(id)
        //let fetchData = FETCH_POST
        // fetchData.body=`id=${id}`
        // fetch('/api/deleteblog',fetchData).then(res=>{
        //     if(res.ok){
        //         res.json().then(function (result) {
        //             console.log(result)
        //         })
        //     }
        // })
    }
    render(){
        //console.log('table',this.props.welcomeInfo)

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            render: (text,col)=> {
                //console.log(col.id)
                //let timestep = new Date()
                return<a href="#">{text}</a>
            },
        }, {
            title: '日期',
            dataIndex: 'createTime',
            render: (text,col)=>{
                let newdate = new Date()
                newdate.setTime(text)
                let time = newdate.toLocaleString()
                return<div>{time}</div>
            }
        }, {
            title: '操作',
            dataIndex: 'id',
            render: text=><Button type="primary" onClick={()=>this.delBlog(text)}>删除</Button>
        }];
        return(
            <div>
                <Head/>
                <div className={manageStyle.goUser}>
                    <Button type='ghost' icon="user" shape="circle" onClick={this.go2user.bind(this)}/>
                </div>
                <div className={manageStyle.manageTable}>
                    <Table rowKey={
                        record => {
                            //console.log(record)
                            return record.id+'row'
                        }
                    } columns={columns} dataSource={this.props.welcomeInfo} />
                </div>
            </div>
        )
    }
}

export default Manage