// 错误码

const ERRORS = {
  SUCCESS: {code: 0, msg: 'success'},
  //用户模块
  PARAMS_ERROR: {code: 101, msg: 'params error!'},
  OBJECT_NO_EXIST: {code: 102, msg: 'Object No Exist'},
  OBJECT_HAVED_EXIT: {code: 102, msg: '用户帐户已经存在'},
  USERNAME_OR_PASSWORD_ERROR: {code: 103, msg: 'username or password error!'},
  CODE_ERRO: {code: 103, msg: 'code erro!'},
  STATUS_ERRO: {code: 104, msg: 'status erro!'},
  NO_PERMISSION:{code:105,msg:'无权限'},
  NO_DELETE:{code:106,msg:'最高权限不能删除'},
  PASSWORD_ERROR:{code:107,msg:'输入的旧密码不准确'}
};

let util = require('util');
let ServerError = function (errorCode) {
  Error.captureStackTrace(this);
  this.errorCode = errorCode
};
util.inherits(ServerError, Error);
ServerError.prototype.name = 'Server Error';

ERRORS.ServerError = ServerError;
module.exports = ERRORS;
