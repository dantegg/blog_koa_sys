/**
 * Created by dantegg on 17-1-4.
 */
import React,{Component} from 'react'
// import {PrismCode} from 'react-prism'
import homeStyle from '../css/home.css'
import ReactMarkdown from 'react-markdown'
import {Button} from 'antd'
import QueueAnim from 'rc-queue-anim'
import Animate from 'rc-animate'
import Head from './head'

import DateFormat from '../../util'

export default class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            showSlogan:true
        }
    }
    componentDidMount(){
    }

    onEnter(){
        this.setState({
            showSlogan:false
        })
    }

    go2blog(id){
        console.log('blog',id)
        window.location.href='/blog/'+id
    }

    render(){
            let comp = this
            return(
                <div style={{height:'100%'}}>
                    <Head currentPath={this.props.location.pathname}/>
                    <Animate showProp="visible" transitionName="fade-leave">
                        {this.state.showSlogan ?
                            <div className={homeStyle.homeSlogan} key="6">
                                <div key="1">吾生也有涯，而知也无涯，以有涯随无涯，殆已</div>
                                <div style={{textAlign:'right'}} key="2">——— 庄子</div>
                                <Button type="ghost" onClick={this.onEnter.bind(this)} key="3">进入</Button>
                            </div>:null
                        }
                    </Animate>
                    <Animate showProp="visible" transitionName="fade-enter">

                        {!this.state.showSlogan ?
                            <div key="5" className={homeStyle.homeNews}>
                                {this.props.welcomeInfo.map(x=>{
                                    {/*let newdate = new Date()*/}
                                    {/*newdate.setTime(x.createTime)*/}
                                    //console.log(newdate.toLocaleDateString())
                                    return(
                                        <div key={comp.props.welcomeInfo.indexOf(x)} className={homeStyle.homeNewsItem} onClick={()=>this.go2blog(x.id)}>
                                            <div style={{width:'100%'}}>
                                                <h1 style={{display:'inline-block',width:'70%'}}>{x.title}</h1>
                                                <h5 style={{display:'inline-block',textAlign:"right",width:'30%'}}>{x.createTime}</h5>
                                            </div>
                                            <ReactMarkdown source={x.content} key="4"/>
                                        </div>
                                    )
                                })}
                            </div>:null
                        }

                    </Animate>
                </div>
            )
    }
}