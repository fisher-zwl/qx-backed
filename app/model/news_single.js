const Sequelize = require('sequelize');
const db = require('../init').db;

let newsBlock = db.define('news_single',//新闻板块
  {
    singleNewsId: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
      field:'single_newsId'
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull:false,//非空
      comment:'新闻标题',
      field:'title'
    },
    content: {
      type: Sequelize.TEXT,
      allowNull:false,//非空
      comment:'新闻内容',
      field:'content'
    },
    KeyWord:{
			type: Sequelize.STRING(100),
      comment: '关键字'
    },
    picUrl:{
			type: Sequelize.STRING(100),
      comment: '图片存放路径'
    },
    pubTime:{
			type: Sequelize.DATE(6),
			allowNull:false,//非空
      comment: '发布时间'
		},
		blockNewsId:{
			type: Sequelize.INTEGER(4),
      allowNull:false,//非空
			field:'block_newsId'
		}
  },
  {
		freezeTableName: true,
		timestamps: false, //取消默认生成的createdAt、updatedAt字段
  }
);

module.exports = newsBlock;
