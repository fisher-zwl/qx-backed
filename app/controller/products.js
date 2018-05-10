//《产品中心》板块
const {products,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
/**
 * @loong
 * 点击《产品中心》板块的选项查询具体信息
 */
module.exports.list = async(req, res) =>{
	let id = req.params.id
	console.info('**********产品中心点击选项***********')
	console.info(id)
	try {
		const banner_data = await banner.findAll()
		let products_data = await products.findAll()
  	products_data = JSON.parse(JSON.stringify(products_data))
		let ret = await products.findById(id)
		ret = JSON.parse(JSON.stringify(ret))
		res.render('html/products',
			{ 
				cpzx_visited:'active',
				banner:'partials/banner',
				bannerData: JSON.parse(JSON.stringify(banner_data)),
				productsData: products_data,
				currentTitle: ret.title,
				currentContent: ret.content
			}
  	)
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * search
 */
module.exports.searchAll = async(req, res) =>{
	try {
		let products_data = await products.findAll()
		res.send(common.response({data: products_data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * find byId
 */
module.exports.findById = async(req, res) =>{
	let id = req.params.id
	try {
		let data = await products.findById(id)
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * update
 */
module.exports.update = async(req, res) =>{
	try {
		let params = common.validateParams(res, req.body, {
			id: Joi.number(),
			show: Joi.boolean(),
			title:Joi.string(),
			content:Joi.any()
		})
		if (params.STOP) return
		let data = {};
		if(!params.id) return
		if(params.show != undefined && !params.title && !params.content){
			data = await products.update({show:params.show},{
				where: {
					id: params.id
				}
			})
		}
		if(params.title || params.content){
			let isObj = await products.findById(params.id)
			if(JSON.parse(JSON.stringify(isObj))){//已经存在只是刷新即可
				data = await products.update({
					title:params.title,
					content:params.content
				},{
					where:{
						id: params.id
					}
				})
			}else{//添加新的数据
				data = await products.create({
					id:params.id,
					title:params.title,
					content:params.content,
					show:true
				})
			}
		}

		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * create
 */
module.exports.create = async(req, res) =>{
	try {
		let params = common.validateParams(res, req.body, {
			title:Joi.string(),
			content:Joi.any()
		})
		if (params.STOP) return
		let data = await products.create({
			title:params.title,
			content:params.content
		})
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * delete
 */
module.exports.delete = async(req, res) =>{
	try {
		let params = common.validateParams(res, req.body, {
			id:Joi.number()
		})
		if (params.STOP) return
		let data = await products.destroy({
			where:{
				id: params.id
			}
		})
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}