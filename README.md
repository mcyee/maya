# Maya

Maya is a Slack bot user. She doesn't really do anything yet.

The primary end goal is to have her manage team event organisation so that members can:

* create events that can be listed in-chat on request
* store location and time of events
* keep track of RVSPs
* send reminders to attendees

## Install

Create a file called `conf.json` and put your API token in it:

    {
        "token": "PUT-TOKEN-HERE"
    }

Install dependencies:

    npm install @slack/client

`cd` into the directory containing `maya` to run:

    node maya.js

## Dependencies

The `package.json` exists but this package isn't published.

Please install the [Slack client library for node.js](https://github.com/slackhq/node-slack-client).
