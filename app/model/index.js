const db = require('../init').db;

const models = {
  messageBoard: require('./message_board'),
  banner: require('./banner'),
  newsBlock:require('./news_block'),
  newsImg:require('./news_img'),
  newsSingle:require('./news_single'),
  aboutus:require('./about_us'),
  aboutusImg:require('./aboutus_img'),
  productsAr:require('./products_ar'),
  products:require('./products'),
  productsImg:require('./products_img'),
  contactUs:require('./contact_us'),
  contactUsImg:require('./contactus_img'),
  projectsBlock:require('./projects_block'),
  projectsSingle:require('./projects_single'),
  projectsImg:require('./projects_img'),
  Admin:require('./admin')
}
models.newsBlock.hasMany(models.newsSingle, {foreignKey:'blockNewsId'});
models.newsSingle.belongsTo(models.newsBlock, {foreignKey:'blockNewsId'});

models.projectsBlock.hasMany(models.projectsSingle, {foreignKey:'projectsBlockId'});
models.projectsSingle.belongsTo(models.projectsBlock, {foreignKey:'projectsBlockId'});

models.newsSingle.hasMany(models.newsImg, {foreignKey:'infoId'});
models.newsImg.belongsTo(models.newsSingle, {foreignKey:'infoId'});

models.aboutus.hasMany(models.aboutusImg, {foreignKey:'infoId'});
models.aboutusImg.belongsTo(models.aboutus, {foreignKey:'infoId'});

models.contactUs.hasMany(models.contactUsImg, {foreignKey:'infoId'});
models.contactUsImg.belongsTo(models.contactUs, {foreignKey:'infoId'});

models.products.hasMany(models.productsImg, {foreignKey:'infoId'});
models.productsImg.belongsTo(models.products, {foreignKey:'infoId'});

models.products.hasMany(models.productsAr, {foreignKey:'infoId'});
models.productsAr.belongsTo(models.products, {foreignKey:'infoId'});

models.projectsSingle.hasMany(models.projectsImg, {foreignKey:'infoId'});
models.projectsImg.belongsTo(models.projectsSingle, {foreignKey:'infoId'});

// models.Code.belongsToMany(models.Info, {through: 'info_code'});
// models.Info.belongsToMany(models.Code, {through: 'info_code'});

// models.Info.belongsToMany(models.Product, {through: 'info_product'});
// models.Product.belongsToMany(models.Info, {through: 'info_product'});


db.sync()
module.exports = models;
