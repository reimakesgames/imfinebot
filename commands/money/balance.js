// access money.json file
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CONSTANTS = require('../../CONST.json');
const persistence = require('../../persistence.js');

function writeToFile() {
	fs.writeFileSync('./money.json', JSON.stringify(money, null, 4), (err) => {
		if (err) console.log(err);
	});
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check your or others\' balance')
		.addUserOption((option) => option.setName('user').setDescription('The user to check the balance of')),
	async execute(interaction) {
		var user = interaction.options.getUser('user');
		if (!user) {
			user = interaction.user;
		}
		if (!persistence.data[user.id]) {
			persistence.data[user.id] = {
				balance: 10,
			};
			writeToFile();
		}

		const embed = new EmbedBuilder()
			.setColor(CONSTANTS.COLOR)
			.setTitle('Balance')
			.setDescription(`You have ${persistence.data[interaction.user.id].balance} ${CONSTANTS.IMFINE_SPIN}`)
			.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})
			.setTimestamp()

		await interaction.reply({embeds: [embed]});
	},
};
