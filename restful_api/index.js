/**
 * @name RestfulAPI
 * @description Primary file for the API
*/

//#region Dependencies
const http      = require('http');
const https     = require('https');
const fs        = require('fs');
const config    = require('./config');
const MiniRouter = require('./lib/router');
const {
    UserRouter,
    PingRouter,
    TokenRouter,
    CheckRouter
} = require('./routes');
const helpers = require('./lib/helpers');
//#endregion

/**
 * @todo GET RID OF THIS
 */
helpers.sendTwillioSms('0766284056', 'Hello', (err) => {
    console.log(err)
});

//#region Init Http
const httpServer = http.createServer(MiniRouter);
const httpsServer = https.createServer({
    key: fs.readFileSync("./https/key.pem"),
    cert: fs.readFileSync("./https/cert.pem")
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
const { httpPort } = config;
httpServer.listen(httpPort, () => {
    console.log(`The httpServer is listening on ${httpPort}`)
})

const { httpsPort } = config;
httpsServer.listen(httpsPort, () => {
    console.log(`The httpsServer is listening on ${httpsPort}`)
})
//#endregion