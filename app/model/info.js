const Sequelize = require('sequelize');
const db = require('../init').db;

let Info = db.define('info',
  {

    address: {
      type: Sequelize.STRING
    },
    mobile:{
      type:Sequelize.BIGINT
    },
    name:{
      type:Sequelize.STRING
    },
    status:{
      type:Sequelize.BIGINT,
      comment:"0 未发货 1.已发货"
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Info;
