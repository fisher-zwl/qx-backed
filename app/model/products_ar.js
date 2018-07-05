/**
 * @<产品中心>信息的缩略图图片模型
 */
const Sequelize = require('sequelize');
const db = require('../init').db;

let banner = db.define('products_ar',//缩略图图片
  {
    id: {
      type: Sequelize.INTEGER(4),
      allowNull:false,//非空
      autoIncrement:true,//自增加
      primaryKey:true,//主键
      field:'id'
    },
    url: {
      type: Sequelize.STRING(255),
      field:'url'
    },
    name: {
      type: Sequelize.STRING(255),
      field:'name'
    },
    decription:{
        type: Sequelize.STRING(255),
        field:'decription'
    },
    infoId:{
        type: Sequelize.INTEGER(4),
        field:'infoId'
        // allowNull:false,//非空
    }
  },
  {
		freezeTableName: true,
		timestamps: false, //取消默认生成的createdAt、updatedAt字段
  }
);

module.exports = banner;
