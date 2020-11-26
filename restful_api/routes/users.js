let UserRouter  = require("../lib/router").Router("user");
let _data       = require("../lib/data");
let helpers     = require("../lib/helpers");

UserRouter.get("", (req, res) => {
    let phone = typeof(req.data.query.phone) == 'string' && req.data.query.phone.trim().length == 10 ? req.data.query.phone.trim() : false
    if (phone) {
        // Look up the user
        _data.read('users', phone, function(err, data) {
            if (!err && data) {

            } else res.status(400).json({ Error: 'Not found' });
        });
    } else res.status(400).json({ Error: "Missing required field" })
});

//#region [POST] Create a new user
UserRouter.post("", (req, res) => {
    //#region  Check payload data
    var firstName = typeof(req.data.payload.firstName) == 'string' && req.data.payload.firstName.trim().length > 0 ? req.data.payload.firstName.trim() : false; 
    var lastName = typeof(req.data.payload.lastName) == 'string' && req.data.payload.lastName.trim().length > 0 ? req.data.payload.lastName.trim() : false; 
    var phone = typeof(req.data.payload.phone) == 'string' && req.data.payload.phone.trim().length > 0 ? req.data.payload.phone.trim() : false; 
    var password = typeof(req.data.payload.password) == 'string' && req.data.payload.password.trim().length > 0 ? req.data.payload.password.trim() : false; 
    var tosAgreement = typeof(req.data.payload.tosAgreement) == 'boolean' && req.data.payload.tosAgreement == true ? true : false
    //#endregion
    if (firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user doesn't already exist
        _data.read('users', phone, function(err, data){
            if (err) {
                let hashedPassword = helpers.hash(password)
                if (hashedPassword) {
                    let userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'hashedPassword': hashedPassword,
                        'tosAgreement': true
                    }
                    // Create the new user
                    _data.create('users', phone, userObject, function(err) {
                        if (!err) res.status(200).json({ 'Success': 'User created' });
                        else res.status(500).json({ 'Error': 'Could not create the new user' })
                    });
                } else res.status(500).json({ 'Error': 'Could not hash the user password' })
            } else res.status(400).json({ 'Error': 'A user with that phone number already exist' })
        })
    } else res.status(400).json({ 'Error': 'Missing required field' })
});
//#endregion

module.exports = UserRouter;