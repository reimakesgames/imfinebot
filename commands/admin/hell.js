const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const emojis = require("../../emojis.json");
const media = require("../../media.json");
const defaultEmbed = require("../../src/modules/defaultEmbed.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hell")
		.setDescription("megabyte's worst nightmare"),
	async execute(interaction) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			// Since only admins can use this command, we can assume that the bot has permission to react to messages in the channel.
			// If the bot doesn't have permission to react to messages in the channel, it should throw an error.
			// This is because the bot will only react to messages that are sent after the command is used.

			const embed = new defaultEmbed(emojis.default + "ening")
				.setDescription("The " + emojis.default + "ening has begun")
				.setThumbnail(media.routine)
				.setImage(media.routine);

			await interaction.reply({ embeds: [embed] });

			const channel = interaction.channel;
			// since we cannot use an event based system, we have to use a while loop to check for new messages.
			// this is not ideal, but it works.
			setInterval(async () => {
				const messages = await channel.messages.fetch({ limit: 8 });
				// cycle through the messages and react to them
				for (const message of messages.values()) {
					await message.react(emojis.default);
				}
			}, 10000);
		} else {
			const embed = new defaultEmbed("Failure")
				.setDescription("Only people worthy of the " + emojis.default + "ening can use this command")
				.setThumbnail(media.routine)
				.setImage(media.routine);
			await interaction.reply({ embeds: [embed] });
		}
	}
};
