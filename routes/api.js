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
        //ctx.status = 301
        //ctx.redirect('/')
        ctx.body={
            success:false,
            msg:'password or username is wrong'
        }
        //return
    }
    if(body.password !== user.password){
        ctx.body={
            success:false,
            msg:'password or username is wrong'
        }
    }
    ctx.session.userId = user._id
    ctx.body={
        success:true,
        msg:'login success'
    }
    //ctx.redirect('/space')
})

router.get('/logout',async(ctx)=>{
    ctx.session = null
    ctx.body={
        "success":true,
        "msg":"logout success"
    }
})

router.get('/user',async(ctx)=>{
    const userId = ctx.session.userId
    const user = await models.user.get(userId)
    ctx.body = user ||{}
})

router.post('/postblog',async (ctx)=>{
    const body = ctx.request.body
    const blog = {
        title:body.title,
        content:body.content,
        createTime:Date.now()
    }
    // let sss = await models.blog.findNews().toArray((err,items)=>{
    //     console.log(items)
    // })
    // console.log(sss)
    ctx.body = await models.blog.create(blog)
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