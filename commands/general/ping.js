//Add the SlashCommandBuilder from the library
const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


//Export the slash command with all the data
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('return with pong'),
    async execute(interaction) {
        //reply to the user with "pong"
        await interaction.reply('Pong');
    }
}