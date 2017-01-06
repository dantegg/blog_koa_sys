/**
 * Created by dantegg on 16-12-29.
 */

const models = require('../models')
const router = require('koa-router')()
const path = require('path')
router.prefix('/api')

router.post('/login',async(ctx)=>{
    const body = ctx.request.body
    const user = await models.user.getByEmail(body.email)
    console.log("user",!user)
    if(!user){
        console.log("user",!user)
        ctx.status = 301
        ctx.redirect('/')
        return
    }
    if(body.password !== user.password){
        ctx.redirect('/?err=error')
        return
    }
    ctx.session.userId = user._id
})

router.get('/logout',async(ctx)=>{
    ctx.session = null
    ctx.redirect('/')
})

router.get('/user',async(ctx)=>{
    const userId = ctx.session.userId
    const user = await models.user.get(userId)
    ctx.body = user ||{}
})

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