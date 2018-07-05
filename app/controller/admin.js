const {Admin} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const tools = require('../helper/tools')
const ERRORS = require('../helper/errors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports.list = async(req, res) => {

  try {
    let params = common.validateParams(res, req.query, {
      num:Joi.any().allow(''),
      page: Joi.number(),
      size: Joi.number(),
    })
    if (params.STOP) return

    let page = parseInt(params.page) || 1,
      size = parseInt(params.size) || 10;
    if(params.num){
      let user = await Admin.findAndCount({
        where: {
          num:{
            [Op.regexp]: params.num
          }
        },
        limit: size,
        offset: size * (page - 1)
      })
      res.send(common.response({data: r}))
      return
    }
    let user = await Admin.findAndCount({
      where: {},
      limit: size,
      offset: size * (page - 1),
      order: [['createdAt', 'DESC']]
    })
    let a=await Admin.findOne({
      where:{
        id:req.session.userId
      }
    })

    res.send(common.response({data: Object.assign(user,{userType:a.type})}))
  } catch (e) {
    console.error(e)
  }
}
module.exports.create = async(req, res) => {
  let params = common.validateParams(res, req.body, {
    id:Joi.number(),
    username: Joi.string().required(),
    password: Joi.string().allow(''),
    name:Joi.string().required().allow(''),
    phone:Joi.any().required().allow(''),
    isPsw:Joi.boolean()
  })
  if (params.STOP) return
  // if(!params.password){
  //   params.password = '111111'
  // }
  const password = tools.encrypt(params.password)

  let u = await Admin.findOne({
    where: {
      username: params.username
    }
  })
  
  if (u != null && !params.id) {
    res.send(ERRORS.OBJECT_HAVED_EXIT)
    return
  }
  if(params.id && params.isPsw){
    let r = await Admin.update({
      username: params.username,
      password: password,
      name:params.name,
      phone:params.phone
    },{
      where:{id:params.id}
    })
    console.info(common.response(r))
    res.send(common.response({data: r}))
    return
  }
  if(params.id && !params.isPsw){
    let r = await Admin.update({
      username: params.username,
      name:params.name,
      phone:params.phone
    },{
      where:{id:params.id}
    })
    console.info(common.response(r))
    res.send(common.response({data: r}))
    return
  }
  let r = await Admin.create({
    username: params.username,
    password: password,
    name:params.name,
    phone:params.phone
  })
  console.info(common.response(r))
  res.send(common.response({data: r}))
}

module.exports.login = async(req, res) => {
    console.info('denglu jinlai ')
  let params = common.validateParams(res, req.body, {
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  if (params.STOP) return
  const password = tools.encrypt(params.password)
  // console.info(password);
  let admin = await Admin.findOne({
    where: {
      username: params.username,
      password: password
    }
  })
  if (admin == null) {
    res.send(ERRORS.USERNAME_OR_PASSWORD_ERROR)
    return
  }
  req.session.userId = admin.id
  res.send(common.response({data: admin}))

}
module.exports.layout = (req, res) => {
  delete req.session.userId
  res.send(common.response({data: '退出成功!'}))
}
module.exports.delete = async(req, res) => {
  let params = common.validateParams(res, req.query, {
    id: Joi.number().required()
  })
  if (params.STOP) return
 
  let user = await Admin.findOne({
    where: {
      id: req.session.userId
    }
  })
  if (user.type != 1) {
    res.send(ERRORS.NO_PERMISSION)
    return
  }
  if (user.id == params.id) {
    res.send(ERRORS.NO_DELETE)
    return
  }
  let admin = await Admin.destroy({
    where: {
      id: params.id
    }
  })

  res.send(common.response({data: admin}))

}

/**
 * @loong
 * 删除用户
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deletedb = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
			id: Joi.any()
		})
		if (params.STOP) return
    let data = await Admin.destroy({
        where:{
            id:params.id
        }
    })
    res.send(common.response({data: data}))
  
	} catch (e) {
		console.error(e)
	}
}


/**
 * @loong
 * 修改用户密码
 * @param {*} req 
 * @param {*} res 
 */
module.exports.passwordChange = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
      oldPsw:Joi.string().required(),
      newPsw:Joi.string()
		})
    if (params.STOP) return
    let user = await Admin.findOne({
      where: {
        id: req.session.userId
      }
    })
    console.info(JSON.parse(JSON.stringify(user)))
    user = JSON.parse(JSON.stringify(user))
    const oldPsw = tools.encrypt(params.oldPsw)
    if(oldPsw != user.password){
      res.send(ERRORS.PASSWORD_ERROR)
      return
    }
    if(params.newPsw){
      const newPsw = tools.encrypt(params.newPsw)
      let data = await Admin.update({
        password:newPsw
      },{
        where:{id: req.session.userId}
      })
      res.send(common.response({data: data}))
      return 
    } 
    res.send({code:0, msg: '输入旧密码准确'})
	} catch (e) {
		console.error(e)
	}
}