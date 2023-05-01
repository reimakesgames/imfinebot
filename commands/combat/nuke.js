const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CONSTANTS = require("../../CONST.json");
const persistence = require("../../persistence.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nuke")
		.setDescription("Nukes a user, dropping all their coins")
		.addUserOption((option) => option.setName("user").setDescription("The user to nuke").setRequired(true)),
	async execute(interaction) {
		var user = interaction.options.getUser("user");
		if (user == interaction.user) {
			return await interaction.reply(`You can't nuke yourself ${CONSTANTS.IMFINE_EMOJI}`);
		} else if (user.id == "1102381669224284290") {
			return await interaction.reply(`are you seriously nuking me ${CONSTANTS.IMFINE_EMOJI}`);
		}
		if (!persistence.data[user.id]) {
			persistence.data[user.id] = {
				balance: 10,
			};
			persistence.save();
		}

		persistence.data[interaction.user.id].balance += persistence.data[user.id].balance;
		persistence.data[user.id].balance = 0;
		persistence.save();

		const embed = new EmbedBuilder()
			.setColor(CONSTANTS.COLOR)
			.setTitle("Nuke")
			.setDescription(`<@!${interaction.user.id}> nuked <@!${user.id}>!`)
			.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})
			.setTimestamp()

		await interaction.reply({ embeds: [embed] });
	}
};
