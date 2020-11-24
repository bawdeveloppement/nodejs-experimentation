const environments = {}

environments.dev = {
    httpPort: 3000,
    httpsPort : 3001
}

var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

module.exports = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments['dev'];
