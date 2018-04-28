const Sequelize = require('sequelize');
const dbConfig = require('./config').dbConfig;
// 初始化数据库
let db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    maxConnections: 20,
    minConnections: 0,
    maxIdleTime: 10000
  },
  timezone: '+08:00', //东八时区
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    timestamps: true,
  },
  logging: (log) => {
  },
});

module.exports.db = db;


