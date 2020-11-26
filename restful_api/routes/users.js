let UserRouter  = require("../lib/router").Router("user");
let _data       = require("../lib/data");
const { hash }  = require("../lib/helpers");
let helpers     = require("../lib/helpers");

//#region [GET] Access user data. Need to be authentificated
UserRouter.get("", (req, res) => {
    let phone = typeof(req.data.query.phone) == 'string' && req.data.query.phone.trim().length == 10 ? req.data.query.phone.trim() : false
    if (phone) {
        // Look up the user
        _data.read('users', phone, function(err, data) {
            if (!err && data) {
                delete data.hashedPassword;
                res.status(200).json(data);
            } else res.status(404).json({ Error: 'User not found' });
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" })
});
//#endregion

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

//#region [PUT] Update data. Need to be authentificated
UserRouter.put('', (req, res) => {
    // Required
    var phone = typeof(req.data.payload.phone) == 'string' && req.data.payload.phone.trim().length > 0 ? req.data.payload.phone.trim() : false; 
    // Optional
    var firstName = typeof(req.data.payload.firstName) == 'string' && req.data.payload.firstName.trim().length > 0 ? req.data.payload.firstName.trim() : false; 
    var lastName = typeof(req.data.payload.lastName) == 'string' && req.data.payload.lastName.trim().length > 0 ? req.data.payload.lastName.trim() : false; 
    var password = typeof(req.data.payload.password) == 'string' && req.data.payload.password.trim().length > 0 ? req.data.payload.password.trim() : false; 
    
    if (phone) {
        if (firstName || lastName || password) {
            _data.read('users', phone, function(err, userData){
                if (!err && userData) {
                    if (firstName) userData.firstName = firstName;
                    if (lastName) userData.lastName = lastName;
                    if (password) userData.password = hash(password);
                    // Update the data
                    _data.update('users', phone, userData, (err) => {
                        if (!err) {
                            res.status(200).json({ 'Message': 'Success' })
                        } else res.status(500).json({ Error: 'Could not update the user' })
                    })
                } else res.status(400).json({ Error: 'The specified user does not exist' });
            });
        } else res.status(400).json({ Error: 'Missing field to update' });
    } else res.status(400).json({ 'Error': 'Missing required field' });
});
//#endregion

//#region [DELETE] 
UserRouter.delete('', (req, res) => {
    let phone = typeof(req.data.query.phone) == 'string' && req.data.query.phone.trim().length == 10 ? req.data.query.phone.trim() : false
    if (phone) {
        // Look up the user
        _data.read('users', phone, function(err, data) {
            if (!err && data) {
                _data.delete('users', phone, (err) => {
                    if (!err) {
                        res.status(200).json({ Message: 'Success' });
                    } else res.status(500).json({ Error: 'Could not delete the specify user '})
                });
            } else res.status(400).json({ Error: 'Could not find the specify user' });
        });
    } else res.status(400).json({ Error: "Missing or incorrect required field" });
});
//#endregion 

module.exports = UserRouter;