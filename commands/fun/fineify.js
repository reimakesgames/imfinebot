const { SlashCommandBuilder } = require("discord.js");
const CONSTANTS = require("../../CONST.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fineify")
		.setDescription("Replies with a fineified version of your message")
		.addStringOption((option) => option.setName("message").setDescription("The message to fineify").setRequired(true)),
	async execute(interaction) {
		let fineified = "";
		let message = interaction.options.getString("message");
		let words = message.split(" ");

		for (let i = 0; i < words.length; i++) {
			if (Math.floor(Math.random() * 4) == 1) {
				fineified += `${CONSTANTS.IMFINE_EMOJI} `;
			} else {
				fineified += words[i] + " ";
			}
		}

		await interaction.reply(fineified);
	},
};
