/**
 * @loong
 * 《联系我们》板块
 */
const Sequelize = require('sequelize');
const db = require('../init').db;

let contactUs = db.define('contact_us',
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
      comment:'标题',
    },
    show: {
      type: Sequelize.BOOLEAN ,
      defaultValue:1,
      comment:'1:前台显示;0:隐藏',
    },
    content: {
      type: Sequelize.TEXT,
      comment:'内容',
    },
    picUrl:{
			type: Sequelize.STRING(100),
      comment: '图片路径'
		}
	},
	{
		freezeTableName: true
  }
)

module.exports = contactUs