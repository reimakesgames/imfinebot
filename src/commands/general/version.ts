import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import buildInfo from "../../data/buildInfo.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("version")
		.setDescription("Shows the bot's version"),
	async execute(interaction: CommandInteraction) {
		await interaction.reply({ content: `${buildInfo.version}b${buildInfo.buildNumber}` });
	}
}
