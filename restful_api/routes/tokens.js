let TokenRouter = require("../lib/router").Router("tokens");
let _data       = require("../lib/data");
/**
 * @requires [phone,password] 
 */

TokenRouter.post("", (req, res) => {
    res.status(400).json({ Error: 'Missing required field' });
});

TokenRouter.get("", (req, res) => {
    res.status(200).json();
});

TokenRouter.put("", (req, res) => {
    res.status(200).json();
});

TokenRouter.delete("", (req, res) => {
    res.status(200).json();
});

module.exports = TokenRouter;