This is by no means exhaustive, nor is it prescriptive

The package.json file, describe the project with name, versions, descriptions, scripts, dependencies.

To create package.json file with a wizard, you can use npm init.

To start a script you can try this command in your terminal :
npm {script_name}

eg: npm run start => node index.js

npm start == npm run start
npm test !== npm run test

only npm start is a shortcut 

## Testing and task running

Testing scripts are commonly held in a /test directory, and are triggered by a "test runner" such as Mocha.

Common testing files include:

.travis.yml
.jshintrc configure js hint

General-purpose task runners often control the whole process.
Grunt and Gulp are most popular.

## Documentation & Source control

Git (and github) are by far the most popular sorce control options.

So you'll often see .git and .gitignore files in projects.

You'll almost always see a readme.md file in the root directory.

Common Code-Comments:
@Param
@TODO
@Author
@Date

Generate automatic docs

## Environnementts & Configuration

### Option 1:

Start your app with
NODE_ENV=myEnvironnementName node index.js

Put your configuration in a file, (eg config.Js) which has a switch inside of it.

THat switch should read process.env.NODE_ENV to determine the current environnement and export only the config variables for that environnement.

### Option 2:

Start your app with every configuration variable you're going to need for that environnement.

```yaml
DBpassword=myDBpassword
apiToken=mySecretToken
port=thePortIShoulRunOn
foo=bar node index.js
```
### Option 3:

Read all your configuration from a .env file which gets ignored by source control.

Each dev would put their own .env file in the project prior to beginning localhost work.

Your deployment pipeline would insert an .env file into the repo before it deploys anywhere.

## Styles & Patterns

Linters (jshint and jslint) also inform the syntax many devs use.

## Error Handling

Errback:

Functions should callback two parameters
1. An error (if any)
2. Data being returned (if any)

```javascript
exampleFunctions(function(err, data){
    // Check the error
    // Do stuff with the data
});
```

Avoid Throwing Exceptions
An uncaught exception takes down the entire thread, and kills then app.

## Avoid Globals

This way you'll avoid namespace collisions with any libraries you may be using.

## Node.js vs the Browser / Window

Node an do many thing that frontend JS cannot such as writing files and creating servers, and many other.

Node is one environnement, The browser is many.

In Node, the source code you write is not visible to the end user.

