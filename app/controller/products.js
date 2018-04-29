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