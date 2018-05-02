const Sequelize = require('sequelize');
const db = require('../init').db;

let Admin = db.define('admin',//轮播图片
  {
    id: {
		type: Sequelize.INTEGER(4),
		allowNull:false,//非空
		autoIncrement:true,//自增加
        primaryKey:true,//主键
        unique:true
    },
    username: {
		type: Sequelize.STRING(255)
    },
    password:{
        type: Sequelize.STRING(255)
    },
    type:{
        type: Sequelize.BIGINT,
        defaultValue:0,
        comment:'0:管理员'
    }
    },
    {
        freezeTableName: true
    }
);

module.exports = Admin;
