/**
 * Created by dantegg on 16-12-21.
 */
const router = require('koa-router')()

exports.router = router

router.get('/',async(ctx)=>{
    ctx.body = 'init koa'
    const isLogin = false
    await ctx.render(isLogin?'home':'welcome')
})


router.post('/test',async(ctx)=>{
    ctx.body = {
        foo:'bar',
        headers:ctx.headers,
        postBody:ctx.request.body
    }
})