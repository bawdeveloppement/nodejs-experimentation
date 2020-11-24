/**
 * Primary file for the API
 * 
 */

// Dependencies
var http = require('http');

// Vars
var port = 3000;


// The server should respond to all request with a string
var server = http.createServer(function(req, res) {
    res.end('Hello World\n');
});

// Start the server, and hve it listen on port 3000
server.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
});