const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CONSTANTS = require("../../CONST.json");
const fs = require("node:fs");
const persistence = require("../../persistence.js");

let embed = new EmbedBuilder()
	.setColor('#CAD9FB')
	.setTitle("Global Leaderboards")
	.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leaderboards")
		.setDescription("Lists 5 richest people globally"),

	async execute(interaction) {
		let sorted = Object.entries(persistence.data).sort((a, b) => b[1].balance - a[1].balance);
		let top5 = sorted.slice(0, 5);
		let stuff = "Top 5 Richest People Globally\n\n"
		for (let i = 0; i < top5.length; i++) {
			let user = `<@!${top5[i][0]}>`;
			stuff += `${i + 1}. ${user} - ${top5[i][1].balance} ${CONSTANTS.IMFINE_SPIN}\n`;
		}
		embed.setDescription(stuff);
		return await interaction.reply({ embeds: [embed] });
	}
};
