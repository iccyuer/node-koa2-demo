const Router = require('koa-router')
const logo = new Router()


logo.get('/', async (ctx, next) => {
  console.log(ctx.url)
  ctx.response.body = 'logo-index'
  // await next()
})

module.exports = logo