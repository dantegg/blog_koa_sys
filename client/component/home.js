/**
 * Created by dantegg on 17-1-4.
 */
import React,{Component} from 'react'
// import {PrismCode} from 'react-prism'
import homeStyle from '../css/home.css'
//import ReactMarkdown from 'react-markdown'
import {Button,Icon,Tag} from 'antd'
//import QueueAnim from 'rc-queue-anim'
import Animate from 'rc-animate'
import Head from './head'
import marked from 'marked'
import '../css/fade.css'

export default class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            showSlogan:true,
            currentPage:1
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

    moreNews(){
        let nextPage = parseInt(this.state.currentPage) +1
        this.props.getMoreNews(nextPage,()=>{
            this.setState({
                currentPage:nextPage
            })
        })
    }

    render(){
            let comp = this
        //console.log('this.props',this.props)
        let showMoreStyle =  this.props.welcomeInfo.length <10?'none':'block'
            return(
                <div style={{height:'100%'}}>
                    <Head currentPath={this.props.location.pathname}/>
                    <Animate transitionAppear transitionName="fade">
                        {this.state.showSlogan ?
                            <div className={homeStyle.homeSlogan} key="6">
                                <div key="1">吾生也有涯，而知也无涯，以有涯随无涯，殆已</div>
                                <div style={{textAlign:'right'}} key="2">——— 庄子</div>
                                <div style={{textAlign:'center',marginTop:'20px'}}>
                                <Button type="ghost" onClick={this.onEnter.bind(this)} key="3" shape="circle" icon="smile-o"/>
                                </div>
                            </div>:
                            <div>
                            <div style={{float:'left',fontSize:'1.5rem',padding:'50px'}}>
                                <Icon type="github" style={{cursor:'pointer'}} onClick={function () {
                                    window.open('https://github.com/dantegg')
                                }}/>
                            </div>
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
                                                <div>{x.tags.map(t=>{
                                                    return <Tag color="#108ee9" key={x.tags.indexOf(t)}>{t}</Tag>
                                                })}</div>
                                            </div>
                                            <div className={homeStyle.homeNewsItemMarkdown} key="4" dangerouslySetInnerHTML={{__html:marked(x.content)}}>
                                                {/*<ReactMarkdown source={x.content} key="4"/>*/}
                                                {/*{marked(x.content)}*/}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div style={{textAlign:'center',height:'100px',lineHeight:'100px',display:showMoreStyle,cursor:'pointer'}} onClick={()=>this.moreNews()}>
                                    <button className={homeStyle.button+' '+homeStyle.buttonThreed+' '+homeStyle.buttonCaution+' '+homeStyle.buttonRounded}> more</button>
                                </div>
                                <div style={{textAlign:'center',height:'100px',lineHeight:'100px',display:showMoreStyle}}>
                                    2017
                                </div>

                            </div>
                            </div>
                        }
                    </Animate>

                </div>
            )
    }
}