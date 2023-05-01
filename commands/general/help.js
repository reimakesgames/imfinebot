const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CONSTANTS = require('../../CONST.json');

const info = `${CONSTANTS.NAME} is a bot inspired by YonKaGor's Routine character.
This is also a currency bot, where you can earn ${CONSTANTS.IMFINE_EMOJI} and do whatever with it.

__  **Commands**  __
\`/help\` - Displays this message
\`/imfine\` - ${CONSTANTS.IMFINE_EMOJI}
\`/fineify\` - Converts some words in your message to ${CONSTANTS.IMFINE_EMOJI}
\`/lurk\` - Sends ${CONSTANTS.IMFINE_EMOJI} randomly with a 1/4000 chance every second, cannot be stopped unless the bot is restarted

__  **Currency Commands**  __
\`/leaderboards\` - Displays the top 5 richest people globally
\`/balance\` - Displays yours or a specified user's balance
\`/steal\` - Steals a random amount of ${CONSTANTS.IMFINE_SPIN} coins from a specified user
\`/nuke\` - Nukes a user, giving all their ${CONSTANTS.IMFINE_SPIN} coins to you if you have a nuke in your inventory

__  **Inventory Commands**  __
\`/inventory\` - Displays your inventory
\`/buy\` - Buys an item from the shop
\`/sell\` - Sells an item from your inventory
\`/shop\` - Displays the shop
\`/craft\` - Crafts an item from your inventory
`

// const chip = new EmbedBuilder()
// 	.setColor(CONSTANTS.COLOR)
// 	.setTitle('Fun Fact')
// 	.setDescription('Did you know that the ${CONSTANTS.IMFINE_EMOJI} runs on this?')
// 	.setImage('https://cdn.discordapp.com/attachments/1038631048428388462/1102429649293803530/Untitled216_20230430220142.jpg')
// 	.setFooter({ name: 'imfine v0'})

const helpEmbed = new EmbedBuilder()
	.setColor(CONSTANTS.COLOR)
	.setTitle('About Me')
	.setDescription(info)
	.setThumbnail("https://cdn.discordapp.com/attachments/1102402095728046100/1102402118628933663/routineSad.png")
	.setFooter({text: `v${CONSTANTS.VERSION} - ${CONSTANTS.NAME}`})

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Information about the bot'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
	},
};
