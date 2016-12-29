/**
 * Created by dantegg on 16-12-29.
 */
const router = require('koa-router')()
const path = require('path')
const send = require('koa-send')
router.prefix('/api')
router.post('/test',async(ctx)=>{
    ctx.body = {
        foo:'bar',
        headers:ctx.headers,
        postBody:ctx.request.body
    }
})

export default router