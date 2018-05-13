const Sequelize = require('sequelize');
const db = require('../init').db;

let projectsBlock = db.define('projects_single',//新闻板块
  {
    projectsSingleId: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
      field:'projects_singleId'
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull:false,//非空
      comment:'案例信息标题',
    },
    content: {
      type: Sequelize.TEXT,
      comment:'案例信息内容',
    },
    KeyWord:{
			type: Sequelize.STRING(100),
      comment: '案例信息关键词'
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
		projectsBlockId:{
			type: Sequelize.INTEGER(4),
      allowNull:false,//非空
			field:'projects_blockId'
		},
    status: {
      type: Sequelize.INTEGER(4),
      defaultValue:'2',
      comment:'1:已经发布；2:暂不发布'
    }
  },
  {
		freezeTableName: true
  }
);

module.exports = projectsBlock;
