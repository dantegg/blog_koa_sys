/**
 * Created by dantegg on 2017/1/2.
 */
const models = require('../../models')
import React from 'react'
import { RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../../client/store/configureStore'
const services = require('../../services')

export default async (ctx, next, renderProps) => {
    const route = renderProps.routes[renderProps.routes.length - 1]
    let store = configureStore({
        isLogin:!!ctx.session.userId
    })
    let prefetchTasks = []
    for (let component of renderProps.components) {

        if (component && component.WrappedComponent && component.WrappedComponent.fetch) {
            const _tasks = component.WrappedComponent.fetch(store.getState(), store.dispatch)
            if (Array.isArray(_tasks)) {
                prefetchTasks = prefetchTasks.concat(_tasks)
            } else if (_tasks.then) {
                prefetchTasks.push(_tasks)
            }
        }
    }


    if(renderProps.location.pathname === '/home'){
        const news = await services.news.getNews()
        store = configureStore({
            welcomeInfo:news,
            isLogin:!!ctx.session.userId
        })
    }

    // let re = /\/blog\/./
    // if(re.test(renderProps.location.pathname)){
    //     let blogId = renderProps.location.pathname.substr(6)
    //     let checkId = await models.blog.checkId(blogId)
    //     if(checkId){
    //         const getOneBlog = await models.blog.get(blogId)
    //         let oneBlog = await services.news.normalized(getOneBlog)
    //         store = configureStore({
    //             isLogin:!!ctx.session.userId,
    //             oneBlog:oneBlog
    //         })
    //     }else{
    //         ctx.redirect('/',{})
    //     }
    //
    // }

    if(renderProps.location.pathname === '/manage'){
       //console.log('enter manage')
        const initBlogs = await models.blog.findBlogByPage(1,10
        )
        const blogCount = await models.blog.findBlogSize()
        //console.log('news',news)
        let blogs = await services.news.normalizedList(initBlogs)
        console.log('blogs',blogCount)
        store = configureStore({
            welcomeInfo:blogs,
            isLogin:!!ctx.session.userId,
            blogCount:blogCount
        })
    }

    await Promise.all(prefetchTasks)
    await ctx.render('home', {
        //title: config.title,
        // dev: ctx.app.env === 'development',
        // reduxData: store.getState(),
        // app: renderToString(<Provider store={store}>
        //     <RouterContext {...renderProps} />
        // </Provider>)
        reduxState: store.getState(),
        root: renderToString(<Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>)
    })
}


