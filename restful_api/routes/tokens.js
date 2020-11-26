let TokenRouter = require("../lib/router").Router("tokens");
let _data       = require("../lib/data");
const helpers = require("../lib/helpers");
/**
 * @requires [phone,password] 
 */

TokenRouter.post("", (req, res) => {
    let phone = typeof(req.data.payload.phone) == 'string' && req.data.payload.phone.trim().length == 10 ? req.data.payload.phone.trim() : false
    let password = typeof(req.data.payload.password) == 'string' && req.data.payload.password.trim().length > 0 ? req.data.payload.password.trim() : false
    console.log(phone, password)
    if (phone && password) {
        // Look up the user that matches that phone number
        _data.read("users", phone, (err, data) => {
            if (!err && data) {
                // Hash the sent password and compare it the stored 
                let hashedPassword = helpers.hash(password);
                if (hashedPassword === data.hashedPassword) {
                    // If valid create a new token with a random name, Set expiration date 
                    let tokenId = helpers.createRandomString(20);
                    let expires = Date.now() + 1000 * 60 * 60;
                    let tokenObject = {
                        'phone': phone,
                        'id': tokenId,
                        'expires': expires
                    }
                    // Store the token
                    _data.create("tokens", tokenId, tokenObject, (err) => {
                        if (!err) {
                            res.status(200).json(tokenObject)
                        } else res.status(500).json({ Error: 'Could not create the new token' });
                    })
                } else res.status(400).json({ Error: 'Password did not match the specify user stored password' });
            } else res.status(400).json({ Error: 'Could not find the specify user' });
        })
    } else res.status(400).json({ Error: 'Missing required field' });
});

/**
 * @requires
 * @query id
 */
TokenRouter.get("", (req, res) => {
    let id = typeof(req.data.query.id) == 'string' && req.data.query.id.trim().length > 0 ? req.data.query.id.trim() : false
    if (id) {
        // Look up the token
        _data.read('tokens', id, function(err, data) {
            if (!err && data) {
                res.status(200).json(data);
            } else res.status(404).json({ Error: 'Token not found' });
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" })
});

/**
 * @requires [id,extend]
 */
TokenRouter.put("", (req, res) => {
    let id = typeof(req.data.payload.id) == 'string' && req.data.payload.id.trim().length == 20 ? req.data.payload.id : false
    let extend = typeof(req.data.payload.extend) == 'boolean' && req.data.payload.extend == true ? true : false;
    if (id && extend) {
        // Look up the token
        _data.read('tokens', id, function(err, data) {
            if (!err && data) {
                // Chekc the token to make sure the token isn't expired
                if (data.expires > Date.now()) {
                    // Set the expiration an hour from now
                    data.expires = Date.now() + 1000 * 60 * 60;

                    // Store the new updates
                    _data.update('tokens', id, data, (err) => {
                        if (!err) res.status(200).json({ Success: 'Success' });
                        else res.status(500).json({ Error: 'Could not update the token\'s expiration' });
                    })
                } else res.status(400).json({ Error: 'The token has already expired' });
            } else res.status(400).json({ Error : 'Specify token does not exist' });
        })
    } else res.status(400).json({ Error: 'Missing required fields or fields are invalid' });
});

/**
 * @description Delete the token
 * @requires [id]
 * @optional none
 */
TokenRouter.delete("", (req, res) => {
    // Check that id is valid 
    let id = typeof(req.data.query.id) == 'string' && req.data.query.id.trim().length == 20 ? req.data.query.id.trim() : false
    if (id) {
        // Look up the token
        _data.read('tokens', id, function(err, data) {
            if (!err && data) {
                _data.delete('tokens', id, (err) => {
                    if (!err) {
                        res.status(200).json({ Message: 'Success' });
                    } else res.status(500).json({ Error: 'Could not delete the specify token '})
                });
            } else res.status(400).json({ Error: 'Could not find the specify token' });
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" });
});

module.exports = TokenRouter;