/**
 * @loong
 * 轮播图片
 */
const {banner} = require('../model')
const common = require('../helper/commom')
const Joi = require('joi')
const formidable = require("formidable")
const multer = require('multer')

module.exports.banner_img = async(req, res) => {
    let ret = await banner.findAll();
    ret = common.url(JSON.parse(JSON.stringify(ret)))
    res.send({code:0,msg:'查询图片成功',data:ret})
    // res.send(common.response({data: ret}))
}

module.exports.delete = async(req, res) => {
    try {
		let params = common.validateParams(res, req.body, {
			id:Joi.number().required()
		})
		if (params.STOP) return
		let data = await banner.destroy({
			where:{
				id: params.id
			}
		})
		res.send(common.response({data: data}))
	} catch (e) {
		console.error(e)
	}
}

module.exports.upload = async(req, res) => {
	let Storage = multer.diskStorage({
        //设置文件上传后的路径
        destination: function (req, file, callback) {
            callback(null, "./public/upload/temp");
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
        let data = await banner.create({
            name:fileObj.filename,
            url:'/upload/temp/'+fileObj.filename
        })
        res.send(common.response({data: data}))
    });
}
// module.exports.upload = async(req, res) => {
// 	// console.log(req)
// 	var form = new formidable.IncomingForm();
//     form.uploadDir = "../../public/upload/temp/"; //改变临时目录
//     form.parse(req, function(error, fields, files) {
//         for (var key in files) {
//             var file = files[key];
//             var fName = (new Date()).getTime();
//             switch (file.type) {
//                 case "image/jpeg":
//                     fName = fName + ".jpg";
//                     break;
//                 case "image/png":
//                     fName = fName + ".png";
//                     break;
//                 default:
//                     fName = fName + ".png";
//                     break;
//             }
//             console.log(file, file.size);
//             var uploadDir = "../../public/upload/" + fName;
//             fs.rename(file.path, uploadDir, function(err) {
//                 if (err) {
//                     res.write(err + "\n");
//                     res.end();
//                 }
//                 //res.write("upload image:<br/>");
//                 res.write("<img src='/upload/" + fName + "' />");
//                 res.end();

//             })

//         }
//     });
// }