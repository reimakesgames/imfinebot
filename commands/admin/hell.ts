import { SlashCommandBuilder, PermissionsBitField, Events, Message } from "discord.js";

import emojis from "../../emojis.json";
import media from "../../media.json";
import { defaultEmbed } from "../../src/modules/defaultEmbed.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hell")
		.setDescription("megabyte's worst nightmare"),
	async execute(interaction) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			// Since only admins can use this command, we can assume that the bot has permission to react to messages in the channel.
			// If the bot doesn't have permission to react to messages in the channel, it should throw an error.
			// This is because the bot will only react to messages that are sent after the command is used.

			console.warn(`[COMMAND]: ${interaction.user.tag} used the hell command.`);

			const embed = new defaultEmbed(`The ${emojis.default}ening`)
				.setDescription(`The ${emojis.default}ening has begun.`)
				.setThumbnail(media.routine)
				.setImage(media.routine);

			await interaction.reply({ embeds: [embed] });

			const channel = interaction.channel;
			async function messageHandler(message: Message) {
				if (message.channel.id === channel.id) {
					if (message.content.startsWith("stop")) {
						interaction.client.off(Events.MessageCreate, messageHandler);
						console.warn(`[COMMAND]: ${interaction.user.tag} stopped the hell command.`);
						return;
					};
					await message.react(emojis.default);
				}
			}
			interaction.client.on(Events.MessageCreate, messageHandler);
		} else {
			const embed = new defaultEmbed("Failure")
				.setDescription(`Only people worthy of the ${emojis.default}ening can use this command`)
				.setThumbnail(media.routine)
				.setImage(media.routine);
			await interaction.reply({ embeds: [embed] });
		}
	}
};
