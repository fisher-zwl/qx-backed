/**
 * @<关于我们>编辑信息的图片模型
 */
const Sequelize = require('sequelize');
const db = require('../init').db;

let banner = db.define('aboutus_img',//轮播图片
  {
    picId: {
		type: Sequelize.INTEGER(4),
		allowNull:false,//非空
		autoIncrement:true,//自增加
		primaryKey:true//主键
    },
    url: {
		type: Sequelize.STRING(255),
		comment:'轮播图片路径'
    },
    name: {
      type: Sequelize.STRING(255),
    },
    infoId:{
        type: Sequelize.INTEGER(4)
    }
  },
  {
		freezeTableName: true,
		timestamps: false, //取消默认生成的createdAt、updatedAt字段
  }
);

module.exports = banner;
