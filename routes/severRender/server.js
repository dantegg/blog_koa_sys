/**
 * Created by dantegg on 2017/1/2.
 */
import React from 'react'
import { RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../../client/store/configureStore'


export default async (ctx, next, renderProps) => {
    const route = renderProps.routes[renderProps.routes.length - 1]
    //let isLogin = !!ctx.session.userId
    let store = configureStore({
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