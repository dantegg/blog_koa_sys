/**
 * Created by dantegg on 2016/12/20.
 */
'use strict'
process.env.NODE_ENV = 'production'
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
})

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
const compress = require('koa-compress')
const Koa = require('koa')
const app = new Koa()
app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))
const session = require('koa-session')

const views = require('koa-views')
const convert = require('koa-convert')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const SESSION_CONFIG = {
    key: 'blog20170101',
    maxAge:3600000,
    overWrite:true,
    httpOnly:true,
    signed:true
}

app.keys=['blog20170101']
app.env='development'
app.use(logger())
const router = require('./routes')


app.use(views(__dirname+'/views/prod',{map: {html: 'ejs'}}))

app.use(bodyparser())
app.use(json())
app.use(convert(session(SESSION_CONFIG,app)))
app.use(router)
app.use(mount('/static',require('koa-static')(__dirname+'/public')))
app.use(mount('/upload', require('koa-static')(__dirname + '/upload')))






app.listen(3000,function () {
    console.log('app started,http://localhost:80,ctrl-c to terminate')

})

module.exports = app

