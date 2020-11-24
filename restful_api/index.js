/**
 * Primary file for the API
 * 
 */

// Dependencies
var http    = require('http');
var https   = require('https');
var url     = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var fs      = require('fs');

// Env Vars
// ES6 Destructuring
// var { foo } = bar  === var foo = bar.foo
const { httpPort, httpsPort, envName } = require('./config');

// The server should respond to all request with a string
var server = http.createServer((req, res) => unifiedServer(req, res));

// Start the server, and have it listen on port 3000
server.listen(httpPort, function () {
    console.log(`The http:${envName} server is listening on port ${httpPort}`);
});

// Instantiate https servers
var https_options = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem') 
};


var secure_server = https.createServer(https_options, (req, res) => unifiedServer(req, res))

// Start https server
secure_server.listen(httpsPort, () => {
    console.log(`The https:${envName} server is listening on port ${httpsPort}`);
})

var unifiedServer = function(req, res) {
    console.log(req, res)
    // Get the URL and parse it
    // parsedUrl is an object a bunch of keys of parsed automated
    // data about the request path the url came in
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    // Use regex to get a cleaner pathname
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    var method = req.method.toLocaleLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => buffer += decoder.write(data));
    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler this request should go to.
        var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request to the handler specified in the router
        chooseHandler(data, function (statusCode, payload){
            console.log(data)
            // Use the status code called back by the handler, or default
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload called back by thte handler or default to 
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            // Tell the user what type of data we are sending.
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)

            // Log the request path
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
}

// Define our handlers
var handlers = {}
handlers.sample = function (data, callback){
    // Callback a http status code and a payload object
    callback(406, { 'name' : 'sample handler' });
}

// Not found handler
handlers.notfound = function (data, callback){
    callback(404);
}

// Define a request router
var router = {
    'sample': handlers.sample
}