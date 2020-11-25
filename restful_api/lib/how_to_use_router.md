### To create a http router

Import the router.js file & bind it to http
```javascript
const MiniRouter = require("./router.js");
const http = require("http").createServer(MiniRouter);
const port = 3000;

http.listen(port, () => `Http server listening on port:${port}`);
```

By default for this exercise i did that the Router internaly listen for "*"
which mean when you are trying to request a route that doesn't exist or with bad request method, the router will fallback a 404 error with a json payload of { "error", "notfound" }

### To create a new route

```javascript
// ... Top of previous EG ( http.createServer...etc )

// Router accept method like Router.[get, post, patch, put, head]
MiniRouter.get("hello", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "hello": "world" }))
});

// ... http.listen
```

### To create a SubRouter
```javascript
// ... Router.get("hello")

let UserRouter = Router.Router("user")

// This will result at /user
UserRouter.get("", (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "hello": "dear user" }));
});

MiniRouter.use(UserRouter);

// ... Http.listen
```