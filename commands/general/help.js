const { SlashCommandBuilder } = require("discord.js");

const defaultEmbed = require("../../src/modules/defaultEmbed.js");
const emojis = require("../../emojis.json");
const media = require("../../media.json");

const helpText = `Welcome to the help menu! Here you can find a list of commands and their descriptions.
This bot was created by reimakesgames#3672 as a joke, because ${emojis.default}

**__General Commands__**
\`/help\` - Shows this menu
\`/ping\` - Shows the bot's ping

**__Administrator Only Commands__**
\`/hell\` - The ${emojis.default}ening (reacts to sent messages in the channel with ${emojis.default})

`

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Shows a list of commands"),
	async execute(interaction) {
		const embed = new defaultEmbed("Help")
			.setDescription(helpText)
			.setThumbnail(media.routine);
		await interaction.reply({ embeds: [embed] });
	}
};
