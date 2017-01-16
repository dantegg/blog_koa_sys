/**
 * Created by dantegg on 17-1-16.
 */
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const views = require('koa-views')
const convert = require('koa-convert')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

let SESSION_CONFIG = {
    key: 'blog20170101',
    maxAge:360000,
    overWrite:true,
    httpOnly:true,
    signed:true
}

app.keys=['blog20170101']
app.env='development'
app.use(logger())
const router = require('./routes')
app.use(async (ctx,next)=>{
    const start = new Date()
    await next()
    const ms = new Date() -start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(bodyparser())
app.use(json())
app.use(mount('/static',require('koa-static')(__dirname+'/dist')))
app.use(views(__dirname+'/dist/views/prod',{map: {html: 'ejs'}}))
app.use(convert(session(SESSION_CONFIG,app)))
app.use(router)

app.on('error',function (err,ctx) {
    console.log(err)
    logger.error('server error',err,ctx)
})
app.listen(3000,function () {
    console.log('app started,http://localhost:3000,ctrl-c to terminate')
})

module.exports = app