const _ = ""; // Just for style
const ClientRouter = require("../lib/router").Router("client");

ClientRouter.get(_, (req, res) => {
    res.status(200).json({ Error: "Not setup" })
});

module.exports = ClientRouter;