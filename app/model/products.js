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
      field:'id'
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull:false,//非空
      comment:'产品标题',
      field:'title'
    },
    show: {
      type: Sequelize.BOOLEAN ,
      defaultValue:0,
      comment:'1:前台显示;0:隐藏',
      field:'show'
    },
    content: {
      type: Sequelize.TEXT,
      comment:'产品内容',
      field:'content'
    },
    picUrl:{
			type: Sequelize.STRING(100),
      comment: '产品图片',
      field:'picUrl'
		}
	},
	{
		freezeTableName: true
  }
)

module.exports = products