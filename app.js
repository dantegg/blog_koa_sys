/**
 * Created by dantegg on 2016/12/20.
 */
'use strict'
process.env.NODE_ENV = 'development'
// console.log('waiting for webpacking')
// require('babel-polyfill')
// require('babel-core/register')({
//     plugins:[
//         ['babel-plugin-transform-require-ignore',{
//         extensions:['.less','.css']
//         }],
//         ['inline-replace-variables',{
//         __SERVER__:true
//         }]
//     ]
// })
//
// require('asset-require-hook')({
//     extensions:['jpg','jpeg','png','gif','svg','tif','tiff','webp'],
//     name:'/build/[name].[ext]',
//     limit:1000
// })
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const webpack = require('webpack')
const KWM = require('koa-webpack-middleware')
const devMiddleware = KWM.devMiddleware
const hotMiddleware = KWM.hotMiddleware
const webpackConfig = require('./webpack.development')
const compiler = webpack(webpackConfig)
const chokidar = require('chokidar')
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const devMiddlewareInstance = devMiddleware(compiler,{
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    //hot:true,
    publicPath: webpackConfig.output.publicPath,
    //publicPath: '/public',
    // headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    }
})

const hotMiddlewareInstance = hotMiddleware(compiler, {
    log: console.log,
    //path: '/__webpack_hmr',
    heartbeat: 10 * 1000
})


app.env='development'
app.use(logger())
app.use(devMiddlewareInstance)
app.use(hotMiddlewareInstance)
const router = require('./routes')
app.on('error', function (err, ctx) {
    console.log('error occured:', err.stack)
})
app.use(async (ctx,next)=>{
    const start = new Date()
    await next()
    const ms = new Date() -start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



app.use(bodyparser())
app.use(json())
app.use(mount('/static',require('koa-static')(__dirname+'/public')))

app.use(views(__dirname+'/views',{
    extension:'ejs'
}))

app.use(router)
// app.use(router.routes(),router.allowedMethods())

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
var watcher = chokidar.watch([
    path.join(__dirname, './client'),
    //path.join(__dirname, '../platforms')
])




app.listen(3000,function () {
    console.log('app started,http://localhost:3000,ctrl-c to terminate')
    watcher.on('ready', function () {
        watcher.on('all', function (e, p) {
            console.log("Clearing module cache");
            Object.keys(require.cache).forEach(function(id) {
                if (/[\/\\](app|platforms)[\/\\]/.test(id)) delete require.cache[id];
            });
        })
    })
})

module.exports = app

