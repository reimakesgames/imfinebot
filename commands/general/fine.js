const { SlashCommandBuilder } = require("discord.js");

const emojis = require("../../emojis.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fine")
		.setDescription("sends a fine and reacts to itself with all fine emojis"),
	async execute(interaction) {
		await interaction.reply({ content: emojis.default });
		const message = await interaction.fetchReply();
		for (i = 0; i < 10; i++) {
			await message.react(emojis.defaultMany[i]);
		}
	}
};
