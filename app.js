/**
 * Created by dantegg on 2016/12/20.
 */
var Koa = require('koa')
var app = new Koa()

app.use(async function(ctx,next) {
    var startTime = Date.now()
    console.log(1)
    await next()
    console.log(4)
})

app.use(async function(ctx) {
    console.log(2)
    var value = await foo(1)
    ctx.body = value
    console.log(3)
})

async function foo(x) {
    return await Promise.resolve(x+1)
}

app.listen(3000)