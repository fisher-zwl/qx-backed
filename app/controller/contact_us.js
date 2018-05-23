//《联系我们》板块
const {contactUs,banner,contactUsImg} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const multer = require('multer')
const config = require('../config')
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
			data = await contactUs.update({show:params.show},{
				where: {
					id: params.id
				}
			})
		}
		if(params.title || params.content){
			let isObj = await contactUs.findById(params.id)
			if(JSON.parse(JSON.stringify(isObj))){//已经存在只是刷新即可
				data = await contactUs.update({
					title:params.title,
					content:params.content
				},{
					where:{
						id: params.id
					}
				})
			}else{//添加新的数据
				data = await contactUs.create({
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
		let data = await contactUs.create({
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
		let data = await contactUs.destroy({
			where:{
				id: params.id
			}
		})
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * 编辑器中上传的图片
 */
module.exports.upload = async(req, res) =>{
	let Storage = multer.diskStorage({
        //设置文件上传后的路径
        destination: function (req, file, callback) {
            callback(null, "./public/upload/wandEditorImg/contactus");
        },
        //设置文件重命名
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });
    let upload = multer({ storage: Storage }).single("file"); //Field name and max count
    upload(req, res,async function (err) {
        if (err) {
            console.log(err)
            return res.end("Something went wrong!");
            // res.send()
        }
        let fileObj = JSON.parse(JSON.stringify(req.file))
        let data = await contactUsImg.create({
            name:fileObj.filename,
            url:'/upload/wandEditorImg/contactus/'+fileObj.filename
		})
		data = config.address + JSON.parse(JSON.stringify(data)).url
        res.send({"errno":0,"data":[data]})
    });
}