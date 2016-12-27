/**
 * Created by dantegg on 16-12-21.
 */
const router = require('koa-router')()

exports.router = router

router.get('/',async(ctx)=>{
    //ctx.body = 'init koa'
    //console.log(ctx.body)
    //const isLogin = false
    //await ctx.render(isLogin?'home':'welcome')
    ctx.body = `
  <!doctype html>
  <html>
    <head>
      <title>haha</title>
    </head>
    <body>
      <div id="root">123</div>
      <script>
      </script>
    </body>
  </html>
`
    //const isLogin = false
    //await ctx.render(isLogin?'home':'welcome')
})


router.post('/test',async(ctx)=>{
    ctx.body = {
        foo:'bar',
        headers:ctx.headers,
        postBody:ctx.request.body
    }
})