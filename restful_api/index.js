/**
 * @name Main
 * @description Main file for the API
 */

// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');

var app = {};

app.init = (() => {
    server.init();
    workers.init();
})();
