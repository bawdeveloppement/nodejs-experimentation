const { StringDecoder } = require("string_decoder");
const url   = require("url");

// This module will be used for creating a router handler
// Providing method to register router
// 


let NotFoundCallback = (req, res) => {
    // Use the status code called back by the handler, or default
    statusCode = 404;

    // Use the payload called back by thte handler or default to 
    payload = {
        'error': 'notfound'
    };

    // Convert the payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    // Tell the user what type of data we are sending.
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(payloadString)

    // Log the request path
    console.log('Returning this response: ', statusCode, payloadString);
}

let helloWallback = (req, res) => {
    // Use the status code called back by the handler, or default
    statusCode = 404;

    // Use the payload called back by thte handler or default to 
    payload = {
        'hello': 'world'
    };

    // Convert the payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    // Tell the user what type of data we are sending.
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(payloadString)

    // Log the request path
    console.log('Returning this response: ', statusCode, payloadString);
}

var Router = (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    const { path, query } = parsedUrl;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var targetMethod = req.method.toLocaleLowerCase();
    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => buffer += decoder.write(data))
    req.on('end', () => {
        buffer += decoder.end();
        let targetHandler = Router.routes.filter(({ name, method }) => name === trimmedPath && method == targetMethod)
        targetHandler = targetHandler.length !== 0
        ? targetHandler[0].cb(req, res) : Router.routes.filter(({ name }) => name === "*")[0].cb(req, res);
    })
}

Router.routes = [
    { name: '*', cb : NotFoundCallback },
    { name: "hello", method: "get", cb: helloWallback }
]

Router.get = (name, cb) => Router.routes.push({ name, method: "get", cb });
Router.post = (name, cb) => Router.routes.push({ name, method: "post", cb });
Router.patch = (name, cb) => Router.routes.push({ name, method: "patch", cb });
Router.head = (name, cb) => Router.routes.push({ name, method: "head", cb });

module.exports = Router