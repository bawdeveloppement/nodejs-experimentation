/**
 * Create and export configuration variables
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort'  : 3020,
    'httpsPort' : 3021,
    'envName'   : 'staging',
    'hashSecret': 'ThisIsASecret',
};

environments.production = {
    'httpPort'  : 5020,
    'httpsPort' : 5021,
    'envName'   : 'production',
    'hashSecret': 'ThisIsAnotherSecret',
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