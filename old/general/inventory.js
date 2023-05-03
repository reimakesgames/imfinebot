const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const persistence = require("../../persistence.js");
const CONSTANTS = require("../../CONST.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("inventory")
		.setDescription("Lists your inventory"),
	async execute(interaction) {
		var user = interaction.user;
		if (!persistence.data[user.id].inventory) {
			persistence.data[user.id].inventory = [];
			persistence.save();
		}

		let list = "";
		for (let i = 0; i < persistence.data[user.id].inventory.length; i++) {
			let item = persistence.data[user.id].inventory[i];
			list += `${item.amount}x ${item.name}`
		}
		if (list == "") {
			list = "Nothing here!";
		}
		const embed = new EmbedBuilder()
			.setColor("#CAD9FB")
			.setTitle("Inventory")
			.setDescription(list)
			.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})
			.setTimestamp()

		await interaction.reply({ embeds: [embed] });
	}
};
