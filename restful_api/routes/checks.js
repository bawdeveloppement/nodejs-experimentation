let ChecksRouter    = require("../lib/router").Router("checks");
let config          = require("../config");
let _data           = require("../lib/data");
const helpers       = require("../lib/helpers");

ChecksRouter.post("", (req, res) => {
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
                                'succesCode': successCode,
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

module.exports = ChecksRouter;