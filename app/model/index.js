const db = require('../init').db;

const models = {
  messageBoard: require('./message_board'),
  banner: require('./banner'),
  newsBlock:require('./news_block'),
  newsSingle:require('./news_single'),
  aboutus:require('./about_us'),
  products:require('./products'),
  contactUs:require('./contact_us'),
  projectsBlock:require('./projects_block'),
  projectsSingle:require('./projects_single')
}
models.newsBlock.hasMany(models.newsSingle, {foreignKey:'blockNewsId'});
models.newsSingle.belongsTo(models.newsBlock, {foreignKey:'blockNewsId'});

models.projectsBlock.hasMany(models.projectsSingle, {foreignKey:'projectsBlockId'});
models.projectsSingle.belongsTo(models.projectsBlock, {foreignKey:'projectsBlockId'});

// models.Code.belongsToMany(models.Info, {through: 'info_code'});
// models.Info.belongsToMany(models.Code, {through: 'info_code'});

// models.Info.belongsToMany(models.Product, {through: 'info_product'});
// models.Product.belongsToMany(models.Info, {through: 'info_product'});


db.sync()
module.exports = models;
