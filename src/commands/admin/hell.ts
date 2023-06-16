import { SlashCommandBuilder, PermissionsBitField, Events, Message, Channel, CommandInteraction, ChatInputCommandInteraction } from "discord.js";

import emojis from "../../data/emojis.json";
import media from "../../data/media.json";
import { DefaultEmbed } from "../../modules/defaultEmbed";

async function messageHandler(channel: Channel, interaction: ChatInputCommandInteraction | any, message: Message, myself: any) {
	if (message.channel.id === channel.id) {
		if (message.content.startsWith("stop")) {
			interaction.client.off(Events.MessageCreate, myself);
			console.warn(`[COMMAND]: ${interaction.user.tag} stopped the hell command.`);
			await message.reply(`The ${emojis.default}ening has ended. For now.`);
			return;
		};
		await message.react(emojis.default);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hell")
		.setDescription("megabyte's worst nightmare"),
	async execute(interaction: CommandInteraction) {
		const userPermissions = interaction.member.permissions as Readonly<PermissionsBitField>;
		const channel = interaction.channel;

		if (userPermissions.has(PermissionsBitField.Flags.Administrator)) {
			console.warn(`[COMMAND]: ${interaction.user.tag} used the hell command in server ${interaction.guildId}, channel ${interaction.channelId}.`);
			console.warn(`https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)

			await interaction.reply({ embeds: [
				new DefaultEmbed(`The ${emojis.default}ening`)
					.setDescription(`The ${emojis.default}ening has begun.`)
					.setThumbnail(media.routine)
					.setImage(media.routine)
					.build()
				]
			});

			var myself = (message: Message) => {
				messageHandler(channel, interaction, message, myself);
			}
			interaction.client.on(Events.MessageCreate, myself);
		} else {
			await interaction.reply({ embeds: [
				new DefaultEmbed("Failure")
					.setDescription(`Only people worthy of the ${emojis.default}ening can use this command`)
					.setThumbnail(media.routine)
					.setImage(media.routine)
					.build()
				]
			});
		}
	}
};
