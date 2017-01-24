/**
 * Created by dantegg on 17-1-5.
 */
import React,{Component} from 'react'
import {MarkdownEditor} from 'react-markdown-editor'
import Head from './head'
import {Button,Input,notification,Tag,Modal} from 'antd'
import {browserHistory} from 'react-router'
import '../css/space.css'
import queryString from 'query-string'
import {FETCH_POST} from '../util/fetchConfig'
const CheckableTag = Tag.CheckableTag

export default class Space extends Component{
    constructor(props){
        super(props)
        this.state={
            //reRender:false
            selectedTags:[]
        }
    }

    componentWillMount(){

    }

    componentDidMount(){
        if(!this.props.isLogin){
            browserHistory.push('/')
        }
        this.props.getAllTags()
    }

    tagChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
        //console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }


    postBlog(){
        let comp = this
        let title = this.refs.title.refs.input.value
        let content = this.refs.editor.state.content
        if(title===null||content===null){
            notification.error({
                message:'错误',
                description:'请输入标题和正文'
            })
            return
        }

        //console.log('this state',this.state.selectedTags)

        let fetchData = FETCH_POST
        fetchData.body=queryString.stringify({
            title:title,
            content:content,
            tagList:this.state.selectedTags.map(x=>{return x.id})
        })
        //console.log('fetch',fetchData)
        //fetchData.body=`title=${title}&content=${content}`
        fetch('/api/postblog',fetchData).then(res=>{
            if(res.ok){
                console.log(res)
                if(res.status === 200){
                    notification.success({
                        message:'成功',
                        description:'发布博客成功'
                    })
                    comp.setState({
                        reRender:!comp.state.reRender,
                        selectedTags:[]
                    })
                    comp.refs.title.refs.input.value = ''
                    document.getElementsByTagName("textarea")[0].value=''
                }
            }
        })
    }


    uploadImageCallBack(){

    }

    openAddTagModal(){
        this.setState({
            modalVisible:true
        })
    }

    cancelAddTagModal(){
        this.setState({
            modalVisible:false
        })
    }

    addNewTag(){
        let newTagName = this.refs.newTag.refs.input.value
        //console.log('new tag',newTagName)
        this.props.addTag(newTagName)
        this.setState({
            modalVisible:false
        })
    }

    go2Manage(){
        window.location.href='/manage'
        //browserHistory.push('/manage')
    }

    render(){
       //console.log('space',this.props)
        const { selectedTags } = this.state;
        const tagsFromServer = this.props.allTags
        return(
            <div style={{height:'100%'}}>
                <Head currentPath={this.props.location.pathname}/>
                <div className="space-manage"><Button type="ghost" shape="circle" icon="setting" onClick={this.go2Manage.bind(this)} /></div>
                <div className="space-part">
                    <div className="space-title">发个新日志吧</div>
                    <div className="space-editor-title">
                        <h1>标题</h1>
                        <Input style={{width:'100%'}} ref="title"/>
                    </div>
                    <div style={{width:'800px',margin:'0 auto',fontWeight:'bold',fontSize:'1rem'}}>
                        <h1>正文</h1>
                    </div>
                    <div className="space-editor">
                        <MarkdownEditor initialContent="text" iconsSet="font-awesome" ref="editor"/>
                    </div>
                    <div style={{paddingLeft:"20px",paddingTop:"20px"}}>选择一个标签</div>
                    <div style={{paddingLeft:"20px",paddingRight:'20px'}}>
                        <strong>Tags: </strong>
                        {tagsFromServer.map(tag => (
                            <CheckableTag
                                key={tag.id}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.tagChange(tag, checked)}
                            >
                                {tag.tagName}
                            </CheckableTag>
                        ))}
                    </div>
                    <div style={{paddingLeft:"20px"}}>
                        <Button type="ghost" size="small" onClick={()=>this.openAddTagModal()}>+添加标签</Button>
                    </div>
                    <div className="space-post">
                        <Button type="primary" onClick={this.postBlog.bind(this)}>post</Button>
                    </div>
                </div>
                <Modal title="new tag" visible={this.state.modalVisible}
                       onOk={()=>this.addNewTag()} onCancel={()=>this.cancelAddTagModal()}
                       okText="OK" cancelText="Cancel"
                >
                    <Input ref="newTag"/>
                </Modal>

            </div>
        )
    }
}