/**
 * Primary file for the API
 * 
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Vars
var port = 3000;

// The server should respond to all request with a string
var server = http.createServer(function(req, res) {
    
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

        // Send the response
        res.end('Hello world\n');

        // Log the request path
        console.log('Request received with this payload: ', buffer);
    });

    // Send the response
    // res.end('Hello World\n');

    // Log the request path
    // console.log('Headers', headers);
    // console.log(`[${method.toLocaleUpperCase()}] / ${trimmedPath} - Query `, queryStringObject);
});

// Start the server, and hve it listen on port 3000
server.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
});