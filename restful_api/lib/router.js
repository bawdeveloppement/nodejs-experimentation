const { StringDecoder } = require("string_decoder");
const url   = require("url");
const helpers = require("./helpers");

// This module will be used for creating a router handler
// Providing method to register router

// Create the router
var MiniRouter = (req, res) => {
    var parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    var trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
    var targetMethod = req.method.toLocaleLowerCase();

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => buffer += decoder.write(data))
    req.on('end', () => {
        buffer += decoder.end();

        let targetHandler = MiniRouter.routes.filter(({ name, method }) => {
            return name === trimmedPath && method == targetMethod
        })[0];
        
        res.status = (status) => {
            res.tempStatus = status
            return res
        }

        res.json = (obj) => {
            if (typeof(obj) !== 'object') {
                console.log("The provided arg isn't a valid object");
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.tempStatus ? res.writeHead(res.tempStatus) : res.writeHead(200);
                res.end(JSON.stringify(obj));
            }
        }

        // Simplify access of theses data over all routes
        req.data = {}
        req.data.payload = helpers.parseJsonToObject(buffer);
        req.data.query = query;

        if (typeof targetHandler !== "undefined") {
            console.log(`[${targetHandler.method.toLocaleUpperCase()}] / ${targetHandler.name}`)
            targetHandler.cb(req, res);
        } else MiniRouter.routes.filter(({ name }) => name === "*")[0].cb(req, res);
    });
}

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

MiniRouter.get      = (name, cb) => MiniRouter.routes.push({ name, method: "get", cb });
MiniRouter.post     = (name, cb) => MiniRouter.routes.push({ name, method: "post", cb });
MiniRouter.patch    = (name, cb) => MiniRouter.routes.push({ name, method: "patch", cb });
MiniRouter.head     = (name, cb) => MiniRouter.routes.push({ name, method: "head", cb });
MiniRouter.put      = (name, cb) => MiniRouter.routes.push({ name, method: "put", cb });
MiniRouter.delete   = (name, cb) => MiniRouter.routes.push({ name, method: "delete", cb });

// List of all routes
MiniRouter.routes = [
    { name: '*', cb: NotFoundCallback },
];

// SubRouter system
MiniRouter.Router = (routeName) => {
    // Store internaly routes
    let routes = []
    const getRouteName = (name) => `${routeName}${name.length != 0 ? "/"+name : name}`
    return {
        routes: routes, // Return the internal route for later bind steps
        get     : (name, cb) => routes.push({ name: getRouteName(name), method: "get",      cb }),
        post    : (name, cb) => routes.push({ name: getRouteName(name), method: "post",     cb }),
        patch   : (name, cb) => routes.push({ name: getRouteName(name), method: "patch",    cb }),
        put     : (name, cb) => routes.push({ name: getRouteName(name), method: "put",      cb }),
        head    : (name, cb) => routes.push({ name: getRouteName(name), method: "head",     cb }),
        delete  : (name, cb) => routes.push({ name: getRouteName(name), method: "delete",   cb }),
    }
}

MiniRouter.use = (router) => {
    router.routes.forEach(route => MiniRouter.routes.push(route))
}

module.exports = MiniRouter