const DatabaseRouter = require("../lib/router").Router("database");
const _ = "";


// [GET] http://localhost:{port}/database
DatabaseRouter.get(_, (req, res) => {
    res.status(200).json({ Message: 'Hello client' });
});

// [POST] http://localhost:{port}/database
DatabaseRouter.post(_, (req, res) => {
    res.status(200).json({ Message: '' });
});


module.exports = DatabaseRouter