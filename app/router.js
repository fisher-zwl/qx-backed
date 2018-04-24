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

app.get('/', web.homePage)//首页
app.get('/about-us', web.aboutUs)//关于我们
app.get('/products', web.products)//产品中心
app.get('/projects', web.projects)//案例展示
app.get('/news', web.news)//新闻中心
app.get('/contact-us', web.contactUs)//联系我们


// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
// app.use((req, res, next) => {
//   if(req.url.indexOf('/admin/v1/')>-1) {

//     if (req.session.userId) {
//       next()
//     } else {
//       if (req.url == '/admin/v1/login') {
//         next()
//       } else {
//         res.send({code: -1002})
//         //next()
//       }
//     }
//   }else {
//     next()
//   }
// })

//后台代码
// app.use(express.static(path.join(__dirname, '../dist')));
// app.get('/admin',function (req,res) {
//   console.info('r')
//   res.sendFile(path.join(__dirname, '../dist')+'/admin.html')
// })
// const admin = require('./controller/admin')
// app.route('/admin/v1/users').get(admin.list).post(admin.create).delete(admin.delete)
// app.post('/admin/v1/login', admin.login)
// app.route('/admin/v1/layout').get(admin.layout)

module.exports = app