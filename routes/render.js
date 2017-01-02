/**
 * Created by dantegg on 16-12-29.
 */
import React from 'react'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'
//import { Provider } from 'react-redux'
//import Head from '../client/component/head'
import route from '../client/route'
import renderCtrl from './severRender/server'


function _match (location) {
    return new Promise((resolve, reject) => {
        match(location, (error, redirectLocation, renderProps) => {
            if (error) {
                return reject(error)
            }
            resolve({redirectLocation, renderProps})
        })
    })
}
export default async(ctx,next)=>{
    //let _renderProps
    try{
        const { redirectLocation, renderProps } = await _match({ routes: route, location: ctx.url })
        // match({route, location: ctx.url}, (error, redirectLocation, renderProps) => {
        //     _renderProps = renderProps
        // })
        if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            //console.log('render props',renderProps)
            await renderCtrl(ctx, next, renderProps)
        } else {
            await next()
        }
    }catch (e){
        console.error('Server-Render Error Occurs: %s', e.stack)
        await ctx.render('500', {
            msg: ctx.app.env === 'development' ? e.message : false
        })
    }


    // if (_renderProps) {
    //     console.log('123')
    //     const isLogin = false
    //     await ctx.render(isLogin?'home':'welcome', {
    //         root: renderToString(
    //             <Provider store={store}>
    //                 <RouterContext {..._renderProps}/>
    //             </Provider>
    //         ),
    //         state: store.getState()
    //     })
    // } else {
    //     console.log('233')
    //     await next()
    // }
//     ctx.body = `
//   <!doctype html>
//   <html>
//     <head>
//       <title>haha</title>
//     </head>
//     <body>
//       <div id="root">123SS</div>
//       <script>
//       </script>
//       <script src="/zzz/app.js" charset="utf-8"></script>
//     </body>
//   </html>
// `
    //console.log('ctx.path',path.resolve(__dirname, '../static'))
    //console.log(ctx.body)
    //await ctx.render(isLogin?'home':'welcome')
    //await send(ctx,ctx.path, { root: path.resolve(__dirname, './static') })

    // await ctx.render(isLogin?'home':'welcome',{
    //     state: store.getState(),
    //     app: renderToString(<Provider store={store}>
    //         <RouterContext {...renderProps} />
    //     </Provider>)
    // })
}