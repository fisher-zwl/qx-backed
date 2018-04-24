// 留言板
const {messageBoard} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')

module.exports.creatMessage = async(req, res) => {

    try {
      let params = common.validateParams(res, Object.assign(req.query, req.body), {
        mbName: Joi.string().allow(''),
        mbPhone: Joi.string(),
        mbEmail: Joi.string().allow(''),
        mbAddress: Joi.string().allow(''),
        mbWord: Joi.string().allow('')
      })
      if (params.STOP) return
  
      let ret = await messageBoard.create({
        mbName: params.mbName,
        mbPhone: params.mbPhone,
        mbEmail: params.mbEmail,
        mbAddress: params.mbAddress,
        mbWord: params.mbWord
      })
  
      res.send(common.response({data: ret}))
    } catch (e) {
      console.error(e)
    }
  }