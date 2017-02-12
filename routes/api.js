/**
 * Created by dantegg on 16-12-29.
 */
const models = require('../models')
const services = require('../services')
const router = require('koa-router')()
const path = require('path')
const multiparty = require('multiparty')
const fs = require('fs')
const joinPath = require('path').join
router.prefix('/api')

router.post('/login',async(ctx)=>{
    const body = ctx.request.body
    const user = await models.user.getByEmail(body.email)
    //console.log("user",!user)
    if(!user){
        console.log("user",!user)
        //ctx.status = 301
        //ctx.redirect('/')
        ctx.body={
            success:false,
            msg:'password or username is wrong'
        }
        return
    }
    if(body.password !== user.password){
        ctx.body={
            success:false,
            msg:'password or username is wrong'
        }
        return
    }
    ctx.session.userId = user._id
    //console.log('user is',body.email,'login time is',new Date())
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
    if(!ctx.session.userId){
        ctx.body={
            success:false
        }
        return
    }
    const body = ctx.request.body
    //console.log('body',body)

    const blog = {
        title:body.title,
        content:body.content,
        createTime:Date.now(),
        tagId:body.tagList
    }
    ctx.body = await models.blog.create(blog)
})


router.post('/moreNews',async (ctx)=>{
    const body = ctx.request.body
    let list = await services.news.getNews(body.nextPage)
    ctx.body = list
})

router.get('/getAllTags',async (ctx)=>{
    let list = await models.tag.findAllTags().toArray()
    ctx.body = await services.news.normalizedTagList(list)
})

router.post('/createTag',async(ctx)=>{
    console.log(ctx.session.userId)
    if(!ctx.session.userId) {
        ctx.body={
            success:false
        }
        return
    }
    const body = ctx.request.body
    const tag = {
        tagName:body.tagName
    }
    let result = await models.tag.create(tag)
    if(!!result){
        ctx.body={
            success:true
        }
    }else{
        ctx.body={
            success:false
        }
    }

})

const uploadDir = joinPath(__dirname,'../upload')

const parseMultipart = (req, opts) => new Promise((resolve, reject) => {
    const form = new multiparty.Form(opts)
    form.parse(req, (err, fields, files) => {
        if (err) {
            reject(err)
        } else {
            resolve(files)
        }
    })
})

//上传头像 upload avatar
router.post('/uploadAvatar',async (ctx)=>{

    if(!ctx.session.userId) {
        ctx.body={
            success:false
        }
        return
    }
    //console.log(ctx.session.userId)
    const files = await parseMultipart(ctx.req, {
        uploadDir: uploadDir
    })
    //console.log('files',files.file[0])
    var newPath = files.file[0].path.replace(uploadDir, '')
    //fs.unlinkSync(uploadDir+'/avatar.jpg')
    fs.rename(files.file[0].path,uploadDir+'/avatar.jpg')
    //console.log('newpath',newPath)
    var url = 'http://localhost:3000/upload/avatar.jpg'
    //console.log('new path',url)
    ctx.body = {
        avatar: url
    }
})

router.post('/findBlogByPage',async(ctx)=>{
    const body = ctx.request.body
    let findTime = ''
    if(body.id === undefined){
        findTime = Date.now()
    }else{
        let record = await models.blog.find({_id:body.id})
        findTime = record.createTime
    }
    let blogs = await models.blog.findBlogs(findTime).toArray()
    ctx.body = await services.news.normalizedList(blogs)
})


//分页查询博客 a simple pagination
router.post('/findBlogBySimplePagination',async(ctx)=>{
    const body = ctx.request.body
    let currentPage = body.currentPage
    let pageSize = body.pageSize
    let blogs = await models.blog.findBlogByPage(currentPage,pageSize)
    let blogList = await services.news.normalizedList(blogs)
    let blogCount = await models.blog.findBlogSize()
    ctx.body = {
        blogList:blogList,
        blogCount:blogCount
    }
})


//删除博客 delete blog
router.post('/deleteblog',async(ctx)=>{
    if(!ctx.session.userId){
        ctx.body={
            success:false
        }
        return
    }
    //console.log('sss',ctx.request.body)
    let body = ctx.request.body
    let id = body.id
    let currentPage = parseInt(body.currentPage)
    let pageSize = parseInt(body.pageSize)
    await models.blog.del(id)
    let blogs = await models.blog.findBlogByPage(currentPage,pageSize)
    let blogList = await services.news.normalizedList(blogs)
    let blogCount = await models.blog.findBlogSize()
    ctx.body = {
        blogList:blogList,
        blogCount:blogCount
    }
})

router.post('/getBlogById',async(ctx)=>{
    let body = ctx.request.body
    let blogId = body.blogId
    ctx.body = await models.blog.get(blogId)
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