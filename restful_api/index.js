/**
 * Primary file for the API
 * 
 */

// Dependencies
var http = require('http');
var url = require('url');

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

    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Headers', headers);
    console.log(`[${method.toLocaleUpperCase()}] / ${trimmedPath} - Query `, queryStringObject);
});

// Start the server, and hve it listen on port 3000
server.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
});