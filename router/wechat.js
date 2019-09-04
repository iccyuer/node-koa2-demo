const Router = require('koa-router')
const wechat = new Router()

wechat.get('/', async (ctx, next) => {
  ctx.response.body = 'wechat-index'
  await next()
})

module.exports = wechat