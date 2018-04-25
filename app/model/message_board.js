const Sequelize = require('sequelize');
const db = require('../init').db;

let messageBoard = db.define('message_board',//留言板表
  {
    id: {
		type: Sequelize.INTEGER(5),
		allowNull:false,//非空
		autoIncrement:true,//自增加
		primaryKey:true//主键
    },
    mbName: {
		type: Sequelize.STRING(50),
		field:'mb_name',
		comment:'姓名'
    },
    mbPhone:{
		type: Sequelize.STRING(15),
		field:'mb_phone',
		allowNull:false,//非空
		comment:'电话'
    },
    mbEmail:{
		type: Sequelize.STRING(50),
		field:'mb_email',
		comment:'邮箱'
    },
    mbAddress:{
			type: Sequelize.STRING(200),
			field:'mb_address',
			comment:'地址'
    },
    mbWord: {
			type: Sequelize.STRING(1000),
			field:'mb_word',
			comment:'留言内容'
    }
  },
  {
		freezeTableName: true,
		timestamps: false, //取消默认生成的createdAt、updatedAt字段
  }
);

module.exports = messageBoard;
