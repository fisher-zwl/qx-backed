// const {Info, Code,Product} = require('../model')
// const common = require('../helper/commom')
// const Joi = require('joi')
// const ERRORS = require('../helper/errors')
// const db = require('../init')
// const Sequelize = require('sequelize')
// module.exports.index = (req, res) => {
//   res.render('html/main',
//     {}
//   );
// }

/* 菜单切换路由 */
module.exports.homePage = (req, res) => {
  console.info('....首页....')
  res.render('html/home_page',
    {
      sy_visited:'active',
      banner:'partials/banner'
    }
  );
}
module.exports.aboutUs = (req, res) => {
  console.info('....关于我们....')
  res.render('html/about_us',
    { gywm_visited:'active',
    }
  );
}
module.exports.products = (req, res) => {
  console.info('....产品中心....')
  res.render('html/products',
    {cpzx_visited:'active'}
  );
}
module.exports.projects = (req, res) => {
  console.info('....案例展示....')
  res.render('html/projects',
    {alzs_visited:'active'}
  );
}
module.exports.news = (req, res) => {
  console.info('....新闻中心....')
  res.render('html/news',
    {xwzx_visited:'active'}
  );
}
module.exports.contactUs = (req, res) => {
  console.info('....联系我们....')
  res.render('html/contact_us',
    {lxwm_visited:'active'}
  );
}