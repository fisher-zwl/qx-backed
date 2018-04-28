const Sequelize = require('sequelize');
const db = require('../init').db;

let newsBlock = db.define('news_block',//新闻板块
  {
    blockNewsId: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
      unique:true,
      field:'block_newsId'
    },
    blockNewsName: {
      type: Sequelize.STRING(30),
      comment:'新闻板块名称',
      field:'block_newsName'
    },
    blockNewsDes: {
      type: Sequelize.STRING(30),
      comment:'新闻版块描述',
      field:'block_newsDes'
    }
  },
  {
		freezeTableName: true
  }
);

module.exports = newsBlock;
