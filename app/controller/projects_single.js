// 案例板块详细信息
const {projectsSingle,projectsBlock,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')

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
							projectsSingleId: id
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