const express = require('express');
const bodyParser = require('body-parser')
const ERRORS = require('./helper/errors')
const path = require('path')
const exphbs = require('express-handlebars')
const helpers = require('./helper/hbs_helpter')
let app = express();
var compression = require('compression');
app.use(compression());

var session = require('express-session');
app.use(bodyParser.json({limit: '10000kb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'qw', // 建议使用 128 个字符的随机字符串
  cookie: {maxAge: 10 * 24 * 60 * 60 * 1000}
}));

app.set('views', path.join(__dirname, '../public'));
let hbs = exphbs.create({
  layoutsDir: 'public/html',
  partialsDir:'public/partials',
  defaultLayout: 'index',
  extname: '.html',
  helpers: helpers
});
app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));

// pc端界面路由
const web =  require('./controller/web')
const messageBoard = require('./controller/message_board')
const banner =  require('./controller/banner')
const projectsSingle =  require('./controller/projects_single')
const newsSingle =  require('./controller/news_single')
const aboutUS =  require('./controller/about_us')
const products =  require('./controller/products')
const contactUs =  require('./controller/contact_us')

app.get('/', web.homePage)//首页
app.get('/about-us', web.aboutUs)//关于我们
app.get('/products', web.products)//产品中心
app.get('/projects', web.projects)//案例展示
app.get('/news', web.news)//新闻中心
app.get('/contact-us', web.contactUs)//联系我们
app.get('/projects/blockProjects_:id.html', projectsSingle.list)//案例展示/具体案例
app.get('/projects/info_:id.html', projectsSingle.projectsDetail)//案例展示/具体案例/详细信息
app.get('/news/blockNews_:id.html', newsSingle.list)//新闻中心/具体新闻
app.get('/news/info_:id.html', newsSingle.newsDetail)//新闻中心/具体新闻/详细信息
app.get('/about-us/info_:id.html', aboutUS.list)//关于我们/点击项操作
app.get('/products/info_:id.html', products.list)//产品中心/点击项操作
app.get('/contact-us/info_:id.html', contactUs.list)//联系我们/点击项操作
app.route('/api/v1/message-board').post(messageBoard.creatMessage)//留言板
app.route('/api/v1/banner-img').get(banner.banner_img)//轮播图片



const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use((req, res, next) => {
  if(req.url.indexOf('/admin/v1/')>-1) {

    if (req.session.userId) {
      next()
    } else {
      if (req.url == '/admin/v1/login') {
        next()
      } else {
        res.send({code: -1002})
        //next()
      }
    }
  }else {
    next()
  }
})

//后台代码
app.use(express.static(path.join(__dirname, '../public/dist/dist')))
app.get('/admin',function (req,res) {
  console.info('r')
  res.sendFile(path.join(__dirname, '../public/dist/dist')+'/index.html')
})
const admin = require('./controller/admin')
app.post('/admin/v1/login', admin.login)
app.route('/admin/v1/layout').get(admin.layout)
app.get('/admin/v1/contact-us', contactUs.searchAll)//联系我们
app.get('/admin/v1/contact-us/:id', contactUs.findById)//联系我们/通过id寻找
app.post('/admin/v1/contact-us/update', contactUs.update)//联系我们
app.post('/admin/v1/contact-us/create', contactUs.create)//联系我们
app.post('/admin/v1/contact-us/delete', contactUs.delete)//联系我们
app.get('/admin/v1/about-us', aboutUS.searchAll)//关于我们
app.get('/admin/v1/about-us/:id', aboutUS.findById)//关于我们/通过id寻找
app.post('/admin/v1/about-us/update', aboutUS.update)//关于我们
app.post('/admin/v1/about-us/create', aboutUS.create)//关于我们
app.post('/admin/v1/about-us/delete', aboutUS.delete)//关于我们
app.get('/admin/v1/products', products.searchAll)//产品中心
app.get('/admin/v1/products/:id', products.findById)//产品中心/通过id寻找
app.post('/admin/v1/products/update', products.update)//产品中心
app.post('/admin/v1/products/create', products.create)//产品中心
app.post('/admin/v1/products/delete', products.delete)//产品中心

module.exports = app
