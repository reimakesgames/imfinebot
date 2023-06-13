import { ActivityType, PermissionsBitField, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("updatepresence")
		.setDescription("Updates the bot's presence")
		.addStringOption(new SlashCommandStringOption()
			.setName("presence")
			.setDescription("The presence to set (only affects the presence string)")
			.setRequired(true)
		),

	async execute(interaction, myRedis) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			var presence = interaction.options.getString("presence");
			if (presence === null) {
				presence = await myRedis.get("presence");
			}
			await interaction.client.user.setPresence({
				activities: [
					{
						name: presence,
						type: ActivityType.Playing
					}],
				status: "online"
			});
			myRedis.set("presence", presence);
			await interaction.reply({ content: "Presence updated!" });
		}
	}
}
