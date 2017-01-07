/**
 * Created by dantegg on 17-1-5.
 */
import React,{Component} from 'react'
import {MarkdownEditor} from 'react-markdown-editor'
import Head from './head'
import {Button,Input} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import {browserHistory} from 'react-router'
import spaceStyle from '../css/space.css'

const FETCH_POST = {
    method:'post',
    credentials: 'include',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/plain,*/*;q=0.01'
    },
}


export default class Space extends Component{
    constructor(props){
        super(props)
        this.state={
            //editorState:null
        }
    }

    componentDidMount(){
        if(!this.props.isLogin){
            browserHistory.push('/')
        }
    }

    postBlog(){
        console.log('ref',this.refs.title.refs.input.value)
        console.log('ref',this.refs.editor.state.content)
        let title = this.refs.title.refs.input.value
        let content = this.refs.editor.state.content
        let fetchData = FETCH_POST
        fetchData.body=`title=${title}&content=${content}`
        fetch('/api/postblog',fetchData).then(res=>{
            if(res.ok){
                console.log(res)
            }
        })
    }

    onEditorStateChange(){
        console.log('123')
    }

    uploadImageCallBack(){

    }

    render(){
        console.log('space',this.props)
        return(
            <div style={{height:'100%'}}>
                <Head currentPath={this.props.location.pathname}/>
                <div className={spaceStyle.spacePart}>
                    <div className={spaceStyle.spaceTitle}>发个新日志吧</div>
                    <div className={spaceStyle.spaceEditorTitle}>
                        <h1>标题</h1>
                        <Input style={{width:'100%'}} ref="title"/>
                    </div>
                    <div style={{width:'800px',margin:'0 auto',fontWeight:'bold',fontSize:'1rem'}}>
                        <h1>正文</h1>
                    </div>
                    <div className={spaceStyle.spaceEditor}>

                        <MarkdownEditor initialContent="Test" iconsSet="font-awesome" ref="editor"/>
                    </div>
                    <div className={spaceStyle.spacePost}>
                        <Button type="primary" onClick={this.postBlog.bind(this)}>post</Button>
                    </div>
                </div>

            </div>
        )
    }
}