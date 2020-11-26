/**
 * Helpers for various task
**/
 
// Dependencies
var { hashSecret } = require("../config");
var crypto = require('crypto');


// Container for all the helpers
var helpers = {};

helpers.hash = function (str) {
    if (typeof (str) === "string" && str.length > 0) {
        return crypto.createHmac('sha256', hashSecret).update(str).digest('hex');
    } else return false
};

helpers.parseJsonToObject = (str) => {
    try {
        var object = JSON.parse(str)
        return object;
    } catch (err) {
        return {};
    }
};

/**
 * @description Create a string of random alphanumeric characters of a given length
 * @param {*} strLen 
 */
helpers.createRandomString = (strLen) => {
    strLen = typeof(strLen) === 'number' && strLen > 0 ? strLen : false
    if (strLen) {
        // Define all possible characters that could go into a string
        let possibleCharacter = 'abcdefghijklmnopqrstuvwxyz0123456789';
        // Start a string
        let str = '';
        for (i = 1; i <= strLen; i++) {
            // Get a random character from the possibleCharacters string;
            let randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
            str += randomCharacter
        }
        // Return the final string
        return str;
    } else return false;
}

var _data = require("./data");
/**
 * @todo make verifyToken another place
 * @param {} id 
 * @param {*} phone 
 */
helpers.verifyToken = (id, phone) => {
    _data.read("tokens", id, function (err, data) {
        if (!err && data) {
            if (data.phone === phone && data.expires > Date.now()) {
                return true;
            } else return false;
        } else return false; 
    })
}

module.exports = helpers;