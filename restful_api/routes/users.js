let UserRouter = require("../lib/router").Router("user");

UserRouter.get("", (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "message": "Hello Dear User" }))
});

module.exports = UserRouter;