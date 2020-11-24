const http  = require("http");
const config= require("./config");
const Router = require("./router");
const router= require("./router");


const httpServer = http.createServer(router);

Router.get("hi", (req, res) => {
    let payload = {
        'hi': 'bro'
    };

    // Convert the payload to a string
    var payloadString = JSON.stringify(payload);

    // Return the response
    // Tell the user what type of data we are sending.
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(payloadString)
});


Router.get("hi/hello", (req, res) => {
    let payload = {
        'hi': 'bro'
    };

    // Convert the payload to a string
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

