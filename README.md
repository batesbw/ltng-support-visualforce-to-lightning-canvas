# Overview

This is an example Node.JS canvas endpoint to demonstrate how to leverage Canvas Apps within Lightning Experience.

This allows for listening and dispatching canvas messages with Lightning Experience, so the end user experience is seamless.

![Screenshot](docs/images/LightningToVF_ToHeroku.gif)

For more information, [please see the accompanying Salesforce project](https://github.com/SalesforceCloudServices/ltng-support-visualforce-to-lightning#communicate-with-canvas-apps)

# Setting up

**1.** - Download the Salesforce Repository for the demo:

[https://github.com/SalesforceCloudServices/ltng-support-visualforce-to-lightning/](https://github.com/SalesforceCloudServices/ltng-support-visualforce-to-lightning/)

**2.** - cd into the dx directory of that project and run `sfdx force:source:push`

**3.** - assign the demo permissionSet (to run the demo) - `sfdx force:user:permset:assign -n ltng_LightningToVisualforceDemoParticipant`

**4.** - create a heroku app for this project at [https://heroku.com](https://heroku.com)

ex: `heroku create`

**5.** - create the following heroku config settings for the heroku app:

<table>
	<tr>
		<th>Config</th><th>Description</th><th>Example</th>
	</tr>
	<tr>
		<td>CONSUMER_KEY</td>
		<td>The Consumer Key for the Connected App: ltng_DemoHerokuNodeJS_CanvasApp</td>
		<td>3MVG9U_dUptXGpYI4288SBcTP2X...</td>
	</tr>
	<tr>
		<td>CONSUMER_SECRET</td>
		<td>The Consumer Secret for the Connected App: ltng_DemoHerokuNodeJS_CanvasApp</td>
		<td>12345678....</td>
	</tr>
	<tr>
		<td>EXAMPLE_SIGNED_REQUEST</td>
		<td>Leave blank in production or replace with the post Signed Request</td>
		<td>9Rpl6rE7R2bSNjoSfYdERk8nffmgtKQNhr5U/5eSJPI=.eyJjb250ZXh0Ijp7InVzZXIiOnsibGFuZ3V....</td>
	</tr>
</table>


# node-js-getting-started

note: cloned from - https://github.com/heroku/node-js-getting-started.git

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Lightning Design System

See the [Heroku Platform section of the Lightning Design System](https://lightningdesignsystem.com/platforms/heroku/)

(tldr; download the Lightning Design System, place the `assets` folder in your public/web directory, and reference it in your page)

	<link rel="stylesheet" type="text/css"
		href="/assets/lightningDesignSystem/styles/salesforce-lightning-design-system.css"
	/>

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
