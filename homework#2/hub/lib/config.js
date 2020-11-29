/**
 * Create and export configuration variables
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort'  : 3000,
    'httpsPort' : 3001,
    'envName'   : 'staging',
    'hashSecret': 'ThisIsASecret',
    'database'  : {
        'host'  : '127.0.0.1:3020',
        'authName': 'root',
        'password': 'Blobli'
    }
};

environments.production = {
    'httpPort'  : 5000,
    'httpsPort' : 5001,
    'envName'   : 'production',
    'hashSecret': 'ThisIsAnotherSecret',
    'database'  : {
        'host'  : '127.0.0.0:5021', // In production only use https rather than http
        'authName': 'root',
        'password': 'Blobli'
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