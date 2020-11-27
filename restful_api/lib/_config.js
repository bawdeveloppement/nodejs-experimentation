/**
 * Create and export configuration variables
 * Used for example. Because the origin config.js now contain secure data
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort'  : 3000,
    'httpsPort' : 3001,
    'envName'   : 'staging',
    'hashSecret': 'ThisIsASecret',
    'maxChecks' : 5,
    'twillio': { // This is fake data
        'accountSid'    : '3b1bbc523e1ACf94a23bd81c8428120387',
        'authToken'     : 'eb4f479b540805197d3ad544f5ebbd87',
        'fromPhone'     : '+11172825155'
    }
};

environments.production = {
    'httpPort'  : 5000,
    'httpsPort' : 5001,
    'envName'   : 'production',
    'hashSecret': 'ThisIsAnotherSecret',
    'maxChecks' : 5,
    'twillio': { // This is fake data
        'accountSid'    : '3b1bbc523e1ACf94a23bd81c8428120387',
        'authToken'     : 'eb4f479b540805197d3ad544f5ebbd87',
        'fromPhone'     : '+11172825155'
    }
};

// Determine which environment was passed as a command-line arg
var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ?
process.env.NODE_ENV.toLowerCase() : '';

// Check tha tthe current environment is on of the environments above,
// if not, default is staging
var environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments['staging'];

// To pass a value to process.env.NODE_ENV
// You have to write NODE_ENV=value node index.js
// In other form you have to declare the env var before the app command 
// Like : foo=bar node index.js

module.exports = environmentToExport;