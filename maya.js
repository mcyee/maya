/******************************************************************************
 * MAYA
 * Author: Ming-Cee Yee // skysketches.com
 * Date: Feb 2016
 * Description: Bot that handles team events
 ******************************************************************************/

var config = require('config.json')('conf.json');

// Create client
var RtmClient = require('@slack/client').RtmClient;
var token = process.env.SLACK_API_TOKEN || config.token;
var rtm = new RtmClient(token, {logLevel: 'debug'});

// Get stuff
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var mds = new MemoryDataStore();

var channel;
var connected = false;

// Listen to `message` events
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	channel = message.channel;
	if (connected) {
		// responds to every message with "Hello world!"
		// TODO: respond only to specified user

		console.log((mds.getUserByName("sky")).toJSON());
		// if (message.user === mds.getUserByName("sky")) {
		// 	rtm.sendMessage('Hello world!', channel, function messageSent() {
		// 		console.log("Sent message to a channel");
		// 	});
		// }
	}
});

// Open connection to send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function() {
	connected = true;
});

rtm.start();
