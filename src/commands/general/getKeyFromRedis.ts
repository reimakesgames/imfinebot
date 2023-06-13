import { CommandInteraction, PermissionsBitField, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import emojis from "../../data/emojis.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("horror")
		.setDescription("Gets a key from redis")
		.addStringOption(new SlashCommandStringOption()
			.setName("key")
			.setDescription("The key to get")
			.setRequired(true)
		),
	async execute(interaction, myRedis) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			const key = interaction.options.getString("key", true);
			const value = await myRedis.get(key);
			await interaction.reply({ content: value });
		} else {
			await interaction.reply({ content: `${emojis.default}` });
		}
	}
}
