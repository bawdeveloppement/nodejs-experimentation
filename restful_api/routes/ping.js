const Ping = require('../lib/router');

/**
 * @name PingIndex
 */
Ping.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end({ "message": "ping" })
});

module.exports = Ping;