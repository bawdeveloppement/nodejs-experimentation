# HOMEWORK#2 - Pizza_Hub

## Intro

PizzaHub is an API to let people register as an customer or a provider, in other word A Pizza Hut.

## HOW DOES IT WORK

PizzaHub provide a base of code to implement within your project. It will help you to connect as a provider and manage your data client.

So it will be splitted in two part
    
    - core > The core project which let you become the hub. The only provider of data. When a user try to access a shop, if this shop need more data, like the geo-position or store discussions from a tchat, the hub force the provider to ask the user before and notify the hub. 
    the core is here to help you manage different server in the world if it's yours. for example for a company having multi pizza hut. 

    - hut > This part is for the provider, The provider should access PizzaHub-Core with a token.