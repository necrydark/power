//Add the library and what you want to use
const { ActivityType } = require("discord.js");

//export the event with the name and it will be only executed once
module.exports = { 
    name: 'ready',
    once: true,
    async execute(client) {
        // if the bot works log that the bot is online
        console.log(`Logged in as ${client.user.tag}`)

        //set the bots presence and add an activity
        client.user.setPresence({
            activities: [{name: 'Corn', tpye: ActivityType.Playing}],
            status: 'idle'
        });
    },
};