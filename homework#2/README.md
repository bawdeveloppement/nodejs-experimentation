# HOMEWORK#2 - Pizza_Hub

## Intro

PizzaHub is an API to let people register as an customer or a provider, in other word A Pizza Hut.
Pizza_Hub intend to let you make a server to manage a pizzeria and let you does register to a global plateform like uber_eats for example.

## HOW DOES IT WORK

PizzaHub provide a base of code to implement within your project. It will help you to connect as a provider and manage your data client.

So it will be splitted in two part
    
- [CORE] The core project which let you become the hub. The only provider of data. When a user try to access a shop, if this shop need more data, like the geo-position or store discussions from a tchat, the hub force the provider to ask the user before and notify the hub. 
    the core is here to help you manage different server in the world if it's yours. for example for a company having multi pizza hut. 

- [HUT] This part is for the provider, The provider should access PizzaHub-Core with a token. The hut module provide some default routes that the core need to check or call when necessary. Like :
    - [HUT] / status => get ["offline", "outofstocks", "online"]
    - [HUT] / mails
        - [HUT] / Post => send a mail { mailId: "cqdfgh6reztAZ84TY6JQ9Dr", from: "Pizza-hub", title: "", content: "" }

## Pizza-Hub spec
To have more details see the API routes map
<object data="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf">
        <p>The Pizza-Hub-core API <a href="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf">detail</a>.</p>
    </embed>
</object>

<object data="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf">
        <p>The Pizza-Hub-hut API <a href="https://github.com/bawdeveloppement/pirple-nodejs-course/blob/master/homework%232/.map/PizzaHub.pdf">detail</a>.</p>
    </embed>
</object>
