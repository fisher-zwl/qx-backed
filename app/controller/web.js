const {Info, Code,Product} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const ERRORS = require('../helper/errors')
const db = require('../init')
const Sequelize = require('sequelize')
module.exports.index = (req, res) => {
  res.render('html/main',
    {}
  );
}
