let UserRouter  = require("../lib/router").Router("user");
let _data       = require("../lib/data");
let helpers     = require("../lib/helpers");

UserRouter.get("", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "message": "Hello Dear User" }))
});

UserRouter.post("", (req, res) => {
    var firstName = typeof(req.payload.firstName) == 'string' && req.payload.firstName.trim().length > 0 ? req.payload.firstName.trim() : false; 
    var lastName = typeof(req.payload.lastName) == 'string' && req.payload.lastName.trim().length > 0 ? req.payload.lastName.trim() : false; 
    var phone = typeof(req.payload.phone) == 'string' && req.payload.phone.trim().length > 0 ? req.payload.phone.trim() : false; 
    var password = typeof(req.payload.password) == 'string' && req.payload.password.trim().length > 0 ? req.payload.password.trim() : false; 
    var tosAgreement = typeof(req.payload.tosAgreement) == 'boolean' && req.payload.tosAgreement == true ? true : false
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
    
                    _data.create('users', phone, userObject, function(err) {
                        if (!err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.writeHead(200);
                            res.end(JSON.stringify({ 'Success': 'User created' }));
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.writeHead(500);
                            res.end(JSON.stringify({ 'Error': 'Could not create the new user' }));
                        }
                    });
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(500);
                    res.end(JSON.stringify({ 'Error': 'Could not hash the user password' }));
                }
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(400);
                res.end(JSON.stringify({ 'Error': 'A user with that phone number already exist' }));
            }
        })
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({ 'Error': 'Missing required field' }));
    }
});

module.exports = UserRouter;