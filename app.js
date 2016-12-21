/**
 * Created by dantegg on 2016/12/20.
 */
'use strict'

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const router = require('./routes').router

app.use(logger())

app.use(async (ctx,next)=>{
    const start = new Date()
    await next()
    const ms = new Date() -start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(mount('/static',require('koa-static')(__dirname+'/public')))

app.use(bodyparser())
app.use(json())


app.use(views(__dirname+'/views',{
    extension:'html'
}))
app.use(router.routes(),router.allowedMethods())

app.on('error',function (err,ctx) {
    console.log(err)
    logger.error('server error',err,ctx)
})

// app.use(async function(ctx,next) {
//     var startTime = Date.now()
//     console.log(1)
//     await next()
//     console.log(4)
// })
//
// app.use(async function(ctx) {
//     console.log(2)
//     var value = await foo(1)
//     ctx.body = value
//     console.log(3)
// })
//
// async function foo(x) {
//     return await Promise.resolve(x+1)
// }


app.listen(3000)

module.exports = app