//《联系我们》板块
const {contactUs,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
/**
 * @loong
 * 点击《联系我们》板块的选项查询具体信息
 */
module.exports.list = async(req, res) =>{
	let id = req.params.id
	console.info('**********产品中心点击选项***********')
	console.info(id)
	try {
		const banner_data = await banner.findAll()
		let contactUs_data = await contactUs.findAll()
  	contactUs_data = JSON.parse(JSON.stringify(contactUs_data))
		let ret = await contactUs.findById(id)
		ret = JSON.parse(JSON.stringify(ret))
		res.render('html/contact_us',
			{ 
				lxwm_visited:'active',
				banner:'partials/banner',
				bannerData: JSON.parse(JSON.stringify(banner_data)),
				contactUsData: contactUs_data,
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
		let contactUs_data = await contactUs.findAll()
		res.send(common.response({data: contactUs_data}))
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
		let data = await contactUs.findById(id)
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}