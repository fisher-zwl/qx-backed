'use strict';

const Joi = require('joi');
const ERRORS = require('./errors');

/*
 * 参数验证函数
 * @param {params} 需要验证的参数
 * @param {schema} 验证格式
 */

module.exports.validateParams = (res, query, schema) => {
  const {error, value} = Joi.validate(query, schema);
  if (error !== null) {
    res.send({
      code: ERRORS.PARAMS_ERROR.code,
      msg: error.details[0].message
    })
    return {
      STOP: 'stop send'
    }
  } else {
    return value
  }
};

/*
 * 响应数据辅助方法
 * @param {All} data 响应数据
 * @param {Number} error 错误码
 */
module.exports.response = ({data, errorCode = ERRORS.SUCCESS} = {}) => {
  return Object.assign(errorCode, {data: data})
};