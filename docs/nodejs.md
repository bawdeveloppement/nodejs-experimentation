# What is Nodejs exactly ?

V8 is the car's engine and drivetrain.
Node.js is everything else that makes the car.
You are the driver.

Node.js is a c++ application that embed V8.

Node.js now presents itself as two applicatiotns:

1. A script processor
2. A REPL (REad Eval Print Loop)

Call the script processor with:

node {script name}
eg: node index.js

The "event loop" is continually checking if there's any new for Node.js to do.

Non-blocking tasks get added to the todolist, and Node processes them whenever it can.

Node's event loop^and "non blocking" IO don't allow Node to do multiple things at one time... they just allow Node to schedule thing later.

When processing a request most web apps are actually sitting around waiting for most of the time.

A non blocking IO allows an app to do other things while it's sitting around waiting. And that's how Node processes JS.

When you run a Node application you don't tspecify all the files in the app, you only specify the "entry file".

var lib = require('./lib');

## This grabs the contents of one file and assigns it to a variable.

module.exports = whatever;

## This makes the current file "export" something to any other file who "requires" this one.

Example : 

- fileB
// Require fileA
var myImportedFunction = require('fileA');

// Use the foo function fileA
myImportedFunctions.foo();

- fileA
// Create a lib object
var lib = {};

// Add a foo function to the lib
lib.foo = function(){console.log('hello')}

// Export the whole lib
module.exports = lib;

## Node's module systems creates a dependency tree, which tells Node which files are needed to run the application.

# In summary: Node's script processor:

1. Reads in the file you specify
2. Reads in all the dependencies that file specifies, and all the dependencies of those files, etc.
3. Begins executing the synchronous tasks in those files.
4. Begins processing the "todo list" by repeating the event loop until it has nothing to do.

The REPL (Read Eval Print Loop)

To invoke the REPL, just enter node

The REPL is an interactive JS runtime.
You can write any javascript you want, and it executed.

That's how Node works.