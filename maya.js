/******************************************************************************
 * MAYA
 * Author: Ming-Cee Yee // skysketches.com
 * Date: Feb 2016
 * Description: Bot that handles team events
 ******************************************************************************/

var config = require('config.json')('conf.json');
var token  = process.env.SLACK_API_TOKEN || config.token;

var RTM_EVENTS        = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

var RtmClient       = require('@slack/client').RtmClient;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var mds             = new MemoryDataStore();
var rtm             = new RtmClient(token, {logLevel: 'debug', dataStore: mds});

var channel;
var connected = false;

/**
 * Open connection to send messages
 */
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function() {
	connected = true;
});

/**
 * Listen to `message` events
 */
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	channel = message.channel;
	if (connected) {
		// Hello!
		if ((message.text).match(/(^|\s)maya($|\s)/i)) {
			rtm.sendMessage("Hello!", channel, function messageSent() {
				console.log("Responded to name in " + channel);
			});
		}

		// Did you mean Malton?
		if ((message.text).match(/(^|\s)milton($|\s)/i)) {
			rtm.sendMessage("Did you mean Malton?", channel, function messageSent() {
				console.log("Responded to Milton in " + channel);
			})
		}

		// TODO: help list
	}
});

rtm.start();
