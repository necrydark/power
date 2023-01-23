// Require the discord.js library
const {Client, GatewayIntentBits, Collection, Partials} = require('discord.js');
// Pull our ENV configuration using the library
require('dotenv').config();


//Load our events and commands
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');


//Create a new client instance with every intent and partial so we can use the bot to the fullest potential
const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
})

//Create a new collection to hold all of our commands
client.commands = new Collection();


/*Login to discord using the bot token 
and load the events and commands*/
client.login(process.env.token).then(() => {
    loadCommands(client);
    loadEvents(client);
})