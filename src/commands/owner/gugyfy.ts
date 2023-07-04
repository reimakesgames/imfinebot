// update everyone's nicknames to gugy

import { CommandInteraction, SlashCommandBuilder } from "discord.js";


module.exports = {
	data: new SlashCommandBuilder()
		.setName("gugyfy")
		.setDescription("Updates everyone's nickname to gugy"),
	async execute(interaction: CommandInteraction) {
		const members = await interaction.guild.members.fetch();
		members.forEach(async member => {
			// protect for potential errors if the bot doesn't have the permissions to change the nickname
			if (!member.manageable) return;
			await member.setNickname("gugy");
		});
		await interaction.reply({ content: "Everyone's nickname has been updated to gugy!" });
	}
}
