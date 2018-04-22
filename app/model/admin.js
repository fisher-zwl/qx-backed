const Sequelize = require('sequelize');
const db = require('../init').db;

let Article = db.define('admin',
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
      unique: 'compositeIndex'
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.TEXT
    },
    type: {
      type: Sequelize.BIGINT,
      defaultValue:0,
      comment:'0:管理员'
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Article;
