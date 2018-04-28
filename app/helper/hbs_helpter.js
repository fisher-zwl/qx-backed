
module.exports.test=(fms)=>{
  return 'msg'
}
/**
 * @loong
 * 判断索引是否是第一项
 * @param {} fms 
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
