// 案例板块详细信息
const {projectsSingle,projectsBlock,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const moment = require('moment')

/**
 * @loong
 * 查询案例和案例板块
 * @param {*} req 
 * @param {*} res 
 */
module.exports.list = async(req, res) => {
    // let url = req.url
    let id = req.params.id
    console.info(id)
	try {
		let ret = await projectsSingle.findAll({
            where: {
                projectsBlockId: id
            },
            include: [{model: projectsBlock}]
        })
        // console.log(JSON.parse(JSON.stringify(ret)))
        const banner_data = await banner.findAll()
        const projectsBlock_data = await projectsBlock.findAll()
        let projectsBlock_name = await projectsBlock.findById(id)
        projectsBlock_name = JSON.parse(JSON.stringify(projectsBlock_name))
        res.render('html/projects',{
					alzs_visited:'active',
					banner:'partials/banner',
					bannerData:JSON.parse(JSON.stringify(banner_data)),
					projectsBlockData: JSON.parse(JSON.stringify(projectsBlock_data)),
					projectsSingleData: JSON.parse(JSON.stringify(ret)),
					currentUrl:projectsBlock_name.name
        });
	} catch (e) {
		console.error(e)
	}
}
/**
 * @loong
 * 查询某条案例具体信息
 * @param {*} req 
 * @param {*} res 
 */
module.exports.projectsDetail = async(req, res) => {
    let id = req.params.id
    console.info(id)
    try {
        let ret = await projectsSingle.findById(id)
        ret = JSON.parse(JSON.stringify(ret))
        // console.log(JSON.parse(JSON.stringify(ret)))
        const banner_data = await banner.findAll()
        const projectsBlock_data = await projectsBlock.findAll()
        let projectsBlock_name = await projectsBlock.findById(ret.projectsBlockId)
        projectsBlock_name = JSON.parse(JSON.stringify(projectsBlock_name))
        res.render('html/projects',{
					alzs_visited:'active',
					banner:'partials/banner',
					bannerData:JSON.parse(JSON.stringify(banner_data)),
					projectsBlockData: JSON.parse(JSON.stringify(projectsBlock_data)),
					projectsSingleContent: ret.content,
					currentUrl:projectsBlock_name.name
        });
	} catch (e) {
		console.error(e)
	}
}

/**
 * @loong
 * 查询案例
 * @param {*} req 
 * @param {*} res 
 */
module.exports.search = async(req, res) => {
	try {
        let params = common.validateParams(res, req.body, {
			projectsBlockId: Joi.number().allow(''),
            status: Joi.number().allow(''),
            page: Joi.number(),
            size: Joi.number(),
		})
        if (params.STOP) return
        let page = parseInt(params.page) || 1,
            size = parseInt(params.size) || 10;
        let data = {}
        let pm = {}
        if(params.projectsBlockId == '' && params.status == ''){
            data = await projectsSingle.findAndCount({
                include: [{model: projectsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else if(params.projectsBlockId != '' && params.status == ''){
            data = await projectsSingle.findAndCount({
                where: {
                    projectsBlockId: params.projectsBlockId
                },
                include: [{model: projectsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else if(params.projectsBlockId == '' && params.status != ''){
            data = await projectsSingle.findAndCount({
                where: {
                    status:params.status
                },
                include: [{model: projectsBlock}],
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: size * (page - 1)
            })
        }else{
            data = await projectsSingle.findAndCount({
                where: {
                    projectsBlockId: params.projectsBlockId,
                    status:params.status
                },
                include: [{model: projectsBlock}],
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
            projectsBlockId:Joi.number()
        })
        if (params.STOP) return
        if(params.status == 1){
            params.pubTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }else{
            params.pubTime = null
        }
        let ret = {}
        if(params.id){
            ret = await projectsSingle.update({
                title: params.title,
                content: params.content,
                status:params.status,
                pubTime:params.pubTime,
                projectsBlockId: params.projectsBlockId 
            },{
                where:{ projectsSingleId:params.id }
            })
        }else{
            ret = await projectsSingle.create({
                title: params.title,
                content: params.content,
                status:params.status,
                pubTime:params.pubTime,
                projectsBlockId: params.projectsBlockId
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
        let data = await projectsSingle.destroy({
            where:{
                projectsSingleId:params.id
            }
        })
        res.send(common.response({data: data}))
		
	} catch (e) {
		console.error(e)
	}
}