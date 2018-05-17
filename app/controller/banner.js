/**
 * @loong
 * 轮播图片
 */
const {banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')

module.exports.banner_img = async(req, res) => {
	let ret = await banner.findAll();
	res.send(common.response({data: ret}))
	// ret = JSON.parse(JSON.stringify(ret));
	// res.render('',
	// 	{
	// 		bannerImg:ret
	// });
}

module.exports.upload = async(req, res) => {
	console.log(req)
}