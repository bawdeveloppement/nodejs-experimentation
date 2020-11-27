/**
 * @name RestfulAPI
 * @description Server file for instantiating the API
*/

//#region Dependencies
const http      = require('http');
const https     = require('https');
const fs        = require('fs');
const config    = require('./config');
const MiniRouter = require('./router');
const path      = require('path');
const {
    UserRouter,
    PingRouter,
    TokenRouter,
    CheckRouter
} = require('../routes');
const helpers = require('./helpers');
//#endregion

var server = {};

/**
 * @todo GET RID OF THIS
 */
helpers.sendTwillioSms('0766284056', 'Hello', (err) => {
    console.log(err)
});

//#region Init Http & Https
server.http     = http.createServer(MiniRouter);
server.https    = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem"))
}, MiniRouter);
//#endregion

MiniRouter.get("", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ 'message' : 'Welcome Sorcerer' }))
});

MiniRouter.use(PingRouter);
MiniRouter.use(UserRouter);
MiniRouter.use(TokenRouter);
MiniRouter.use(CheckRouter);

//#region Listening
server.init = () => {
    const { httpPort, httpsPort } = config;
    server.http.listen(httpPort, () => console.log(`The httpServer is listening on ${httpPort}`));
    server.https.listen(httpsPort, () => console.log(`The httpsServer is listening on ${httpsPort}`));
}
//#endregion

module.exports = server;