const Sequelize = require('sequelize');
const db = require('../init').db;

let Code = db.define('code',
  {

    code: {
      type: Sequelize.STRING,
      unique:true
    },
    status:{
      type:Sequelize.BIGINT,
      defaultValue:0,
      commoent:'0:未激活 1：已激活 2:未激活（被还原）3：激活（被还原）'
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Code;
