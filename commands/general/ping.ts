import { SlashCommandBuilder } from "discord.js";

import emojis from "../../emojis.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Shows the bot's ping"),
	async execute(interaction) {
		await interaction.reply({ content: `${emojis.default} ${interaction.client.ws.ping}ms` });
	}
};
