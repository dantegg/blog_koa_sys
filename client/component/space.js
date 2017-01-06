/**
 * Created by dantegg on 17-1-5.
 */
import React,{Component} from 'react'
import Head from './head'
import {Button} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import {browserHistory} from 'react-router'
import spaceStyle from '../css/space.css'
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
                    <div className={spaceStyle.spaceTitle}>发个新日志</div>
                    <div className={spaceStyle.spaceEditor}>
                        {/*<Editor/>*/}
                    </div>
                    <div className={spaceStyle.spacePost}>
                        <Button type="primary">post</Button>
                    </div>
                </div>

            </div>
        )
    }
}