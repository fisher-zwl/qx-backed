// 留言板
const {messageBoard,Admin} = require('../model')
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

/**
 * @loong
 * @search
 */
module.exports.list = async(req, res) => {

  try {
    let params = common.validateParams(res, req.query, {
      mbName: Joi.string().allow(''),
      mbPhone: Joi.string().allow(''),
      mbEmail: Joi.string().allow(''),
      mbHandler: Joi.string().allow(''),
      status:Joi.number().allow(''),
      startTime:Joi.string().allow(''),
      endTime:Joi.string().allow(''),
      page: Joi.number(),
      size: Joi.number()
    })
    if (params.STOP) return

    let page = parseInt(params.page) || 1,
      size = parseInt(params.size) || 10;
    let where = {}
    if(params.mbName){
      where = Object.assign(where, {mbName:params.mbName});
    }
    if(params.mbPhone){
      where = Object.assign(where, {mbPhone:params.mbPhone});
    }
    if(params.mbEmail){
      where = Object.assign(where, {mbEmail:params.mbEmail});
    }
    if(params.mbHandler){
      where = Object.assign(where, {mbHandler:params.mbHandler});
    }
    let s = parseInt(params.status)
    if(s == 0 || s == 1){
      where = Object.assign(where, {status:s});
    }
    if (params.startTime && params.endTime) {
      where = Object.assign(where, {createdAt: {$between: [new Date(params.startTime), new Date(params.endTime)]}})
    }
    let message =  await messageBoard.findAndCount({
      where: where,
      limit: size,
      offset: size * (page - 1),
      order: [['createdAt', 'DESC']]
    })
    res.send(common.response({data: message}))
  } catch (e) {
    console.error(e)
  }
}

/**
 * @loong
 * @update
 */
module.exports.update = async(req, res) => {
  try {
    let params = common.validateParams(res, Object.assign(req.query, req.body), {
      status:Joi.number().allow(''),
      id:Joi.number().required()
    })
    if (params.STOP) return
    // console.log(req.session.userId)
    let a=await Admin.findOne({
      where:{
        id:req.session.userId
      }
    })
    // console.log(JSON.parse(JSON.stringify(a)))
    let ret = await messageBoard.update({
      status: params.status,
      mbHandler: a.name
    },{
      where:{ id:params.id }
    })
    res.send(common.response({data: ret}))
  } catch (e) {
    console.error(e)
  }
}