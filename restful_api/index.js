/**
 * @description Primary file for the API
 * 
 */

// Dependencies
const http      = require('http');
const https     = require('https');
const fs        = require('fs');
const config    = require('./config');
const Router    = require('./lib/router');
const _data     = require('./lib/data')

const httpServer = http.createServer(Router);
const httpsServer = https.createServer({
    key: fs.readFileSync("./https/key.pem"),
    cert: fs.readFileSync("./https/cert.pem")
}, Router);

Router.get("hello", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ 'message' : 'Welcome Sorcerer' }))
});

Router.post("hello/you", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end({ "message": "Hello Knight" })
});

const { httpPort } = config;
httpServer.listen(httpPort, () => {
    console.log(`The httpServer is listening on ${httpPort}`)
})

const { httpsPort } = config;
httpsServer.listen(httpsPort, () => {
    console.log(`The httpsServer is listening on ${httpsPort}`)
})