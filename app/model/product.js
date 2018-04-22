const Sequelize = require('sequelize');
const db = require('../init').db;

let Product = db.define('product',
  {

    name: {
      type: Sequelize.STRING
    },
    isDel:{
      type:Sequelize.BIGINT,
      comment:'0:未删除 1：删除',
      defaultValue:0
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Product;
