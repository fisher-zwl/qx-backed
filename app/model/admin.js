const Sequelize = require('sequelize');
const db = require('../init').db;

let Admin = db.define('admin',
  {
    id: {
		type: Sequelize.INTEGER(4),
		allowNull:false,//非空
		autoIncrement:true,//自增加
        primaryKey:true,//主键
        unique:true
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull:false,//非空
    },
    password:{
        type: Sequelize.STRING(255),
        allowNull:false,//非空
    },
    name:{
        type: Sequelize.STRING(255),
        allowNull:false,//非空
    },
    phone:{
        type: Sequelize.STRING(20),
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
