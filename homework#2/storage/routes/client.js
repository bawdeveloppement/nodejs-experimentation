const ClientRouter = require("../lib/router").Router("client");
const _ = "";

ClientRouter.get(_, (req, res) => {
    res.status(200).json({ Message: "Hello client" });
});

ClientRouter.post(_, (req, res) => {
    // Check if authName already exist
    //  if yes, check the stored token and give him
    //  if not create a new token and give him
});

ClientRouter.post("signin", (req, res) => {
    // If client already have a token verify it
    // If token is not expired
    //  if not expired, update it
    //  else destroy and create a new one 
    // If token is expired
});

ClientRouter.post("signout", (req, res) => {
    // If client already have a token, check if token is not already destroyed
    // if not destroy
    // else msg success
});

module.exports = ClientRouter;