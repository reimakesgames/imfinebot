import { SlashCommandBuilder, PermissionsBitField, Events, Message, Channel, CommandInteraction, Interaction, ChatInputCommandInteraction } from "discord.js";

import emojis from "../../data/emojis.json";
import media from "../../data/media.json";
import { DefaultEmbed } from "../../modules/defaultEmbed";

async function messageHandler(channel: Channel, interaction: ChatInputCommandInteraction | any, message: Message) {
	if (message.channel.id === channel.id) {
		if (message.content.startsWith("stop")) {
			interaction.client.off(Events.MessageCreate, messageHandler);
			console.warn(`[COMMAND]: ${interaction.user.tag} stopped the hell command.`);
			return;
		};
		await message.react(emojis.default);
	}
}

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

			const embed = new DefaultEmbed(`The ${emojis.default}ening`)
				.setDescription(`The ${emojis.default}ening has begun.`)
				.setThumbnail(media.routine)
				.setImage(media.routine)
				.build();

			await interaction.reply({ embeds: [embed] });

			const channel = interaction.channel;
			interaction.client.on(Events.MessageCreate, (message: Message) => {
				messageHandler(channel, interaction, message)
			});
		} else {
			const embed = new DefaultEmbed("Failure")
				.setDescription(`Only people worthy of the ${emojis.default}ening can use this command`)
				.setThumbnail(media.routine)
				.setImage(media.routine)
				.build();
			await interaction.reply({ embeds: [embed] });
		}
	}
};
