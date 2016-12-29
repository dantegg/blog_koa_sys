/**
 * Created by dantegg on 16-12-29.
 */


export default async(ctx,next)=>{
//     ctx.body = `
//   <!doctype html>
//   <html>
//     <head>
//       <title>haha</title>
//     </head>
//     <body>
//       <div id="root">123SS</div>
//       <script>
//       </script>
//       <script src="/zzz/app.js" charset="utf-8"></script>
//     </body>
//   </html>
// `
    //console.log('ctx.path',path.resolve(__dirname, '../static'))
    //console.log(ctx.body)
    //await ctx.render(isLogin?'home':'welcome')
    //await send(ctx,ctx.path, { root: path.resolve(__dirname, './static') })
    const isLogin = false
    await ctx.render(isLogin?'home':'welcome')
}