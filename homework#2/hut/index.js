/**
 * @name RestfulAPI
 * @description Server file for instantiating the API
*/

//#region Dependencies
const http      = require('http');
const https     = require('https');
const fs        = require('fs');
const config    = require('./lib/config');
const MiniRouter = require('./lib/router');
const path      = require('path');
const {
    ClientRouter,
    HubRouter,
} = require('./routes');
//#endregion

var server = {};

//#region Init Http & Https
server.http     = http.createServer(MiniRouter);
server.https    = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "/https/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "/https/cert.pem"))
}, MiniRouter);
//#endregion

MiniRouter.get("", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ 'message' : 'Welcome' }))
});

MiniRouter.use(HubRouter);
MiniRouter.use(ClientRouter);

//#region Listening
server.init = () => {
    const { httpPort, httpsPort } = config;
    server.http.listen(httpPort, () => console.log(`Hut.http is listening on ${httpPort}`));
    server.https.listen(httpsPort, () => console.log(`Hut.https is listening on ${httpsPort}`));
}
//#endregion

server.init();

module.exports = server;