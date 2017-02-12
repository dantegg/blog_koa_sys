/**
 * Created by dantegg on 2017/1/8.
 */
import React,{Component} from 'react'
import Head from './head'
import {Button,Table,Upload,Icon} from 'antd'
//import {browserHistory} from 'react-router'
import '../css/manage.css'
//import {FETCH_POST} from '../util/fetchConfig'

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Manage extends Component{
    constructor(props){
        super(props)
        this.state={
            currenPage:1,
            imageUrl:'/upload/avatar.jpg'
        }
    }



    componentWillReceiveProps(nextProps){

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

    handleChange(info){
        if (info.file.status === 'done') {
            console.log('info',info)
            this.setState({
                imageUrl:info.file.response.avatar+'?t='+new Date()
            })
            // Get this url from response in real world.
            //getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }

    render(){
        // console.log('table',this.props)
        const imageUrl = this.state.imageUrl;
        const pagination = {
            total:this.props.blogCount,
            pageSize:10,
            onChange:this.pageChange.bind(this)
        }

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            render: (text,col)=> {
                let blogUrl = '/blog/'+col.id
                return<a href={blogUrl}>{text}</a>
            },
        }, {
            title: '日期',
            dataIndex: 'createTime',
            render: (text,col)=>{
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
                <div>
                    <h3>上传头像(upload portrait)</h3>
                        <Upload
                            className="avatar-uploader"
                            name="file"
                            showUploadList={false}
                            action="/api/uploadAvatar"
                            beforeUpload={beforeUpload}
                            onChange={(info)=>this.handleChange(info)}
                        >
                            {
                                imageUrl ?
                                    <img src={imageUrl} alt="" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                </div>
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