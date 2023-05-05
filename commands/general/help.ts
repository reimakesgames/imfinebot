import { CommandInteraction, Interaction, InteractionResponse, SlashCommandBuilder } from "discord.js";

import { defaultEmbed } from "../../src/modules/defaultEmbed.js";
import emojis from "../../emojis.json";
import media from "../../media.json";

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
	async execute(interaction: CommandInteraction) {
		const embed = new defaultEmbed("Help")
			.setDescription(helpText)
			.setThumbnail(media.routine);
		await interaction.reply({ embeds: [embed] });
	}
};
