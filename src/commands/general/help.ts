import { CommandInteraction, SlashCommandBuilder } from "discord.js";

import { DefaultEmbed } from "../../modules/defaultEmbed";
import emojis from "../../data/emojis.json";
import media from "../../data/media.json";

const helpText = `Welcome to the help menu! Here you can find a list of publicly available commands and their descriptions.
If a bug is found, please report it to the developer, <@${process.env.OWNER_ID}>.

**__General Commands__**
\`/help\` - Shows this menu
\`/ping\` - Shows the bot's ping
\`/version\` - Shows the bot's active version

\`/fine\` - Sends ${emojis.default} and reacts to it with 10 ${emojis.default}s
\`/birthday\` - happy birthday rat !!!

**__Server Owner Commands__**
\`/hell\` - The ${emojis.default}ening

**__Developer Commands__**
\`/grabkey <key> [field]\` - Grabs a key from the database
\`/updatepresence <text>\` - Updates the bot's presence
`

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Shows a list of commands"),
	async execute(interaction: CommandInteraction) {
		const embed = new DefaultEmbed("Help")
			.setDescription(helpText)
			.setThumbnail(media.routine)
			.build();
		await interaction.reply({ embeds: [embed] });
	}
};
