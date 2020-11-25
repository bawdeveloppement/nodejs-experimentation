/**
 * @name RestfulAPI
 * @description Primary file for the API
*/

//#region Dependencies
const http      = require('http');
const https     = require('https');
const fs        = require('fs');
const config    = require('./config');
// const { users, ping } = require('./routes');
const MiniRouter = require('./lib/router');
//#endregion

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

MiniRouter.get("te", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "message": "Hello Knight" }))
});

let UserRouter = MiniRouter.Router("user");

UserRouter.get("d", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "message": "Hello Knight" }))
});

MiniRouter.use(UserRouter)

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

// let MiniRouter = (req, res) => {

// }