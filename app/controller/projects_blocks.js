//案例展示板块
const {projectsBlock} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
/**
 * @loong
 * 制作案例板块
 */
module.exports.create = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
			name: Joi.string(),
			description: Joi.string().allow('')
		})
		if (params.STOP) return

		let ret = await projectsBlock.create({
			name: params.name,
			description: params.description
		})

		res.send(common.response({data: ret}))
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 查询案例板块
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async(req, res) => {
	try {
		let ret = await projectsBlock.findAll()
		res.send(common.response({data: ret}))
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 删除案例板块
 * @param {*} req 
 * @param {*} res 
 */
module.exports.delete = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
			id: Joi.any()
		})
		if (params.STOP) return
		if(params.id instanceof Array && params.id){
			let data = await projectsBlock.destroy({
				where:{
					projectsBlockId:params.id
				}
			})
			res.send(common.response({data: data}))
		}else{
			console.error('id:'+'传入的值非数组')
			return
		}
		
	} catch (e) {
		console.error(e)
	}
}
