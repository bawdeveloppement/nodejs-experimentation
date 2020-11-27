let ChecksRouter    = require("../lib/router").Router("checks");
let config          = require("../config");
let _data           = require("../lib/data");
const helpers       = require("../lib/helpers");
const utils         = require("../lib/utils");
let _ = ""

//#region [POST] Create a new check
/**
 * @description
 * @requires [protocol,url,method,successCode,timeoutSeconds]
 */
ChecksRouter.post(_, (req, res) => {
    let payload = req.data.payload;
    let protocol = typeof(payload.protocol) === 'string' && ["https", "http"].indexOf(payload.protocol) > -1 ? payload.protocol : false;
    let url = typeof(payload.url) === 'string' && payload.url.trim().length > 0 ? payload.url.trim() : false;
    let method = typeof(payload.method) === 'string' && ["post", "get", "put", "delete"].indexOf(payload.method) > -1 ? payload.method : false;
    let successCode = typeof(payload.successCode) === 'object' &&  payload.successCode instanceof Array && payload.successCode.length > 0 ? payload.successCode : false
    let timeoutSeconds = typeof(payload.timeoutSeconds) === 'number' && payload.timeoutSeconds % 1 === 0 && payload.timeoutSeconds >= 1 && payload.timeoutSeconds <= 5 ? payload.timeoutSeconds : false;

    if (protocol && url && method && successCode && timeoutSeconds) {
        // Get the token from the headers
        let token  = typeof(req.headers.token) == 'string' ? req.headers.token : false;

        // Look up the user by reading the token
        _data.read('tokens', token, (err, tokenData) => {
            if (!err && tokenData) {
                let userPhone = tokenData.phone;
                // Lookup the user data
                _data.read('users', userPhone, (err, userData) => {
                    if (!err && userData) {
                        let userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                        // Verify that the user has less than the number of max_checks_per_user
                        if (userChecks.length < config.maxChecks) {
                            // Create a random id for the checks
                            let checkId = helpers.createRandomString(20);
                            // Create the checkObject
                            let checkObject = {
                                'id'        : checkId,
                                'userPhone' : userPhone,
                                'protocol'  : protocol,
                                'url'       : url,
                                'method'    : method,
                                'successCode': successCode,
                                'timeoutSeconds': timeoutSeconds
                            };

                            // Save the object
                            _data.create("checks", checkId, checkObject, (err) => {
                                if (!err) {
                                    userData.checks = userChecks;
                                    userData.checks.push(checkId);
                                    _data.update("users", userPhone, userData, (err) => {
                                        if (!err) {
                                            // Return the new data about the new checks to the requester
                                            res.status(200).json(checkObject);
                                        } else res.status(500).json({ Error: 'Could not update the new check' });
                                    });
                                } else res.status(500).json({ Error: 'Could create the new check' });
                            })
                        } else res.status(400).json({ Error: 'The user already has the maximum number of checks ('+config.maxChecks+')'})
                    } else res.status(403).json({ Error: 'Could not read the user data' });
                });
            } else res.status(403).json({ Error: 'Token not found' });
        });
    } else res.status(400).json({ Error: 'Missing required inputs' });
});
//#endregion

//#region [GET] Get the check by query.id
/**
 * @requires [id]
 */
ChecksRouter.get(_, (req, res) => {
    console.log(req.data.query.id, req.data.query.id.length)
    let id = typeof(req.data.query.id) == 'string' && req.data.query.id.trim().length == 20 ? req.data.query.id.trim() : false
    if (id) {
        // Look up the check
        _data.read("checks", id, (err, checkData) => {
            if (!err && checkData) {
                // Get the token from the header
                let token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
                // Verify the given token from the header and belongs to the user who created the check
                utils.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
                    // Look up the user
                    if (tokenIsValid) {
                        res.status(200).json(checkData);
                    } else res.status(403).json({ Error: 'Missing required token in header, or token is invalid' });
                });
            } else res.status(404).json({ Error: "Check didn't found" })
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" });
});
//#endregion

//#region [PUT] Update the check
/**
 * @requires [id]
 */
ChecksRouter.put(_, (req, res) => {
    let payload = req.data.payload;
    // Check for the required
    let id = typeof(payload.id) == 'string' && payload.id.trim().length == 20 ? payload.id.trim() : false
    // Check for the optional data
    let protocol = typeof(payload.protocol) === 'string' && ["https", "http"].indexOf(payload.protocol) > -1 ? payload.protocol : false;
    let url = typeof(payload.url) === 'string' && payload.url.trim().length > 0 ? payload.url.trim() : false;
    let method = typeof(payload.method) === 'string' && ["post", "get", "put", "delete"].indexOf(payload.method) > -1 ? payload.method : false;
    let successCode = typeof(payload.successCode) === 'object' &&  payload.successCode instanceof Array && payload.successCode.length > 0 ? payload.successCode : false
    let timeoutSeconds = typeof(payload.timeoutSeconds) === 'number' && payload.timeoutSeconds % 1 === 0 && payload.timeoutSeconds >= 1 && payload.timeoutSeconds <= 5 ? payload.timeoutSeconds : false;

    // Check to make sure the id is valid
    if (id) {
        // Check for one of theses optional data to be valid
        if (protocol || url || method || successCode || timeoutSeconds) {
            // Look up the check
            _data.read("checks", id, (err, checkData) => {
                if (!err && checkData) {
                    // Get the token from the header
                    let token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
                    // Verify the given token from the header and belongs to the user who created the check
                    utils.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
                        // Look up the user
                        if (tokenIsValid) {
                            // Update the check where neccessary
                            if (protocol) checkData.protocol = protocol;
                            if (url) checkData.url = url;
                            if (method) checkData.method = method;
                            if (successCode) checkData.successCode = successCode;
                            if (timeoutSeconds) checkData.timeoutSeconds = timeoutSeconds;
                            // Store the new update
                            _data.update("checks", id, checkData, (err) => {
                                if (!err) {
                                    res.status(200).json({ Success: 'updated' })
                                } else res.status(500).json({ Error: 'Could not update the check' });
                            });
                        } else res.status(403).json({ Error: 'Missing required token in header, or token is invalid' });
                    });
                } else res.status(404).json({ Error: "Check id did not exist" })
            });
        } else res.status(400).json({ Error: 'Please make sure you have one the optional data fields' });
    } else res.status(400).json({ Error: "Missing or incorrect required id parameter field" });
});
//#endregion

//#region [DELETE] Delete the check
/**
 * @requires [id]
 */
ChecksRouter.delete(_, (req, res) => {
    let id = typeof(req.data.query.id) == 'string' && req.data.query.id.trim().length == 20 ? req.data.query.id.trim() : false
    if (id) {

        _data.read("checks", id, (err, checkData) => {
            if (!err && checkData) {
                let token = typeof(req.headers.token) === 'string' ? req.headers.token : false;

                // Verify that the token is valid for the phone number
                utils.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        // Delete the check data
                        _data.delete("checks", id, (err) => {
                            if(!err) {
                                // Look up for the user
                                _data.read('users', checkData.userPhone, function(err, userData) {
                                    if (!err && userData) {
                                        let userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];

                                        // Remove the deleted checks from their list of checks
                                        var checkPosition = userChecks.indexOf(id);
                                        if (checkPosition > -1) {
                                            userChecks.splice(checkPosition, 1);
                                            // Re-save the user data
                                            _data.update('users', checkData.userPhone, userData, (err) => {
                                                if (!err) {
                                                    res.status(200).json({ Message: 'Update success' });
                                                } else res.status(500).json({ Error: 'Could not update the user '});
                                            });
                                        } else res.status(500).json({ Error: 'Could not find the check on the user object so could not remove it'});
                                    } else res.status(500).json({ Error: 'Could not find the user who created the check so could not delete the check from the list' });
                                });
                            } else res.status(500).json({ Error: 'Could not delete the check data' })
                        });
                    } else res.status(403).json({ Error: 'Missing required token in header, or token is invalid' });
                });
            } else res.status(404).json({ Error: 'The specified check id does not exist' });
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" });
});
//#endregion

module.exports = ChecksRouter;