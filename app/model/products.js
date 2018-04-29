/**
 * @loong
 * 《产品中心》板块
 */
const Sequelize = require('sequelize');
const db = require('../init').db;

let products = db.define('products',
  {
		id: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull:false,//非空
      comment:'产品标题',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull:false,//非空
      comment:'产品内容',
    },
    picUrl:{
			type: Sequelize.STRING(100),
      comment: '产品图片'
		}
	},
	{
		freezeTableName: true
  }
)

module.exports = products