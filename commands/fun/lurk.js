const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const CONSTANTS = require("../../CONST.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lurk")
		.setDescription("Reacts, or sends the imfine emote"),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(CONSTANTS.COLOR)
			.setTitle(CONSTANTS.IMFINE_EMOJI)
			.setDescription(`You activated the ${CONSTANTS.IMFINE_EMOJI}ening, and will start sending ${CONSTANTS.IMFINE_EMOJI} randomly`)
			.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})
		await interaction.reply({embeds: [embed]})
		let count = 0
		let interval = setInterval(() => {
			count += 1
			if (Math.floor(Math.random() * 4000) == 1) {
				interaction.channel.send(CONSTANTS.IMFINE_EMOJI)
				interaction.channel.send(`||It took ${count}s to send this message||`)
				count = 0
			}
		}, 1000)
	},
}
