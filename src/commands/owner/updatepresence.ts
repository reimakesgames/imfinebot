import { ActivityType, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

import permission from "../../modules/permission";
import redis from "../../modules/redis";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatepresence")
		.setDescription("Updates the bot's presence")
		.addStringOption(new SlashCommandStringOption()
			.setName("presence")
			.setDescription("The presence to set (only affects the presence string)")
			.setRequired(true)
		),

	async execute(interaction: CommandInteraction) {
		if (permission.userIsLvlSix(interaction.user.id)) {
			const interactionOptions = interaction.options as CommandInteractionOptionResolver;
			var presence = interactionOptions.getString("presence");

			if (presence === null) {
				presence = await redis.get("presence");
			}

			interaction.client.user.setPresence({
				activities: [
					{
						name: presence,
						type: ActivityType.Playing
					}],
				status: "online"
			});
			redis.set("presence", presence);
			await interaction.reply({ content: "Presence updated!" });
		}
	}
}
