const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CONSTANTS = require("../../CONST.json");
const persistence = require("../../persistence.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("steal")
		.setDescription("Steal money from someone")
		.addUserOption((option) => option.setName("user").setDescription("The user to steal from").setRequired(true)),
	async execute(interaction) {
		// access money.json file
		const target = interaction.options.getUser("user");

		const rightNow = Math.floor(new Date() / 1000);
		if (!persistence.data[target.id]) {
			persistence.initUser(target.id);
		}
		if (!persistence.data[interaction.user.id]) {
			persistence.initUser(interaction.user.id);
		}
		persistence.save();

		if (!persistence.data[target.id].lastSteal) {
			persistence.data[target.id].lastSteal = 0;
		}
		if (persistence.data[interaction.user.id].lastSteal + 20 > rightNow) {
			const embed = new EmbedBuilder()
				.setColor(CONSTANTS.COLOR)
				.setTitle("Slow down!")
				.setDescription("You can only steal every 20 seconds\n\nPlease wait " + (persistence.data[interaction.user.id].lastSteal + 20 - rightNow) + " seconds")
				.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})
				.setTimestamp()
			await interaction.reply({ embeds: [embed] });
			return;
		}
		persistence.data[interaction.user.id].lastSteal = rightNow;

		if (interaction.user.id == target.id) {
			await interaction.reply("are you seriously trying to steal from yourself? <:fine:1100034698069151754>");
			return;
		} else if (target.id == "1102381669224284290") {
			await interaction.reply("<:fine:1100034698069151754>");
			return;
		}

		if (persistence.data[target.id].balance == 0) {
			await interaction.reply(`${target.username} doesn't have any ${CONSTANTS.IMFINE_SPIN} to steal`);
			return;
		} else {
			let stolen = Math.floor(Math.random() * (persistence.data[target.id].balance * 0.2)) + 1;
			persistence.data[target.id].balance -= stolen;
			persistence.data[interaction.user.id].balance += stolen;
			persistence.save();
			await interaction.reply(`You stole ${stolen} ${CONSTANTS.IMFINE_SPIN} from <@!${target.id}>`);
			return;
		}
	}
}
