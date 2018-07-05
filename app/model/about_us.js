/**
 * @loong
 * 《关于我们》板块
 */
const Sequelize = require('sequelize');
const db = require('../init').db;

let aboutus = db.define('about_us',
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
      comment:'标题名称',
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
      comment:'对应内容',
      field:'content'
    },
    picUrl:{
			type: Sequelize.STRING(100),
      comment: '内容中图片路径',
      field:'picUrl'
		}
	},
	{
		freezeTableName: true
  }
)

module.exports = aboutus