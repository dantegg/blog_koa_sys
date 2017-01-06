/**
 * Created by dantegg on 16-12-29.
 */
const router = require('koa-router')()
const path = require('path')
const send = require('koa-send')
router.prefix('/api')

router.get('/session/get',async(ctx)=>{
    ctx.body = ctx.session
})

router.get('/session/set',async(ctx)=>{
    ctx.session.foo = 'bar'
    ctx.session.time = Date.now()
    ctx.body = ctx.session
})

router.get('/session/reset',async(ctx)=>{
    ctx.session = null
    ctx.body = 'reseted'
})

router.post('/test',async(ctx)=>{
    ctx.body = {
        foo:'bar',
        test:'zzz',
        headers:ctx.headers,
        postBody:ctx.request.body
    }
})

export default router