# Initial Homework Assignment #2

## Intro

This is an assignment from Pirple.com, if u come from there please follow the course and do your own assignment and then come back here to see how i did this assignment, you can communicate with on discord Shabaw#3593. 

## Details (Scenario):

You are building the API for a pizza-delivery company. Don't worry about a frontend, just build the API. Here's the spec from your project manager:

- New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.

- Users can log in and log out by creating or destroying a token.

- When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system).

- A logged-in user should be able to fill a shopping cart with menu items

- A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards

- When an order is placed, you should email the user a receipt. You should integrate with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account

## Important Note: If you use external libraries (NPM) to integrate with Stripe or Mailgun, you will not pass this assignment. You must write your API calls from scratch. Look up the "Curl" documentation for both APIs so you can figure out how to craft your API calls.

This is an open-ended assignment. You may take any direction you'd like to go with it, as long as your project includes the requirements. It can include anything else you wish as well. 

And please: Don't forget to document how a client should interact with the API you create!
