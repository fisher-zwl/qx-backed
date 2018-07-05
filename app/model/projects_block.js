const Sequelize = require('sequelize');
const db = require('../init').db;

let projectsBlock = db.define('projects_block',//新闻板块
  {
    projectsBlockId: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
      unique:true,
      field:'projects_blockId'
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull:false,//非空
      comment:'案例名称',
      field:'name'
    },
    description: {
      type: Sequelize.STRING(100),
      comment:'案例描述',
      field:'description'
    }
  },
  {
	freezeTableName: true
  }
);

module.exports = projectsBlock;
