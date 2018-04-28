// 新闻板块
const {newsBlock} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
/**
 * @loong
 * 制作新闻板块
 */
module.exports.create = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
			blockNewsName: Joi.string(),
			blockNewsDes: Joi.string().allow('')
		})
		if (params.STOP) return

		let ret = await newsBlock.create({
			blockNewsName: params.blockNewsName,
			blockNewsDes: params.blockNewsDes
		})

		res.send(common.response({data: ret}))
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 查询新闻板块
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async(req, res) => {
	try {
		let ret = await newsBlock.findAll()
		res.send(common.response({data: ret}))
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 查询新闻板块
 */
// module.exports.list = async(req, res) => {
// 	try {
// 		let ret = await newsBlock.findAll()
// 		res.send(common.response({data: ret}))
// 	} catch (e) {
// 		console.error(e)
// 	}
// }