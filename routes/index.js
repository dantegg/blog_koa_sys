/**
 * Created by dantegg on 16-12-21.
 */
const router = require('koa-router')()
const path = require('path')
const send = require('koa-send')
exports.router = router


router.get('/',async(ctx)=>{
    ctx.body = `
  <!doctype html>
  <html>
    <head>
      <title>haha</title>
    </head>
    <body>
      <div id="root">123SS</div>
      <script>
      </script>
    </body>
  </html>
`
    //console.log(ctx.body)
    //await ctx.render(isLogin?'home':'welcome')
    await send(ctx,ctx.path, { root: path.resolve(__dirname, './static') })
    // const isLogin = false
    // await ctx.render(isLogin?'home':'welcome')
})


router.post('/test',async(ctx)=>{
    ctx.body = {
        foo:'bar',
        headers:ctx.headers,
        postBody:ctx.request.body
    }
})