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
}

module.exports = helpers;