const { StringDecoder } = require("string_decoder");
const url   = require("url");
const helpers = require("./helpers");

// This module will be used for creating a router handler
// Providing method to register router

/**
 * @description Return a 404 Error not found  
 * @param {*} req Request
 * @param {*} res Response
 */
let NotFoundCallback = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({'error': 'notfound'}))
}

var Router = (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    const { path, query } = parsedUrl;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var targetMethod = req.method.toLocaleLowerCase();
    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => buffer += decoder.write(data))
    req.on('end', () => {
        buffer += decoder.end();
        let targetHandler = Router.routes.filter(({ name, method }) => name === trimmedPath && method == targetMethod)
        targetHandler = targetHandler.length !== 0
        ? targetHandler[0].cb(req, res) : Router.routes.filter(({ name }) => name === "*")[0].cb(req, res);
    })
}

Router.routes = [
    { name: '*', cb : NotFoundCallback },
]

Router.get      = (name, cb) => Router.routes.push({ name, method: "get", cb });
Router.post     = (name, cb) => Router.routes.push({ name, method: "post", cb });
Router.patch    = (name, cb) => Router.routes.push({ name, method: "patch", cb });
Router.head     = (name, cb) => Router.routes.push({ name, method: "head", cb });
Router.put      = (name, cb) => Router.routes.push({ name, method: "put", cb });

// Create the router
var MiniRouter = (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    const { path, query } = parsedUrl;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var targetMethod = req.method.toLocaleLowerCase();
    var headers = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => buffer += decoder.write(data))
    req.on('end', () => {
        buffer += decoder.end();

        let targetHandler = MiniRouter.routes.filter(({ name, method }) => {
            return name === trimmedPath && method == targetMethod
        })[0];
    
        req.payload = helpers.parseJsonToObject(buffer);

        if (typeof targetHandler !== "undefined") {
            console.log(`[${targetHandler.method.toLocaleUpperCase()}] / ${targetHandler.name}`)
            targetHandler.cb(req, res);
        } else MiniRouter.routes.filter(({ name }) => name === "*")[0].cb(req, res);
    });
}


MiniRouter.get      = (name, cb) => MiniRouter.routes.push({ name, method: "get", cb });
MiniRouter.post     = (name, cb) => MiniRouter.routes.push({ name, method: "post", cb });
MiniRouter.patch    = (name, cb) => MiniRouter.routes.push({ name, method: "patch", cb });
MiniRouter.head     = (name, cb) => MiniRouter.routes.push({ name, method: "head", cb });
MiniRouter.put      = (name, cb) => MiniRouter.routes.push({ name, method: "put", cb });

// List of all routes
MiniRouter.routes = [
    { name: '*', cb: NotFoundCallback },
];

// SubRouter system
MiniRouter.Router = (routeName) => {
    let routes = []

    const getRouteName = (name) => `${routeName}${name.length != 0 ? "/"+name : name}`

    return {
        routes: routes,
        get : (name, cb) => {
            return routes.push({ name: getRouteName(name), method: "get", cb })
        },
        post : (name, cb) => {
            return routes.push({ name: getRouteName(name), method: "post", cb })
        },
        patch : (name, cb) => {
            return routes.push({ name: getRouteName(name), method: "patch", cb })
        },
        put : (name, cb) => {
            return routes.push({ name: getRouteName(name), method: "put", cb })
        },
        head : (name, cb) => {
            return routes.push({ name: getRouteName(name), method: "head", cb })
        },
    }
}

MiniRouter.use = (router) => {
    router.routes.forEach(route => MiniRouter.routes.push(route))
}

module.exports = MiniRouter