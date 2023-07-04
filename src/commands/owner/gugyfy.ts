// update everyone's nicknames to gugy

import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import permission from "../../modules/permission";


module.exports = {
	data: new SlashCommandBuilder()
		.setName("gugyfy")
		.setDescription("Updates everyone's nickname to gugy"),
	async execute(interaction: CommandInteraction) {
		if (permission.userIsLvlSix(interaction.user.id)) {
			interaction.guild.members.fetch()
				.then(members => {
					members.forEach(member => {
						member.setNickname("gugy");
					});
				})
				.catch(console.error);
			await interaction.reply({ content: "Everyone's nickname has been updated to gugy!" });
		}
	}
}
