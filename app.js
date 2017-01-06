/**
 * Created by dantegg on 2016/12/20.
 */
'use strict'
process.env.NODE_ENV = 'development'
console.log('waiting for webpacking')
//require('babel-polyfill')
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
})
// Css require hook
require('css-modules-require-hook')({
    extensions: ['.css'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    //generateScopedName: '[local]'
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

require('asset-require-hook')({
    extensions:['jpg','jpeg','png','gif','svg','tif','tiff','webp'],
    name:'/build/[name].[ext]',
    limit:1000
})
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const webpack = require('webpack')
const KWM = require('koa-webpack-middleware')
const devMiddleware = KWM.devMiddleware
const hotMiddleware = KWM.hotMiddleware
//const middleware = require('./middlewares')
const webpackConfig = require('./webpack.development')
const compiler = webpack(webpackConfig)
const views = require('koa-views')
const convert = require('koa-convert')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const devMiddlewareInstance = devMiddleware(compiler,{
    noInfo: true,
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: false
    // },
    // //hot:true,
    publicPath: webpackConfig.output.publicPath,
    //publicPath: '/public',
    // headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    }
})

const hotMiddlewareInstance = hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
})

compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            console.log('sss',key)
            file = path.resolve(__dirname, key)
            console.log('file',file)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

app.keys=['blog20170101']
app.env='development'
app.use(logger())

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

app.use(views(__dirname+'/views/dev',{map: {html: 'ejs'}}))
app.use(convert(session(app)))
//app.use(middleware)
app.use(router)
//app.use(router.routes(),router.allowedMethods())

app.on('error',function (err,ctx) {
    console.log(err)
    logger.error('server error',err,ctx)
})




app.use(convert(devMiddlewareInstance))
app.use(convert(hotMiddlewareInstance))

app.listen(3000,function () {
    console.log('app started,http://localhost:3000,ctrl-c to terminate')
})

module.exports = app

