import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("birthday")
		.setDescription("happy birthday rat !!!"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply({ content: `happy birthday rat !!!` });
	}
}
