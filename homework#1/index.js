const http  = require("http");
const config= require("./config");
const Router = require("./router");

const httpServer = http.createServer(Router);

Router.get("hello", (req, res) => {
    let payload = {
        'welcome': 'man'
    };

    // Convert the payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    // Tell the user what type of data we are sending.
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(payloadString)
});


Router.post("hello/you", (req, res) => {
    let payload = {
        'hello': 'you'
    };

    // Convert the json payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    // Tell the user what type of data we are sending.
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(payloadString)
});

const { httpPort } = config;
httpServer.listen(httpPort, () => {
    console.log(`The httpServer is listening on ${httpPort}`)
})

