let PingRouter = require("../lib/router").Router("ping");

PingRouter.get("", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "message": "ping" }))
});

module.exports = PingRouter;