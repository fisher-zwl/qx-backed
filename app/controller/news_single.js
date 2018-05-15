// 新闻板块详细信息
const {newsSingle,newsBlock,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const moment = require('moment')
/**
 * @loong
 * 查询新闻和新闻板块
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async(req, res) => {
    // let url = req.url
    let id = req.params.id
    console.info(id)
	try {
		let ret = await newsSingle.findAll({
            where: {
                blockNewsId: id
            },
            include: [{model: newsBlock}]
        })
        // console.log(JSON.parse(JSON.stringify(ret)))
        const banner_data = await banner.findAll()
        const newsBlock_data = await newsBlock.findAll()
        let newsBlock_name = await newsBlock.findById(id)
        newsBlock_name = JSON.parse(JSON.stringify(newsBlock_name))
        // console.info(JSON.parse(JSON.stringify(newsBlock_name)))
        res.render('html/news',{
            xwzx_visited:'active',
            banner:'partials/banner',
            bannerData:JSON.parse(JSON.stringify(banner_data)),
            newsBlockData: JSON.parse(JSON.stringify(newsBlock_data)),
            newsSingleData: JSON.parse(JSON.stringify(ret)),
            currentUrl:newsBlock_name.blockNewsName
        });
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 查询某条新闻具体信息
 * @param {*} req 
 * @param {*} res 
 */
module.exports.newsDetail = async(req, res) => {
    let id = req.params.id
    console.info(id)
    try {
        let ret = await newsSingle.findById(id)
        ret = JSON.parse(JSON.stringify(ret))
        // console.log(JSON.parse(JSON.stringify(ret)))
        const banner_data = await banner.findAll()
        const newsBlock_data = await newsBlock.findAll()
        let newsBlock_name = await newsBlock.findById(ret.blockNewsId)
        newsBlock_name = JSON.parse(JSON.stringify(newsBlock_name))
        // console.info(JSON.parse(JSON.stringify(newsBlock_name)))
        res.render('html/news',{
            xwzx_visited:'active',
            banner:'partials/banner',
            bannerData:JSON.parse(JSON.stringify(banner_data)),
            newsBlockData: JSON.parse(JSON.stringify(newsBlock_data)),
            newsSingleContent: ret.content,
            currentUrl:newsBlock_name.blockNewsName
        });
	} catch (e) {
		console.error(e)
	}
}


/**
 * @loong
 * 查询新闻
 * @param {*} req 
 * @param {*} res 
 */
module.exports.search = async(req, res) => {
	try {
        let params = common.validateParams(res, req.body, {
			blockNewsId: Joi.number().allow(''),
            status: Joi.number().allow(''),
            page: Joi.number(),
            size: Joi.number(),
		})
        if (params.STOP) return
        let page = parseInt(params.page) || 1,
            size = parseInt(params.size) || 10;
        let data = {}
        let pm = {}
        if(params.blockNewsId == '' && params.status == ''){
            data = await newsSingle.findAndCount({
                include: [{model: newsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else if(params.blockNewsId != '' && params.status == ''){
            data = await newsSingle.findAndCount({
                where: {
                    blockNewsId: params.blockNewsId
                },
                include: [{model: newsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else if(params.blockNewsId == '' && params.status != ''){
            data = await newsSingle.findAndCount({
                where: {
                    status:params.status
                },
                include: [{model: newsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else{
            data = await newsSingle.findAndCount({
                where: {
                    blockNewsId: params.blockNewsId,
                    status:params.status
                },
                include: [{model: newsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }
        res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * 案例信息制作
 */
module.exports.create = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
            id:Joi.number().allow(''),
            title: Joi.string(),
            status: Joi.number(),
            content: Joi.any().allow(''),
            blockNewsId:Joi.number()
        })
        if (params.STOP) return
        if(params.status == 1){
            params.pubTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }else{
            params.pubTime = null
        }
        let ret = {}
        if(params.id){
            ret = await newsSingle.update({
                title: params.title,
                content: params.content,
                status:params.status,
                pubTime:params.pubTime,
                blockNewsId: params.blockNewsId 
            },{
                where:{ singleNewsId:params.id }
            })
        }else{
            ret = await newsSingle.create({
                title: params.title,
                content: params.content,
                status:params.status,
                pubTime:params.pubTime,
                blockNewsId: params.blockNewsId
            })
        }
		res.send(common.response({data: ret}))
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * 删除案例信息
 * @param {*} req 
 * @param {*} res 
 */
module.exports.delete = async(req, res) => {
	try {
		let params = common.validateParams(res, Object.assign(req.query, req.body), {
			id: Joi.any()
		})
		if (params.STOP) return
        let data = await newsSingle.destroy({
            where:{
                singleNewsId:params.id
            }
        })
        res.send(common.response({data: data}))
		
	} catch (e) {
		console.error(e)
	}
}