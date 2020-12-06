/**
 * Helpers for various task
**/
 
// Dependencies
var { hashSecret, twillio } = require("./config");
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');
const { config } = require("process");


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

helpers.sendTwillioSms = function(phone, msg, callback) {
    phone = typeof(phone) === 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
    if (phone && msg) {
        // Configure the request payload
        callback(false);
        let payload = {
            'From': twillio.fromPhone,
            'To': '+33'+phone,
            'Body': msg
        };

        // Stringify the request payload
        let stringPayload = querystring.stringify(payload);
        
        // Configure the request details
        let requestDetails = {
            'protocol'  : 'https:',
            'hostname'  : 'api.twilio.com',
            'method'    : 'POST',
            'path'      : '/2010-04-01/Accounts/'+twillio.accountSid+'/Messages.json',
            'auth'      : twillio.accountSid+':'+twillio.authToken,
            'headers'   : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length' : Buffer.byteLength(stringPayload),
            }
        };

        // Instantiate the request object
        let req = https.request(requestDetails, (res) => {
            // Grab the status of the sent request
            const { statusCode } = res;
            // Callback successfully if the request went through
            if (statusCode === 200 || statusCode === 201) callback(false)
            else callback('Status code returned was ' + statusCode);
        });

        // Bind to the error so it doesn't get thrown
        req.on('error', (e) => callback(e));

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();
    } else {
        callback('Given parameters were missing or invalid')
    }
}


module.exports = helpers;