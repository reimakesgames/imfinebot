import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import emojis from "../../data/emojis.json";
import redis from "../../modules/redis";
import permission from "../../modules/permission";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("grabkey")
		.setDescription("Gets a key from redis")
		.addStringOption(new SlashCommandStringOption()
			.setName("key")
			.setDescription("The key to get")
			.setRequired(true)
		)
		.addStringOption(new SlashCommandStringOption()
			.setName("field")
			.setDescription("The field to get")
			.setRequired(false)
		),
	async execute(interaction: CommandInteraction) {
		if (permission.userIsLvlSix(interaction.user.id)) {
			const interactionOptions = interaction.options as CommandInteractionOptionResolver;
			const key = interactionOptions.getString("key");
			const field = interactionOptions.getString("field");
			var value = null;

			if (field) {
				value = await redis.hGet(key, field);
			} else {
				value = await redis.get(key);
			}
			await interaction.reply({ content: value });
		} else {
			await interaction.reply({ content: `${emojis.default}` });
		}
	}
}
