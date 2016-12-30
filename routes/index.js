/**
 * Created by dantegg on 16-12-21.
 */
import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

//const router = new Router()




export default async (ctx, next) => {
    // api server through koa-router
    if (ctx.path.match(/^\/api/)) {
        return await require('./api').routes()(ctx, next)
    }else if(!ctx.path.match(/^\/zzz/)){
        await require('./render')(ctx, next)
    }else{
        await next()
    }
    // others react-router to render
}


//export default router

