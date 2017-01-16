/**
 * Created by dantegg on 2017/1/10.
 */
import React,{Component} from 'react'
import Head from './head'
import ReactMarkdown from 'react-markdown'
import marked from 'marked'

import blogStyle from '../css/blog.css'

class Blog extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentWillReceiveProps(nextProps){
        console.log('next',nextProps)
    }

    render(){
        console.log('this props',this.props)
        if(this.props.oneBlog ===undefined){
             return(
                 <div>!!</div>
             )
        }
        return(
            <div>
                <Head/>
                <div className={blogStyle.blogMain}>
                    <h1>{this.props.oneBlog.title}</h1>
                    <div style={{color:"#919191"}}>{this.props.oneBlog.createTime}</div>
                    <div style={{marginTop:'30px'}} key="content" dangerouslySetInnerHTML={{__html:marked(this.props.oneBlog.content)}}>
                        {/*<ReactMarkdown source={this.props.oneBlog.content}  />*/}
                    </div>
                </div>
            </div>
        )
    }
}


export default Blog