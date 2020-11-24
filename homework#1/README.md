# Homework Assignment #1: Hello World API

## Detail

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

2. When someone sends an HTTP request to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 

## Turning it In:

Zip up your code files and attach them here to receive a grade and continue with the course.


## Result

### To create a http router

Import the router.js file & bind it to http
```javascript
const Router = require("./router.js");
const http = require("http").createServer(Router);
const port = 3000;

http.listen(port, () => `Http server listening on port:${port}`);
```

By default for this exercise i did that the Router internaly listen for "*"
which mean when you are trying to request a route that doesn't exist or with bad request method, the router will fallback a 404 error with a json payload of { "error", "notfound" }

### To create a new route

```javascript
// ... Top of previous EG ( http.createServer...etc )

// Router accept method like Router.[get, post, patch, put, head]
Router.get("hello", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ "hello": "world" }))
});

// ... http.listen
```