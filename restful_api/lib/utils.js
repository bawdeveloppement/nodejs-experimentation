var _data = require("./data");

var utils = {}
/**
 * @todo make verifyToken another place
 * @param {} id 
 * @param {*} phone 
 */
utils.verifyToken = (id, phone, cb) => {
    _data.read("tokens", id, function (err, data) {
        if (!err && data) {
            if (data.phone === phone && data.expires > Date.now()) cb(true);
            else cb(false);
        } else cb(false); 
    });
}


module.exports = utils;