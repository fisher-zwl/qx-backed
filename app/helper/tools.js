const Crypto = require('crypto')
const config = require('../config')
module.exports.encrypt = (password) => {
  let hash = Crypto.createHash('sha1', config.userPasswordKey);
  let result = hash.update(password).digest('hex');
  result = Crypto.createHash('md5').update(result).digest("hex");
  return result
};
