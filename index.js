const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const router = new Router()

// router.get('/', (ctx, next) => {
//   ctx.body = '/'
// })

// app
//   .use(router.routes())
//   .use(router.allowedMethods)

// 跨域
// app.use(async (ctx, next) => {
//   await ctx.set('Access-Control-Allow-Origin', '*')
//   await ctx.set('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
//   await ctx.set('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
//   if (ctx.request.method.toLowerCase() == 'options') ctx.respond.send(200)
//   //让options尝试请求快速结束
//   else await next()
// })

// 跨域模块
app.use(cors())

// 配置post解析
app.use(bodyParser({
  enableTypes: ['json', 'form']
}))

// 静态资源访问
app.use(static(path.join(__dirname, './static')))

// 简单使用
app.use(async (ctx, next) => {
  ctx.body = 'Hello World'
  await next()
})

// 导入模块
const routers = fs.readdirSync(__dirname + '/router')
routers.forEach(route => {
  let module = require(__dirname + '/router/' + route)
  router.use('/' + route.replace('.js', ''), module.routes())
})
app
  .use(router.routes())
  .use(router.allowedMethods())

// 监听端口
app.listen(3000)