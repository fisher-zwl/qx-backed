const moment = require('moment')

module.exports.test=(fms)=>{
  return 'msg'
}
/**
 * @loong
 * 判断索引是否是第一项
 */
module.exports.ifOne=(index,options)=>{
  if(index == 0){
    return options.fn(this)
  }
}
module.exports.ifOne_no=(index,options)=>{
  if(index != 0){
    return options.fn(this)
  }
}
/**
 * @loong
 * 时间格式处理为YYYY-MM-DD HH:MM:SS
 */
module.exports.prettyDate = (time,options) =>{
  return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
}
