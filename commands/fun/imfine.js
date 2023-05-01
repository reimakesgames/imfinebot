const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('imfine')
		.setDescription('Replies with an emoji'),
	async execute(interaction) {
		await interaction.reply('<:fine:1100034698069151754>');
	},
};
