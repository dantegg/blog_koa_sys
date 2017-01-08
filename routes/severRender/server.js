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
    //let isLogin = !!ctx.session.userId
    //const news = await services.news.getNews()
    //console.log('news========',news)
    let store = configureStore({
        //welcomeInfo:news,
        isLogin:!!ctx.session.userId
    })
    let prefetchTasks = []
    //console.log('componet',renderProps.components.length)
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
        //console.log('news========',news)
        store = configureStore({
            welcomeInfo:news,
            isLogin:!!ctx.session.userId
        })
    }

    if(renderProps.location.pathname === '/manage'){
        let time = Date.now()
        //console.log('time',time)
        const news = await models.blog.findBlogs(time).toArray()
        //console.log('news',news)
        let blogs = await services.news.normalizedList(news)
        //console.log('blogs',blogs)
        store = configureStore({
            welcomeInfo:blogs,
            isLogin:!!ctx.session.userId
        })
    }
    //     let newsArray = []
    //     await models.blog.findNews().toArray((err,items)=>{
    //         console.log('22222223356666')
    //
    //         items.map(x=>{
    //             newsArray.push({
    //                 "title":x.title,
    //                 "content":x.content,
    //                 "createTime":x.createTime
    //             })
    //         })//console.log(items)
    //
    //     })
    //     console.log('nnnnnnnnnnnnnnnnnnnnn')

    // }

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


