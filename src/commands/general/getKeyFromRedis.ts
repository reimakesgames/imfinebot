import { CommandInteraction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import emojis from "../../data/emojis.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("horror")
		.setDescription("Gets a key from redis"),
	async execute(interaction) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			// const key = interaction.options.getString("key", true);
			// const value = await interaction.redisClient.get("test");
			await interaction.reply({ content: "test" });
		} else {
			await interaction.reply({ content: `${emojis.default}` });
		}
	}
}
