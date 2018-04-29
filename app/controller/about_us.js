//《关于我们》板块
const {aboutus,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
/**
 * @loong
 * 点击关于我们的选项查询具体信息
 */
module.exports.list = async(req, res) =>{
	let id = req.params.id
	console.info('**********点击选项***********')
	console.info(id)
	try {
		const banner_data = await banner.findAll()
		let aboutus_data = await aboutus.findAll()
  	aboutus_data = JSON.parse(JSON.stringify(aboutus_data))
		let ret = await aboutus.findById(id)
		ret = JSON.parse(JSON.stringify(ret))
		res.render('html/about_us',
			{ 
				gywm_visited:'active',
				banner:'partials/banner',
				bannerData: JSON.parse(JSON.stringify(banner_data)),
				aboutusData: aboutus_data,
				currentTitle: ret.title,
				currentContent: ret.content
			}
  	)
	} catch (e) {
		console.error(e)
	}
}