module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({ content: 'Outdated command' });
            }

            command.execute(interaction, client);
        } else {
            return;
        }
    }
}