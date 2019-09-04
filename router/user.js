const Router = require('koa-router')
const multer = require('koa-multer')
const user = new Router()
// const upload = multer({ dest: './uploads/' })
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //文件上传成功后会放入public文件夹
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    cb(null, file.originalname)
  }
});
let upload = multer({
  storage: storage
})

// test
user.get('/', async (ctx, next) => {
  console.log(ctx.url)
  ctx.response.body = 'user-index'
  // await next()
})

// get/post参数
user.all('/info', async (ctx, next) => {
  console.log(ctx.url)
  // console.log('ctx', ctx)
  // 获取get参数
  console.log('get-params', ctx.query)
  console.log('post-params', ctx.request.body)
  ctx.response.body = {
    status: 200,
    data: 'user/info'
  }
})

// cookie
user.all('/cookie', async (ctx, next) => {
  console.log(ctx.url)
  ctx.cookies.set(
    'cid', 
    'hello world',
    {
      domain: 'localhost:8888',  // 写cookie所在的域名
      path: '/#/axios/index',       // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2017-02-15'),  // cookie失效时间
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    }
  )
  ctx.body = 'cookie is ok'
})

// upload
user.post('/upload', upload.single('file'))

module.exports = user