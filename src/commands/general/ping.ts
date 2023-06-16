import { CommandInteraction, SlashCommandBuilder } from "discord.js";

import emojis from "../../data/emojis.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Shows the bot's ping"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply({ content: `${emojis.default} ${interaction.client.ws.ping}ms` });
	}
};
