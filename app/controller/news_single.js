// 新闻板块详细信息
const {newsSingle,newsBlock,banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')

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