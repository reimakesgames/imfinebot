import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import emojis from "../../emojis.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fine")
		.setDescription("sends a fine and reacts to itself with all fine emojis"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply({ content: emojis.default });
		const message = await interaction.fetchReply();
		for (let i = 0; i < 10; i++) {
			await message.react(emojis.defaultMany[i]);
		}
	}
};
